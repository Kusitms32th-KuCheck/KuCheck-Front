'use client'

import { useEffect, useState } from 'react'
import { NoticePlusIcon, NoticeTagIcon } from '@/assets/svgComponents/manager'
import ManagerButton from '../common/ManagerButton'

export default function CreateNoticeHeader() {
  const [showStickyHeader, setShowStickyHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector('main')
      if (!mainContent) return

      const currentScroll = mainContent.scrollTop
      setShowStickyHeader(currentScroll > 0 && currentScroll < 400)
    }

    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll)
      return () => mainContent.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const HeaderContent = () => (
    <>
      <p className="heading-lg-medium">공지 등록</p>
      <div className="flex gap-[11px]">
        <button
          className={`body-sm-medium flex cursor-pointer items-center gap-[6px] rounded-[4px] ${showStickyHeader ? 'bg-background2' : 'bg-white'} px-3 py-2 text-gray-600 hover:bg-[#FAFAFA]`}
          onClick={() => console.log('카테고리 편집 클릭됨')}
        >
          <NoticeTagIcon width={16} height={16} />
          카테고리 편집
        </button>

        <ManagerButton onClick={() => console.log('공지 등록하기 클릭됨')} styleSize="sm">
          <NoticePlusIcon width={16} height={16} />
          공지 등록하기
        </ManagerButton>
      </div>
    </>
  )

  return (
    <>
      {showStickyHeader && (
        <div
          className="fixed top-[68px] right-0 left-[240px] z-50 flex h-[100px] items-center justify-between bg-white px-6 transition-all duration-300"
          style={{
            boxShadow: '4px 4px 13px -6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <HeaderContent />
        </div>
      )}

      <div className="flex flex-row items-center justify-between px-6 pt-8">
        <HeaderContent />
      </div>
    </>
  )
}
