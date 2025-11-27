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
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string>('')

  const { uploadFile } = useFileUpload()
  const { error } = useToast()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    return () => {
      setFile(undefined)
    }
  }, [setFile])

  const handleStepClick = useCallback(
    (step: StepType) => {
      router.push(`${pathname}?step=${encodeURIComponent(step)}`)
    },
    [pathname, router]
  )

  /**
   * HEIC를 JPEG으로 변환
   */
  const convertHeicToJpeg = async (file: File): Promise<File> => {
    try {
      // 클라이언트에서만 동적으로 import
      const heic2any = (await import('heic2any')).default

      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.9,
      })

      const convertedFile = new File(
        [convertedBlob as Blob],
        file.name.replace(/\.heic$/i, '.jpg'),
        { type: 'image/jpeg' }
      )

      return convertedFile
    } catch (err) {
      console.error('HEIC 변환 실패:', err)
      throw new Error('HEIC 파일 변환에 실패했습니다')
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFile = e.currentTarget.files?.[0]

    if (!selectedFile) return

    try {
      // HEIC 파일 변환 처리
      if (
        selectedFile.type === 'image/heic' ||
        selectedFile.type === 'image/heif' ||
        selectedFile.name.toLowerCase().endsWith('.heic')
      ) {
        selectedFile = await convertHeicToJpeg(selectedFile)
      }

      // 변환 후 타입 가드
      if (!selectedFile) {
        error('파일 처리에 실패했습니다')
        return
      }

      // 이미지 파일 검증
      if (!selectedFile.type.startsWith('image/')) {
        error('이미지 파일만 선택 가능합니다')
        return
      }

      // 파일 크기 검증 (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        error('파일 크기가 10MB를 초과합니다')
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string

        if (!result) {
          error('파일 읽기에 실패했습니다')
          return
        }

        // 로컬 미리보기 설정
        setLocalPreviewUrl(result)
        setIsImageError(false)

        const fileInfo = {
          id: generateId(),
          name: selectedFile!.name,
          size: selectedFile!.size,
          url: result,
          file: selectedFile,
        }

        setFile(fileInfo)
      }

      reader.onerror = () => {
        error('파일을 읽을 수 없습니다')
      }

      reader.readAsDataURL(selectedFile)
    } catch (err) {
      error((err as Error).message)
      if (fileRef.current) {
        fileRef.current.value = ''
      }
    }
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
        return
      }

      if (!presignedResponse.success || !presignedResponse.data?.data?.newUrl) {
        throw new Error('프리사인드 URL 요청 실패')
      }

      const uploadResult = await uploadFile(file, {
        preSignedUrl: presignedResponse.data.data.newUrl,
      })

      if (!uploadResult.success) {
        if (uploadResult.error) {
          error(`${uploadResult.error}`)
        } else {
          throw new Error('파일 업로드 실패')
        }
        return
      }

      console.log('✅ 프로필 이미지 업로드 성공:', uploadResult)
      handleStepClick('7')
      setFile(undefined)
      setLocalPreviewUrl('')
    } catch (err) {
      console.error('❌ 업로드 중 오류:', err)
      error('업로드 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  // 미리보기 이미지 선택 로직
  const showLocalPreview = localPreviewUrl && !isImageError
  const profileImageSrc = showLocalPreview ? localPreviewUrl : file?.url || ''
  const isValidImageUrl = profileImageSrc && typeof profileImageSrc === 'string'

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg,.heic"
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
              {/* 로컬 미리보기 - img 태그 사용 */}
              {showLocalPreview ? (
                <img
                  src={profileImageSrc}
                  alt="프로필 미리보기"
                  className="h-full w-full rounded-[8px] object-cover"
                />
              ) : (
                // 저장된 이미지 - Next.js Image 사용
                <Image
                  onError={() => setIsImageError(true)}
                  src={profileImageSrc}
                  alt="프로필"
                  fill
                  className="h-full w-full rounded-[8px] object-cover"
                  priority
                />
              )}
            </div>
          ) : (
            <div
              onClick={() => !isLoading && fileRef.current?.click()}
              className="relative flex h-[232px] w-full cursor-pointer flex-col items-center justify-center rounded-[8px] border border-gray-200 bg-gray-100 transition-colors hover:bg-gray-200"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
              ) : (
                <>
                  <ImageUploaderIcon width={32} height={28} />
                  <p className="body-sm-regular text-gray-500">이미지 업로드</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* 다시 선택하기 버튼 */}
        {isValidImageUrl && !isImageError && (
          <div className="flex items-center justify-center">
            <button
              onClick={() => fileRef.current?.click()}
              disabled={isLoading}
              className="caption-sm-medium cursor-pointer rounded-[4px] bg-gray-400 px-[10px] py-[6px] text-white transition-colors hover:bg-gray-500 disabled:opacity-50"
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
