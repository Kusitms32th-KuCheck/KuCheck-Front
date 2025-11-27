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
import { useDebugStore } from '@/store/member/debugStore'

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
  const addLog = useDebugStore((state) => state.addLog)

  const { uploadFile } = useFileUpload()

  useEffect(() => {
    return () => {
      setState({ applicationFile: undefined })
    }
  }, [setState])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0]

    if (!selectedFile) {
      addLog('파일 선택 취소', 'info')
      return
    }

    addLog('파일 선택됨', 'info', `파일명: ${selectedFile.name}, 크기: ${selectedFile.size} bytes, 타입: ${selectedFile.type}`)

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
      const errorMsg = `지원하지 않는 형식: ${selectedFile.type}`
      error('지원하는 형식: JPEG, PNG, GIF, WebP, HEIC')
      addLog('지원하지 않는 형식', 'error', errorMsg)
      return
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      error('파일 크기가 10MB를 초과합니다')
      addLog('파일 크기 초과', 'error', `파일 크기: ${selectedFile.size} bytes`)
      return
    }

    try {
      const reader = new FileReader()

      reader.onloadend = () => {
        try {
          if (typeof reader.result !== 'string') {
            throw new Error('FileReader 결과가 문자열이 아닙니다')
          }

          const fileInfo = {
            id: generateId(),
            name: selectedFile.name,
            size: selectedFile.size,
            url: reader.result,
          }

          setState({ applicationFile: fileInfo })
          addLog('파일 처리 완료', 'log', `data URL 길이: ${fileInfo.url.length}`)
          console.log('✅ 파일 선택 완료:', fileInfo.name)
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : '알 수 없는 오류'
          error('파일을 읽을 수 없습니다')
          addLog('FileReader onloadend 오류', 'error', errorMsg)
        }
      }

      reader.onerror = () => {
        error('파일을 읽을 수 없습니다')
        addLog('FileReader 오류', 'error', `읽기 오류 발생`)
      }

      reader.onabort = () => {
        addLog('FileReader 중단', 'warn')
      }

      addLog('FileReader 시작', 'log', `readAsDataURL 호출`)
      reader.readAsDataURL(selectedFile)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '알 수 없는 오류'
      error('이미지 처리 중 오류가 발생했습니다')
      addLog('handleFileChange 예외', 'error', errorMsg)
    }
  }

  const handleSubmit = async () => {
    if (!file?.url) {
      error('업로드할 파일을 선택해주세요')
      addLog('파일 미선택', 'warn', 'file.url이 없습니다')
      return
    }

    try {
      setIsLoading(true)

      addLog('Presigned URL 요청', 'info')
      const extension = extractFileExtension(file.name)
      const presignedResponse = await postKuPickApplication(`kuPickApplication.${extension}`)

      if (presignedResponse.error) {
        const errorMsg = presignedResponse.error
        error(`${errorMsg}`)
        addLog('Presigned URL 에러', 'error', errorMsg)
        return
      }

      if (!presignedResponse.success || !presignedResponse.data?.data?.newUrl) {
        throw new Error('프리사인드 URL 요청 실패')
      }

      addLog('Presigned URL 획득 완료', 'info')

      const uploadResult = await uploadFile(file, {
        preSignedUrl: presignedResponse.data.data.newUrl,
      })

      if (!uploadResult.success) {
        const errorMsg = uploadResult.error || '파일 업로드에 실패했습니다'
        error(errorMsg)
        addLog('업로드 실패', 'error', errorMsg)
        return
      }

      router.push('/ku-pick')
      setState({ applicationFile: undefined })
      info('저장에 성공했어요')
      addLog('업로드 성공 및 리다이렉트', 'log')
    } catch (errorMessage) {
      const errorMsg = errorMessage instanceof Error ? errorMessage.message : '알 수 없는 오류'
      error('업로드 중 오류가 발생했습니다')
      addLog('handleSubmit 예외', 'error', errorMsg)
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
