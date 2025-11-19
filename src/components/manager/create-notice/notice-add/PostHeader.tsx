'use client'

import { Dispatch, SetStateAction } from 'react'
import InputField from '../../session-schedule/add-post/InputField'
import ImageUpload from '../../session-schedule/add-post/ImageUpload'
import { NoticeCategory } from '@/types/manager/notice/type'

type PostHeaderProps = {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  setCategory: Dispatch<SetStateAction<number[]>>
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
  categories: NoticeCategory[]
  selectedCategoryIds?: number[] // 선택된 카테고리
  error?: boolean
}

export default function PostHeader({
  title,
  setTitle,
  setCategory,
  files,
  setFiles,
  categories,
  selectedCategoryIds = [],
  error,
}: PostHeaderProps) {
  const clickCheckbox = (id: number) => {
    setCategory((prev) => {
      if (prev.includes(id)) return prev.filter((catId) => catId !== id)
      return [...prev, id]
    })
  }

  return (
    <div className="space-y-6">
      <InputField label="제목" value={title} onChange={setTitle} placeholder="공지 제목을 입력해주세요." />
      <InputField label="카테고리">
        <div className="grid grid-cols-5 gap-4">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-blue-500"
                checked={selectedCategoryIds.includes(cat.id)} // ✅ 선택 표시
                onChange={() => clickCheckbox(cat.id)}
              />
              <span className="text-sm text-gray-700">{cat.name}</span>
            </label>
          ))}
        </div>
      </InputField>

      <ImageUpload type="post" files={files} setFiles={setFiles} />
    </div>
  )
}
