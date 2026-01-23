'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import heic2any from 'heic2any'
import { CameraIcon, ProfileIcon } from '@/assets/svgComponents'
import { useSettingStore } from '@/store/member/settingStore'
import { extractFileExtension, generateId } from '@/utils/upload'
import { useFileUpload } from '@/hooks/useFileUpload'
import { getMembersProfileImageUrl } from '@/lib/member/client/setting'
import { UserSummaryType } from '@/types/member/user'
import { useToast } from '@/components/member/common/toast/ToastContext'

interface ProfileContainerProps {
  userData: UserSummaryType | undefined
}

export default function ProfileContainer({ userData }: ProfileContainerProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const file = useSettingStore((state) => state.file)
  const setState = useSettingStore((state) => state.setState)
  const [isImageError, setIsImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string>('')

  const { uploadFile } = useFileUpload()
  const { error, success } = useToast()

  /**
   * HEIC를 JPEG으로 변환
   */
  const convertHeicToJpeg = async (file: File): Promise<File> => {
    try {
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

  /**
   * 이미지 미리보기 및 업로드
   */
  const handleImagePreview = async (selectedFile: File) => {
    try {
      setIsLoading(true)
      const reader = new FileReader()

      reader.onload = async () => {
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
          name: selectedFile.name,
          size: selectedFile.size,
          url: result,
          file: selectedFile,
        }

        setState({ file: fileInfo })

        try {
          const extension = extractFileExtension(selectedFile.name)
          const presignedResponse = await getMembersProfileImageUrl(`profile.${extension}`)

          if (presignedResponse.error) {
            error(`${presignedResponse.error}`)
            return
          }

          if (!presignedResponse.success) {
            throw new Error('프리사인드 URL 요청 실패')
          }

          if (presignedResponse.data?.data?.newUrl) {
            const uploadResult = await uploadFile(fileInfo, {
              preSignedUrl: presignedResponse.data.data.newUrl,
            })

            if (!uploadResult.success) {
              error('파일 업로드 실패하였습니다')
              throw new Error('파일 업로드 실패')
            }

            success('프로필 이미지 업로드 성공하였습니다.')
          }
        } catch (err) {
          console.error('❌ 업로드 중 오류:', err)
          error('업로드 중 오류가 발생했습니다')
        }
      }

      reader.onerror = () => {
        error('파일을 읽을 수 없습니다')
      }

      reader.readAsDataURL(selectedFile)
    } catch (err) {
      console.error('❌ 파일 처리 중 오류:', err)
      error((err as Error).message)
    } finally {
      setIsLoading(false)
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

      handleImagePreview(selectedFile)
    } catch (err) {
      error((err as Error).message)
      if (fileRef.current) {
        fileRef.current.value = ''
      }
    }
  }

  // 미리보기 이미지 선택 로직
  const showLocalPreview = localPreviewUrl && !isImageError
  const showStoredPreview = userData?.profileImage && !localPreviewUrl
  const profileImageSrc = showLocalPreview ? localPreviewUrl : (showStoredPreview ? userData?.profileImage : '/default-profile.png')

  return (
    <section className="flex flex-col items-center gap-y-3">
      <div
        onClick={() => !isLoading && fileRef.current?.click()}
        className="relative h-[90px] w-[90px] cursor-pointer"
      >
        {profileImageSrc && profileImageSrc !== '/default-profile.png' ? (
          showLocalPreview ? (
            <img
              src={profileImageSrc}
              alt="프로필 미리보기"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <Image
              onError={() => setIsImageError(true)}
              src={profileImageSrc}
              alt="프로필"
              fill
              className="h-full w-full rounded-full object-cover"
              priority
            />
          )
        ) : (
          <ProfileIcon width={90} height={90} />
        )}

        <div className="absolute right-0 bottom-0 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-gray-100 bg-white">
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          ) : (
            <CameraIcon width={20} height={18} />
          )}
        </div>

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,.heic"
          id="input-file"
          ref={fileRef}
          name="input-file"
          onChange={handleFileChange}
          disabled={isLoading}
          className="hidden"
        />
      </div>
      <p className="body-lg-semibold">{userData?.name}</p>
    </section>
  )
}
