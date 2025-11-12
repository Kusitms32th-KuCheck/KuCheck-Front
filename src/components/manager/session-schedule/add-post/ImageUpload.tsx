'use client'

import { useRef, useCallback } from 'react'
import { CancleIcon, AddPhotoIcon } from '@/assets/svgComponents/manager'

type ImageUploadProps = {
  files: File[]
  setFiles: (files: File[] | ((prev: File[]) => File[])) => void
}

export default function ImageUpload({ files, setFiles }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => fileInputRef.current?.click()

  const validateFiles = (files: File[]): { validFiles: File[]; invalidFiles: File[] } => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
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

  const formatFileSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)}MB`

  return (
    <div className={`space-y-2 transition-all ${files.length === 0 ? 'pb-6' : 'pb-0'}`}>
      <div className="flex items-center gap-3">
        <label className="body-lg-semibold block">이미지 첨부</label>
        <button
          type="button"
          onClick={handleClick}
          className="caption-sm-medium h-[26px] w-[54px] rounded-[4px] border text-gray-600 transition-colors hover:bg-gray-50"
        >
          내 PC
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {files.length === 0 ? (
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
            {files.map((file, i) => (
              <div key={i} className="flex items-center hover:bg-gray-50">
                <div className="flex flex-1 items-center gap-3 py-2 pl-[16px]">
                  <button type="button" onClick={() => handleRemove(i)} className="text-gray-400 hover:text-red-500">
                    <CancleIcon width={24} height={24} />
                  </button>
                  <span className="body-sm-regular truncate px-[10px] text-gray-900">{file.name}</span>
                </div>
                <span className="body-sm-medium w-20 px-4 py-2 text-right text-gray-400">
                  {formatFileSize(file.size)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
