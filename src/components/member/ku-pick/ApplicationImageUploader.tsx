'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useKuPickStore } from '@/store/member/kuPickStore'
import { ImageUploaderIcon } from '@/assets/svgComponents/member'
import MemberButton from '@/components/member/common/MemberButton'
import SubmitSuccess from '@/components/member/ku-pick/SubmitSuccess'

import { KuPickResponseType } from '@/types/member/ku-pick'
import { useFileUpload } from '@/hooks/useFileUpload'
import { formatDateTime } from '@/utils/common'
import { extractFileExtension, generateId } from '@/utils/upload'
import { postKuPickApplication } from '@/lib/member/client/ku-pick'
import { useToast } from '@/components/member/common/toast/ToastContext'

interface ApplicationImageUploaderProps {
  myKuPickData: KuPickResponseType | undefined
}

export default function ApplicationImageUploader({ myKuPickData }: ApplicationImageUploaderProps) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const file = useKuPickStore((state) => state.applicationFile)
  const setState = useKuPickStore((state) => state.setState)
  const [isImageError, setIsImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [isSubmitSuccessOpen, setIsSubmitSuccessOpen] = useState(false)
  const { error, info } = useToast()

  const { uploadFile } = useFileUpload()

  useEffect(() => {
    return () => {
      setState({ applicationFile: undefined })
    }
  }, [setState])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0]

    if (!selectedFile) return

    // ✅ iOS HEIC 포함, 다양한 이미지 형식 지원
    const supportedFormats = [
      'image/heic',
      'image/heif',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
      'image/webp',
    ]

    if (!supportedFormats.includes(selectedFile.type)) {
      error('지원하는 형식: JPEG, PNG, GIF, WebP, HEIC')
      return
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      error('파일 크기가 10MB를 초과합니다')
      return
    }

    try {
      const reader = new FileReader()

      reader.onloadend = () => {
        if (typeof reader.result !== 'string') {
          error('파일을 읽을 수 없습니다')
          return
        }

        const fileInfo = {
          id: generateId(),
          name: selectedFile.name,
          size: selectedFile.size,
          url: reader.result, // ✅ data URL 형식
        }

        setState({ applicationFile: fileInfo })
        console.log('✅ 파일 선택 완료:', fileInfo.name)
      }

      reader.onerror = () => {
        error('파일을 읽을 수 없습니다')
        console.error('❌ FileReader 오류')
      }

      reader.readAsDataURL(selectedFile)
    } catch (err) {
      error('이미지 처리 중 오류가 발생했습니다')
      console.error('❌ handleFileChange 오류:', err)
    }
  }

  const handleSubmit = async () => {
    if (!file?.url) {
      error('업로드할 파일을 선택해주세요')
      return
    }

    try {
      setIsLoading(true)

      // presigned URL 요청
      const extension = extractFileExtension(file.name)
      const presignedResponse = await postKuPickApplication(`kuPickApplication.${extension}`)

      if (presignedResponse.error) {
        error(`${presignedResponse.error}`)
        return
      }

      if (!presignedResponse.success || !presignedResponse.data?.data?.newUrl) {
        throw new Error('프리사인드 URL 요청 실패')
      }

      console.log('✅ Presigned URL 획득:', presignedResponse.data.data.newUrl)

      // 파일 업로드
      const uploadResult = await uploadFile(file, {
        preSignedUrl: presignedResponse.data.data.newUrl,
      })

      if (!uploadResult.success) {
        error(uploadResult.error || '파일 업로드에 실패했습니다')
        return
      }

      // 업로드 성공
      router.push('/ku-pick')
      setState({ applicationFile: undefined })
      info('저장에 성공했어요')
    } catch (errorMessage) {
      error('업로드 중 오류가 발생했습니다')
      console.error('❌ handleSubmit 오류:', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const profileImageSrc = file?.url || myKuPickData?.applicationUrl || ''
  const isValidImageUrl = typeof profileImageSrc === 'string' && profileImageSrc.length > 0

  return (
    <div>
      {isSubmitSuccessOpen && <SubmitSuccess setIsSubmitSuccessOpen={setIsSubmitSuccessOpen} />}

      <input
        type="file"
        accept="image/heic,image/heif,image/png,image/jpeg,image/jpg,image/gif,image/webp"
        ref={fileRef}
        onChange={handleFileChange}
        disabled={isLoading}
        className="hidden"
        capture="environment" // ✅ iOS: 카메라 앱 직접 촬영 지원
      />

      <div className="relative mx-5 flex flex-col gap-y-2 rounded-[8px]">
        {isValidImageUrl && !isImageError ? (
          <div className="relative h-[185px] w-full rounded-[8px] border border-gray-200 bg-gray-100">
            <Image
              onError={() => setIsImageError(true)}
              src={profileImageSrc}
              alt="프로필"
              fill
              className="h-full w-full rounded-[8px] object-cover"
              priority
            />

            <div className="absolute inset-0 rounded-[8px] bg-black opacity-20" />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => fileRef.current?.click()}
                className="caption-sm-medium rounded-[4px] bg-white px-[10px] py-[6px] transition-colors hover:bg-gray-50 disabled:opacity-50"
                disabled={isLoading}
              >
                다시 선택하기
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => !isLoading && fileRef.current?.click()}
            className="relative flex h-[185px] w-full cursor-pointer flex-col items-center justify-center rounded-[8px] border border-gray-200 bg-gray-100"
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

        {myKuPickData?.applicationDateTime && (
          <p className="caption-sm-medium text-primary-500">
            제출 일시: {formatDateTime(myKuPickData?.applicationDateTime)}
          </p>
        )}
      </div>

      <div className="desktop:w-[375px] fixed bottom-[60px] w-full bg-white px-5">
        <MemberButton
          buttonType="button"
          styleStatus={!file?.url || isLoading ? 'disabled' : 'default'}
          styleType="primary"
          onClick={handleSubmit}
          disabled={!file?.url || isLoading}
        >
          {isLoading ? '업로드 중...' : '저장하기'}
        </MemberButton>
      </div>
    </div>
  )
}
