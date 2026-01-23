'use client'

import { Dispatch, SetStateAction } from 'react'
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
  error?: {
    title?: boolean
    category?: boolean
  }
}

export default function PostHeader({
  title,
  setTitle,
  setCategory,
  files,
  setFiles,
  categories,
  selectedCategoryIds = [],
  error = {},
}: PostHeaderProps) {
  const clickCheckbox = (id: number) => {
    setCategory((prev) => {
      if (prev.includes(id)) return prev.filter((catId) => catId !== id)
      return [...prev, id]
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">제목</span>
          {error.title && <span className="text-xs text-red-500">필수 항목입니다</span>}
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="공지 제목을 입력해주세요."
          className={`mt-1 w-full rounded-xl border px-4 py-3 text-sm outline-none ${error.title ? 'border-red-400' : 'border-gray-200'}`}
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">카테고리</span>
          {error.category && <span className="text-xs text-red-500">필수 항목입니다</span>}
        </div>
        <div className={'mt-1 grid grid-cols-5 gap-4 rounded-xl px-2 py-2'}>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-blue-500"
                checked={selectedCategoryIds.includes(cat.id)}
                onChange={() => clickCheckbox(cat.id)}
              />
              <span className="text-sm text-gray-700">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <ImageUpload type="post" files={files} setFiles={setFiles} />
    </div>
  )
}
