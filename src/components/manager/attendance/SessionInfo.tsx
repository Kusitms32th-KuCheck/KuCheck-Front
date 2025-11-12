'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ManagerButton from '../common/ManagerButton'

interface SessionInfoProps {
  location?: string
  time?: string
  sessionTitle?: string
  isHoliday?: boolean
  category?: string
}

export default function SessionInfo({ location, time, sessionTitle, isHoliday, category }: SessionInfoProps) {
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const router = useRouter()

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

  const getDisplayTitle = () => {
    if (isHoliday) return '공휴일'
    if (category === 'REST') return '휴회'
    return sessionTitle
  }

  const isButtonDisabled = isHoliday || category === 'REST'
  const shouldShowLocationTime = !isHoliday && category !== 'REST'

  const HeaderContent = () => (
    <>
      <p className="heading-1xl-semibold">{getDisplayTitle()}</p>
      <ManagerButton
        disabled={isButtonDisabled}
        customClassName="w-[160px]"
        styleSize="md"
        onClick={() => {
          const params = new URLSearchParams()
          if (sessionTitle) params.set('title', sessionTitle)
          if (location) params.set('location', location)
          if (time) params.set('time', time)
          const queryString = params.toString()
          const url = queryString ? `/attendance/qr?${queryString}` : '/attendance/qr'
          router.push(url)
        }}
      >
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
        <div className={`body-lg-medium text-gray-500 ${shouldShowLocationTime ? '' : 'invisible'}`}>
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
