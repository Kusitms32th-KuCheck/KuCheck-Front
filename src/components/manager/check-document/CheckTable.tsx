'use client'

import { useEffect, useState } from 'react'
import CheckTableHeader from './CheckTableHeader'
import CheckTableRow from './CheckTableRow'
import Dropdown from '../common/ManagerdropDown'
import TopToast from '../common/TopToast'
import { CalendarIcon, CalendarOnIcon, UpIcon, DownIcon } from '@/assets/svgComponents/manager'
import { getKupickMonths } from '@/utils/manager/kupick'
import type { CheckDocumentRecord } from '@/types/manager/check-document/types'
import { KupickIcon } from '@/assets/svgComponents/manager'

interface CheckTableProps {
  records: CheckDocumentRecord[]
}

export default function CheckTable({ records }: CheckTableProps) {
  const kupickMonths = getKupickMonths()
  const currentMonth = new Date().getMonth() + 1
  const defaultMonth = kupickMonths.includes(currentMonth) ? `${currentMonth}월` : '10월'
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth)
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  console.log('CheckTable records:', records)
  const gridTemplate = '164px 586px 204px 227px 227px 164px'

  // 큐픽 월들을 역순으로 정렬하여 드롭다운 옵션 생성
  const dropdownOptions = kupickMonths
    .sort((a, b) => b - a)
    .map((month) => ({
      label: `${month}월`,
      value: `${month}월`,
    }))

  // 초기 토스트 표시
  useEffect(() => {
    setToastMessage('먼저 증빙 서류를 확인해 주세요')
  }, [])

  // 스크롤 처리
  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector('main')
      if (!mainContent) return

      const currentScroll = (mainContent as HTMLElement).scrollTop
      setShowStickyHeader(currentScroll > 0)
    }

    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll)
      return () => mainContent.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleToast = (message: string) => {
    setToastMessage(message)
    // 토스트 지속 시간 후 메시지 초기화
    setTimeout(() => {
      setToastMessage(null)
    }, 3400) // 토스트 지속시간(3000) + 페이드 아웃(400)
  }

  const HeaderContent = () => (
    <>
      <div className="flex items-center gap-2">
        <p className="heading-md-semibold m-0 p-0">{selectedMonth} 큐픽</p>
        <p className="body-lg-semibold m-0 flex h-6 w-[30px] items-center justify-center rounded-full bg-black p-0 text-white">
          {visibleCount}
        </p>
      </div>
    </>
  )

  const selectedMonthNumber = Number(selectedMonth.replace('월', ''))
  const visibleRecords = records.filter((r) => {
    try {
      const m = Number(r.submitDate?.split?.('-')?.[1] ?? NaN)
      return Number.isFinite(m) && m === selectedMonthNumber
    } catch {
      return false
    }
  })
  const visibleCount = visibleRecords.length

  return (
    <div className="flex min-h-[calc(100vh-176px)] flex-col gap-6 rounded-[12px] bg-white pt-7 pb-6">
      {showStickyHeader && (
        <div
          className="fixed top-[68px] right-0 left-[240px] z-50 flex h-[110px] items-center justify-between bg-white px-[30px] py-[24px] transition-all duration-300"
          style={{ boxShadow: '4px 4px 13px -6px rgba(0, 0, 0, 0.1)' }}
        >
          <HeaderContent />
        </div>
      )}

      <div className="flex items-center justify-between px-6">
        <HeaderContent />
        <Dropdown
          size="lg"
          options={dropdownOptions}
          selected={selectedMonth}
          onChange={setSelectedMonth}
          leftIcon={<CalendarIcon width={24} height={24} />}
          leftIconActive={<CalendarOnIcon width={24} height={24} />}
          rightIcon={<DownIcon width={24} height={24} />}
          rightIconActive={<UpIcon width={24} height={24} />}
          placeholder="선택"
        />
      </div>

      <div className="overflow-x-auto">
        <CheckTableHeader gridTemplate={gridTemplate} />
        {visibleRecords.map((record, index) => (
          <CheckTableRow
            key={index}
            record={record}
            isEven={index % 2 === 0}
            gridTemplate={gridTemplate}
            onToast={handleToast}
          />
        ))}
      </div>

      {toastMessage && (
        <TopToast
          icon={<KupickIcon width={24} height={24} />}
          message={toastMessage}
          key={toastMessage} // 메시지가 바뀔 때마다 새 토스트 생성
        />
      )}
    </div>
  )
}
