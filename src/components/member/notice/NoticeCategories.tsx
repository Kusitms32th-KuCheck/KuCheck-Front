'use client'

import { NoticeCategoryType } from '@/types/member/notice'
import { useNoticeStore } from '@/store/member/noticeStore'

interface NoticeCategoriesType {
  noticeCategories: NoticeCategoryType[] | undefined
}
export default function NoticeCategories({ noticeCategories }: NoticeCategoriesType) {
  const setState = useNoticeStore((state) => state.setState)
  const selectedCategoryId = useNoticeStore((state) => state.selectedCategoryId)

  return (
    <section className="flex gap-x-2 overflow-x-scroll">
      <button
        type="button"
        onClick={() => {
          setState({ selectedCategoryId: 0 })
        }}
        className={`${selectedCategoryId === 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'} body-sm-medium rounded-[30px] px-4 py-[9px] whitespace-nowrap`}
      >
        전체
      </button>
      {noticeCategories?.map((noticeCategory) => (
        <button
          type="button"
          key={noticeCategory.id}
          onClick={() => {
            setState({ selectedCategoryId: noticeCategory.id })
          }}
          className={`${selectedCategoryId === noticeCategory.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'} body-sm-medium rounded-[30px] px-4 py-[9px] whitespace-nowrap`}
        >
          {noticeCategory.name}
        </button>
      ))}
    </section>
  )
}
