'use client'

import { useRef, useState, useCallback } from 'react'
import { CancleIcon, AddPhotoIcon } from '@/assets/svgComponents/manager'

export default function ImageUpload() {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => fileInputRef.current?.click()

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles = Array.from(fileList)
    setFiles((prev) => [...prev, ...newFiles])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

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
