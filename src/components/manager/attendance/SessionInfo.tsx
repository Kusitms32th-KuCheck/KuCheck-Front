'use client'
import { useEffect, useState } from 'react'
import ManagerButton from '../common/ManagerButton'

interface SessionInfoProps {
  location: string
  time: string
}

export default function SessionInfo({ location, time }: SessionInfoProps) {
  const [showStickyHeader, setShowStickyHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector('main')
      if (!mainContent) return

      const currentScroll = mainContent.scrollTop
      setShowStickyHeader(currentScroll > 0 && currentScroll < 600)
    }

    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll)
      return () => mainContent.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const HeaderContent = () => (
    <>
      <p className="heading-1xl-semibold">집중협업시간</p>
      <ManagerButton customClassName="w-[160px]" styleSize="md" onClick={() => console.log('출석체크 시작하기 클릭됨')}>
        출석체크 시작하기
      </ManagerButton>
    </>
  )

  return (
    <>
      {showStickyHeader && (
        <div
          className="fixed top-[68px] right-0 left-[240px] z-50 flex h-[110px] items-center justify-between bg-white px-[30px] py-[24px] transition-all duration-300"
          style={{
            boxShadow: '4px 4px 13px -6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <HeaderContent />
        </div>
      )}

      <div className="rounded-[12px] bg-white px-[30px] py-[24px]">
        <div className="flex h-[62px] w-full items-start justify-between">
          <HeaderContent />
        </div>
        <div className="body-lg-medium text-gray-500">
          <div className="flex h-[62px] w-full flex-col items-start justify-between py-1">
            <div className="flex items-center gap-x-3">
              <p>장소</p>
              <p>{location}</p>
            </div>
            <div className="flex items-center gap-x-3">
              <p>일시</p>
              <p>{time}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
