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
import { postKuPickView } from '@/lib/member/client/ku-pick'
import { useToast } from '@/components/member/common/toast/ToastContext'

interface ViewImageUploaderProps {
  myKuPickData: KuPickResponseType | undefined
}

export default function ViewImageUploader({ myKuPickData }: ViewImageUploaderProps) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const file = useKuPickStore((state) => state.viewFile)
  const setState = useKuPickStore((state) => state.setState)
  const [isImageError, setIsImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [isSubmitSuccessOpen, setIsSubmitSuccessOpen] = useState(false)

  const { uploadFile } = useFileUpload()

  const { error, info } = useToast()

  useEffect(() => {
    return () => {
      setState({ viewFile: undefined })
    }
  }, [])

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
      setState({ viewFile: fileInfo })
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
      const presignedResponse = await postKuPickView(`kuPickView.${extension}`)

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

      if (uploadResult.success) {
        router.push('/ku-pick')
        setState({ viewFile: undefined })
        info('저장에 성공했어요')
      }
    } catch (errorMessage) {
      // error('업로드 중 오류가 발생하였습니다')
      console.error('❌ :', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const profileImageSrc = file?.url || myKuPickData?.viewUrl || ''
  const isValidImageUrl = profileImageSrc && typeof profileImageSrc === 'string'

  return (
    <div>
      {isSubmitSuccessOpen && <SubmitSuccess setIsSubmitSuccessOpen={setIsSubmitSuccessOpen} />}
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg,.heic"
        ref={fileRef}
        onChange={handleFileChange}
        disabled={isLoading}
        className="hidden"
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
                className="caption-sm-medium rounded-[4px] bg-white px-[10px] py-[6px] transition-colors hover:bg-gray-50"
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
              <ImageUploaderIcon width={32} height={28} />
            )}
            <p className="body-sm-regular text-gray-500">이미지 업로드</p>
          </div>
        )}

        {myKuPickData?.viewDateTime && (
          <p className="caption-sm-medium text-primary-500">제출 일시: {formatDateTime(myKuPickData?.viewDateTime)}</p>
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
