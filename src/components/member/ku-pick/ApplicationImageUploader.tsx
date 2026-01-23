'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import heic2any from 'heic2any'

import { useKuPickStore } from '@/store/member/kuPickStore'
import { ImageUploaderIcon } from '@/assets/svgComponents/member'

import MemberButton from '@/components/member/common/MemberButton'
import SubmitSuccess from '@/components/member/ku-pick/SubmitSuccess'

import { KuPickResponseType } from '@/types/member/ku-pick'

import { useFileUpload } from '@/hooks/useFileUpload'
import { formatDateTime } from '@/utils/common'
import { extractFileExtension, generateId } from '@/utils/upload'
import { postKuPickApplication } from '@/lib/member/client/ku-pick'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/member/common/toast/ToastContext'

interface ApplicationImageUploaderProps {
  myKuPickData: KuPickResponseType | undefined
}

export default function ApplicationImageUploader({ myKuPickData }: ApplicationImageUploaderProps) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const file = useKuPickStore((state) => state.applicationFile)
  const setState = useKuPickStore((state) => state.setState)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitSuccessOpen, setIsSubmitSuccessOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string>('')

  const { uploadFile } = useFileUpload()
  const { success, error } = useToast()

  useEffect(() => {
    return () => {
      setState({ viewFile: undefined })
    }
  }, [setState])

  // HEIC를 JPEG으로 변환하는 함수
  const convertHeicToJpeg = async (file: File): Promise<File> => {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.9, // JPEG 품질 0~1
      })

      // Blob을 File로 변환
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

    // HEIC 파일인 경우 변환
    if (selectedFile.type === 'image/heic' || selectedFile.type === 'image/heif' || selectedFile.name.toLowerCase().endsWith('.heic')) {
      try {
        selectedFile = await convertHeicToJpeg(selectedFile)
      } catch (err) {
        error((err as Error).message)
        return
      }
    }

    // 이미지 파일 검증
    if (!selectedFile.type.startsWith('image/')) {
      error('이미지 파일만 선택 가능합니다')
      return
    }

    // 파일 크기 검증 (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      error('파일 크기가 5MB를 초과합니다')
      return
    }

    // FileReader로 미리보기 생성
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string

      if (!result) {
        error('파일 읽기에 실패했습니다')
        return
      }

      setLocalPreviewUrl(result)
      setImageError(false)

      const fileInfo = {
        id: generateId(),
        name: selectedFile.name,
        size: selectedFile.size,
        url: result,
        file: selectedFile,
      }

      setState({ applicationFile: fileInfo })
    }

    reader.onerror = () => {
      error('파일을 읽을 수 없습니다')
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

      // 변환된 파일의 확장자 사용
      const extension = extractFileExtension(file.name)
      const presignedResponse = await postKuPickApplication(`kuPickApplication.${extension}`)

      if (!presignedResponse.success || !presignedResponse.data?.data?.newUrl) {
        throw new Error('프리사인드 URL 요청 실패')
      }

      const uploadResult = await uploadFile(file, {
        preSignedUrl: presignedResponse.data.data.newUrl,
      })

      if (!uploadResult.success) {
        throw new Error('파일 업로드 실패')
      }

      setState({ applicationFile: undefined })
      setLocalPreviewUrl('')
      router.push('/ku-pick')
      success('저장에 성공했어요.')
    } catch (err) {
      console.error('❌ 업로드 중 오류:', err)
      error('업로드 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const showLocalPreview = localPreviewUrl && !imageError
  const showStoredPreview = myKuPickData?.applicationUrl && !localPreviewUrl

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
        {showLocalPreview || showStoredPreview ? (
          <div className="relative h-[185px] w-full overflow-hidden rounded-[8px] border border-gray-200 bg-gray-100">
            {showLocalPreview ? (
              <img
                src={localPreviewUrl}
                alt="업로드 미리보기"
                className="h-full w-full rounded-[8px] object-cover"
              />
            ) : (
              <Image
                src={myKuPickData?.applicationUrl || ''}
                alt="저장된 이미지"
                fill
                className="h-full w-full rounded-[8px] object-cover"
                priority
                onError={() => setImageError(true)}
              />
            )}

            <div className="absolute inset-0 rounded-[8px] bg-black opacity-20" />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => fileRef.current?.click()}
                disabled={isLoading}
                className="caption-sm-medium rounded-[4px] bg-white px-[10px] py-[6px] transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                다시 선택하기
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => !isLoading && fileRef.current?.click()}
            className="relative flex h-[185px] w-full cursor-pointer flex-col items-center justify-center rounded-[8px] border border-gray-200 bg-gray-100 transition-colors hover:bg-gray-200"
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

      <div className="desktop:w-[375px] fixed bottom-[36px] w-full bg-white px-5">
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
