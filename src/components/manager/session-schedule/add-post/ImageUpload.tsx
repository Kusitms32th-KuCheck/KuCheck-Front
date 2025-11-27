'use client'

import { useRef, useCallback } from 'react'
import { CancleIcon, AddPhotoIcon } from '@/assets/svgComponents/manager'
import { SessionImage } from '@/types/manager/session/type'
import { deleteDetailImage } from '@/lib/manager/client/session'

type ImageUploadProps = {
  type?: 'post' | 'session'
  files: File[]
  setFiles: (files: File[] | ((prev: File[]) => File[])) => void
  editImage?: SessionImage[]
  setEditImage?: (images: SessionImage[]) => void
}

export default function ImageUpload({
  files,
  setFiles,
  type = 'session',
  editImage = [],
  setEditImage,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => fileInputRef.current?.click()

  const validateFiles = (files: File[]): { validFiles: File[]; invalidFiles: File[] } => {
    // pdf도 허용
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf']
    const maxSize = 10 * 1024 * 1024 // 10MB

    const validFiles: File[] = []
    const invalidFiles: File[] = []

    files.forEach((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase()

      if (!extension || !allowedExtensions.includes(extension)) {
        invalidFiles.push(file)
        return
      }

      if (file.size > maxSize) {
        invalidFiles.push(file)
        return
      }

      validFiles.push(file)
    })

    return { validFiles, invalidFiles }
  }

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const newFiles = Array.from(fileList)
      const { validFiles, invalidFiles } = validateFiles(newFiles)

      if (invalidFiles.length > 0) {
        const invalidNames = invalidFiles.map((f) => f.name).join(', ')
        alert(
          `다음 파일들이 올바르지 않은 형식이거나 크기가 너무 큽니다:\n${invalidNames}\n\n허용된 형식: JPG, JPEG, PNG, GIF, WEBP\n최대 크기: 10MB`
        )
      }

      if (validFiles.length > 0) {
        setFiles((prev) => [...prev, ...validFiles])
      }

      if (fileInputRef.current) fileInputRef.current.value = ''
    },
    [setFiles]
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const handleRemove = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index))

  // 기존 이미지 삭제
  const handleRemoveEditImage = async (index: number) => {
    if (!setEditImage) return
    const image = editImage[index]
    if (!image) return

    try {
      await deleteDetailImage(image.sessionImageId)
      setEditImage(editImage.filter((_, i) => i !== index))
    } catch (e) {
      alert('이미지 삭제에 실패했습니다.')
    }
  }

  const formatFileSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)}MB`

  // 기존 이미지와 새 파일 모두 없으면 안내 문구
  const isEmpty = (!editImage || editImage.length === 0) && files.length === 0

  return (
    <div className={`space-y-2 transition-all ${isEmpty ? 'pb-6' : 'pb-0'}`}>
      <div className="flex items-center gap-3">
        <label className="body-lg-semibold block">{type === 'post' ? '파일 첨부' : '이미지 첨부'}</label>
        <button
          type="button"
          onClick={handleClick}
          className="caption-sm-medium h-[26px] w-[54px] rounded-[4px] border text-gray-600 transition-colors hover:bg-gray-50"
        >
          내 PC
        </button>
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
      </div>

      {isEmpty ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="body-sm-medium flex h-[99px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[12px] border border-gray-200 bg-white text-gray-500"
        >
          <AddPhotoIcon width={24} height={24} />
          <p>파일을 마우스로 끌어오세요</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-t-[12px] border-t border-r border-l border-gray-200">
          <div className="body-sm-medium bg-background1 flex h-[40px] border-b bg-gray-50 text-gray-400">
            <div className="flex-1 px-[60px] py-2">파일명</div>
            <div className="w-20 px-4 py-2 text-right">용량</div>
          </div>
          <div className="divide-y text-sm">
            {/* 기존 이미지(수정모드) */}
            {editImage &&
              editImage.map((img, i) => (
                <div key={img.sessionImageId} className="flex items-center hover:bg-gray-50">
                  <div className="flex flex-1 items-center gap-3 py-2 pl-[16px]">
                    {setEditImage && (
                      <button
                        type="button"
                        onClick={() => handleRemoveEditImage(i)}
                        className="mr-[10px] text-gray-400 hover:text-red-500"
                      >
                        <CancleIcon width={24} height={24} />
                      </button>
                    )}
                    <img
                      src={img.sessionImagePreSignedUrl}
                      alt={img.sessionOriginalFileName}
                      className="h-[22px] w-[22px] object-cover"
                    />
                    <span className="body-sm-regular truncate text-gray-900">{img.sessionOriginalFileName}</span>
                  </div>
                  <span className="body-sm-medium w-20 px-4 py-2 text-right text-gray-400">-</span>
                </div>
              ))}
            {/* 새로 추가된 파일 */}
            {files.map((file, i) => {
              const extension = file.name.split('.').pop()?.toLowerCase()
              const isImage = extension && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)
              return (
                <div key={i} className="flex items-center hover:bg-gray-50">
                  <div className="flex flex-1 items-center gap-3 py-2 pl-[16px]">
                    <button
                      type="button"
                      onClick={() => handleRemove(i)}
                      className="mr-[10px] text-gray-400 hover:text-red-500"
                    >
                      <CancleIcon width={24} height={24} />
                    </button>
                    {isImage && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="h-[22px] w-[22px] object-cover"
                        onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                      />
                    )}
                    <span className="body-sm-regular truncate text-gray-900">{file.name}</span>
                  </div>
                  <span className="body-sm-medium w-20 px-4 py-2 text-right text-gray-400">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
