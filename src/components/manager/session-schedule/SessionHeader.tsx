'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import WriteHeader from '../common/WriteHeader'
import ManagerButton from '../common/ManagerButton'
import { useSessionEdit } from './SessionEditContext'

export default function SessionHeader() {
  const pathname = usePathname() || ''
  const isAddOrDetailAdd = pathname.includes('/detail') || pathname.includes('/detail-add')

  const { isEditing, toggleEdit } = useSessionEdit()
  const [showStickyHeader, setShowStickyHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector('main')
      if (!mainContent) return

      const currentScroll = mainContent.scrollTop
      setShowStickyHeader(currentScroll > 0)
    }

    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll)
      return () => mainContent.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const HeaderContent = () => (
    <>
      <p className="heading-lg-medium">세션 일정</p>
      <ManagerButton onClick={() => toggleEdit()} styleSize="sm">
        {isEditing ? '저장하기' : '수정하기'}
      </ManagerButton>
    </>
  )

  return (
    <>
      {isAddOrDetailAdd ? (
        <WriteHeader />
      ) : (
        <>
          {showStickyHeader && (
            <div
              className="fixed top-[68px] right-0 left-[240px] z-50 flex h-[110px] items-center justify-between bg-white px-[30px] py-[18px]"
              style={{ boxShadow: '4px 4px 13px -6px rgba(0, 0, 0, 0.1)' }}
            >
              <HeaderContent />
            </div>
          )}

          <div className="flex flex-row items-center justify-between px-6 pt-8">
            <HeaderContent />
          </div>
        </>
      )}
    </>
  )
}
