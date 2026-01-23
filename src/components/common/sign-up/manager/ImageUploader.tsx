import { UploadCloudIcon, XGray300Icon, XIcon } from '@/assets/svgComponents/member'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSignUpStore } from '@/store/signUpStore'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useToast } from '@/components/member/common/toast/ToastContext'
import { usePathname, useRouter } from 'next/navigation'
import { extractFileExtension, formatFileSize, generateId } from '@/utils/upload'
import { getMembersProfileImageUrl } from '@/lib/member/common'
import Image from 'next/image'

export default function ImageUploader() {
  const fileRef = useRef<HTMLInputElement>(null)
  const file = useSignUpStore((state) => state.file)
  const setFile = useSignUpStore((state) => state.setFile)

  const { error } = useToast()


  useEffect(() => {
    return () => {
      setFile(undefined)
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
      setFile(fileInfo)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleRemoveImage = () => {
    setFile(undefined)
    // 파일 input 초기화
    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }

  const profileImageSrc = typeof file?.url === 'string' ? file.url : ''

  return (
    <div className="flex flex-col gap-y-4">
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 업로드 영역 */}
      <section
        onClick={() => fileRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center gap-y-[10px] border border-dashed border-gray-300 rounded-[12px] h-[124px] transition-colors hover:bg-gray-50"
      >
        <div className="flex flex-col items-center justify-center gap-y-1">
          <UploadCloudIcon width={28} height={28} />
        </div>
        <p className="body-md-medium text-gray-400">10MB 이하의 이미지만 업로드 가능합니다</p>
      </section>

      {/* 이미지 미리보기 */}
      {profileImageSrc && (
        <div className="px-5 py-2 rounded-[8px] border border-gray-200 flex justify-between items-center">
          <div className="flex gap-x-5 items-center">
            <button
              onClick={handleRemoveImage}
              type="button"
              className="hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="이미지 삭제"
            >
              <XGray300Icon width={24} height={24} />
            </button>
            <div className="relative h-[22px] w-[22px] ">
              {profileImageSrc && (
                <Image
                  src={profileImageSrc}
                  alt="선택된 이미지"
                  fill
                  className="object-cover rounded"
                  priority
                />
              )}
            </div>
            <p className="body-sm-regular">{file?.name}</p>
          </div>
          <p className="body-sm-medium text-gray-400">{formatFileSize(file?.size)}</p>
        </div>
      )}
    </div>

  )
}
