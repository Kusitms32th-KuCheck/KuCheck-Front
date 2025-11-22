'use client'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import MemberButton from '@/components/member/common/MemberButton'
import { usePathname, useRouter } from 'next/navigation'
import { ImageUploaderIcon } from '@/assets/svgComponents/member'
import { extractFileExtension, generateId } from '@/utils/upload'
import { useSignUpStore } from '@/store/signUpStore'
import { useFileUpload } from '@/hooks/useFileUpload'
import { getMembersProfileImageUrl } from '@/lib/member/common'
import { useToast } from '@/components/member/common/toast/ToastContext'

type StepType = '1' | '2' | '3' | '4' | '5' | '6' | '7'

export default function ImageUploader() {
  const fileRef = useRef<HTMLInputElement>(null)
  const file = useSignUpStore((state) => state.file)
  const setFile = useSignUpStore((state) => state.setFile)
  const [isImageError, setIsImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { uploadFile } = useFileUpload()

  const { error } = useToast()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    return () => {
      setFile(undefined)
    }
  }, [])

  const handleStepClick = useCallback(
    (step: StepType) => {
      router.push(`${pathname}?step=${encodeURIComponent(step)}`)
    },
    [pathname, router]
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0]

    if (!selectedFile) return

    if (!selectedFile.type.startsWith('image/')) {
      error('이미지 파일만 선택 가능합니다')
      return
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      error('파일 크기가 10MB를 초과합니다')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const fileInfo = {
        id: generateId(),
        name: selectedFile.name,
        size: selectedFile.size,
        url: reader.result as string,
        file: selectedFile,
      }
      setFile(fileInfo)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleSubmit = async () => {
    if (!file?.url) {
      error('업로드할 파일을 선택해주세요')
      return
    }

    try {
      setIsLoading(true)
      const extension = extractFileExtension(file.name)
      const presignedResponse = await getMembersProfileImageUrl(`profileImageUrl.${extension}`)

      if (presignedResponse.error) {
        error(`${presignedResponse.error}`)
      }

      if (!presignedResponse.success || !presignedResponse.data?.data?.newUrl) {
        throw new Error('프리사인드 URL 요청 실패')
      }

      const uploadResult = await uploadFile(file, {
        preSignedUrl: presignedResponse.data.data.newUrl,
      })

      if (!uploadResult.success) {
        throw new Error('파일 업로드 실패')
      }

      console.log('✅ 큐픽 신청서 서류 이미지 업로드 성공:', uploadResult)
      if (uploadResult.success) {
        handleStepClick('7')
        setFile(undefined)
      } else if (uploadResult.error) {
        error(`${uploadResult.error}`)
      }
    } catch (error) {
      console.error('❌ 업로드 중 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const profileImageSrc = file?.url || ''
  const isValidImageUrl = profileImageSrc && typeof profileImageSrc === 'string'

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        ref={fileRef}
        onChange={handleFileChange}
        disabled={isLoading}
        className="hidden"
      />

      {/* 이미지 업로드 영역 */}
      <div className="flex flex-col gap-y-4">
        <div className="relative mx-5 flex w-[176px] flex-col gap-y-2 rounded-[8px]">
          {isValidImageUrl && !isImageError ? (
            <div className="relative h-[232px] w-full rounded-[8px] border border-gray-200 bg-gray-100">
              {/* 이미지 */}
              <Image
                onError={() => setIsImageError(true)}
                src={profileImageSrc}
                alt="프로필"
                fill
                className="h-full w-full rounded-[8px] object-cover"
                priority
              />
            </div>
          ) : (
            <div
              onClick={() => !isLoading && fileRef.current?.click()}
              className="relative flex h-[232px] w-full cursor-pointer flex-col items-center justify-center rounded-[8px] border border-gray-200 bg-gray-100"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
              ) : (
                <ImageUploaderIcon width={32} height={28} />
              )}
              <p className="body-sm-regular text-gray-500">이미지 업로드</p>
            </div>
          )}
        </div>
        {/* 버튼 */}
        {isValidImageUrl && !isImageError && (
          <div className="inset-0 flex items-center justify-center">
            <button
              onClick={() => fileRef.current?.click()}
              className="caption-sm-medium cursor-pointer rounded-[4px] bg-gray-400 px-[10px] py-[6px] text-white transition-colors"
            >
              다시 선택하기
            </button>
          </div>
        )}
      </div>

      {/* 저장하기 버튼 */}
      <div className="fixed bottom-[60px] w-full bg-white px-5">
        <MemberButton
          buttonType="button"
          styleStatus={!file?.url || isLoading ? 'disabled' : 'default'}
          styleType="primary"
          onClick={handleSubmit}
          disabled={!file?.url || isLoading}
        >
          {isLoading ? '업로드 중...' : '완료'}
        </MemberButton>
      </div>
    </div>
  )
}
