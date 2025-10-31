'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { CameraIcon, ProfileIcon } from '@/assets/svgComponents'
import { useSettingStore } from '@/store/member/settingStore'
import { extractFileExtension, generateId } from '@/utils/upload'
import { useFileUpload } from '@/hooks/useFileUpload'
import { getMembersProfileImageUrl } from '@/lib/member/client/setting'
import { UserSummaryType } from '@/types/member/user'

interface ProfileContainerProps {
  userData: UserSummaryType | undefined
}

export default function ProfileContainer({ userData }: ProfileContainerProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const file = useSettingStore((state) => state.file)
  const setState = useSettingStore((state) => state.setState)
  const [isImageError, setIsImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { uploadFile } = useFileUpload()

  /**
   * 이미지 미리보기 및 업로드
   */
  const handleImagePreview = async (selectedFile: File) => {
    try {
      setIsLoading(true)

      // 1. 파일 읽기 및 미리보기 설정
      const reader = new FileReader()

      reader.onloadend = async () => {
        const fileInfo = {
          id: generateId(),
          name: selectedFile.name,
          size: selectedFile.size,
          url: reader.result as string,
          file: selectedFile, // 실제 File 객체 저장
        }

        setState({ file: fileInfo })

        // 2. 프리사인드 URL 요청
        try {
          const extension = extractFileExtension(selectedFile.name)
          console.log(`profile.${extension}`)
          const presignedResponse = await getMembersProfileImageUrl(`profile.${extension}`)
          console.log('presignedResponse', presignedResponse.data?.data?.newUrl)

          if (!presignedResponse.success) {
            throw new Error('프리사인드 URL 요청 실패')
          }

          console.log('fileInfo', fileInfo)
          // 3. S3에 파일 업로드
          if (selectedFile && presignedResponse.data?.data?.newUrl) {
            console.log('통과')
            const uploadResult = await uploadFile(fileInfo, {
              preSignedUrl: presignedResponse?.data?.data?.newUrl,
            })
            if (!uploadResult.success) {
              throw new Error('파일 업로드 실패')
            }

            console.log('✅ 프로필 이미지 업로드 성공:', uploadResult)
          }

          // toast 성공 메시지
        } catch (error) {
          console.error('❌ 업로드 중 오류:', error)
          // toast 에러 메시지
        }
      }

      reader.readAsDataURL(selectedFile)
    } catch (error) {
      console.error('❌ 파일 처리 중 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0]

    if (selectedFile) {
      // 파일 검증 (선택사항)
      if (!selectedFile.type.startsWith('image/')) {
        console.error('❌ 이미지 파일만 선택 가능합니다')
        return
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB 제한
        console.error('❌ 파일 크기가 5MB를 초과합니다')
        return
      }

      handleImagePreview(selectedFile)
    }
  }

  // 프로필 이미지 URL 결정
  const profileImageSrc = file?.url || userData?.profileImage || '/default-profile.png'

  // URL이 유효한지 확인
  const isValidImageUrl = profileImageSrc && typeof profileImageSrc === 'string'

  return (
    <section className="flex flex-col items-center gap-y-3">
      <div onClick={() => !isLoading && fileRef.current?.click()} className="relative h-[90px] w-[90px] cursor-pointer">
        {isValidImageUrl && !isImageError ? (
          <Image
            onError={() => setIsImageError(true)}
            src={profileImageSrc}
            alt="프로필"
            fill
            className="h-full w-full rounded-full object-cover"
            priority
          />
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
