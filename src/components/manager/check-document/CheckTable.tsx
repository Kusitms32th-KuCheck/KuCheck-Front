'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import CheckTableHeader from './CheckTableHeader'
import CheckTableRow from './CheckTableRow'
import Dropdown from '../common/ManagerdropDown'
import TopToast from '../common/TopToast'
import { CalendarIcon, CalendarOnIcon, UpIcon, KupicArrowIcon, KupickIcon } from '@/assets/svgComponents/manager'

import { getKupickMonths } from '@/utils/manager/kupick'
import type { CheckDocumentRecord } from '@/types/manager/check-document/types'
import { getKupicClient } from '@/lib/manager/client/kupic'

export default function CheckTable() {
  const kupickMonths = getKupickMonths()
  const currentMonth = new Date().getMonth() + 1
  const defaultMonth = kupickMonths.includes(currentMonth) ? `${currentMonth}월` : '10월'

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth)
  const [records, setRecords] = useState<CheckDocumentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showStickyHeader, setShowStickyHeader] = useState(false)

  const gridTemplate = '164px 586px 204px 227px 227px 164px'
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const dropdownOptions = useMemo(
    () => [...kupickMonths].sort((a, b) => b - a).map((month) => ({ label: `${month}월`, value: `${month}월` })),
    [kupickMonths]
  )
  const fetchKupicData = async (year: number, month: number) => {
    setLoading(true)
    try {
      const result = await getKupicClient(year, month)
      setRecords(result.success ? result.data || [] : [])
    } catch (err) {
      console.error('Error fetching kupic data:', err)
      setRecords([])
    } finally {
      setLoading(false)
    }
  }

  // 초기 데이터 로딩 + 드롭다운 변경 시
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const monthNumber = Number(selectedMonth.replace('월', ''))
    fetchKupicData(currentYear, monthNumber)
  }, [selectedMonth])

  // 초기 토스트 표시
  useEffect(() => {
    setToastMessage('먼저 증빙 서류를 확인해 주세요')
  }, [])

  // 스크롤 처리
  useEffect(() => {
    const mainContent = document.querySelector('main')
    if (!mainContent) return

    const handleScroll = () => {
      const currentScroll = (mainContent as HTMLElement).scrollTop
      setShowStickyHeader(currentScroll > 0)
    }

    mainContent.addEventListener('scroll', handleScroll)
    return () => mainContent.removeEventListener('scroll', handleScroll)
  }, [])

  // 토스트 표시
  const handleToast = (toast: { message: string; icon?: React.ReactNode }) => {
    const message = toast?.message ?? ''
    setToastMessage(message)
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 3400)
  }

  const visibleCount = records.length

  const HeaderContent = () => (
    <div className="flex items-center gap-2">
      <p className="heading-md-semibold m-0 p-0">{selectedMonth} 큐픽</p>
      <p className="body-lg-semibold m-0 flex h-6 w-[30px] items-center justify-center rounded-full bg-black p-0 text-white">
        {visibleCount}
      </p>
    </div>
  )

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
          leftIcon={<CalendarOnIcon width={24} height={24} />}
          leftIconActive={<CalendarOnIcon width={24} height={24} />}
          rightIcon={<KupicArrowIcon width={24} height={24} />}
          rightIconActive={<UpIcon width={24} height={24} />}
          placeholder="선택"
        />
      </div>

      <div className="overflow-x-auto">
        <CheckTableHeader gridTemplate={gridTemplate} />
        {loading ? (
          <div className="flex h-[60vh] items-center justify-center">
            <p className="body-lg-medium text-gray-500">데이터를 불러오는 중...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="flex h-[60vh] items-center justify-center">
            <p className="body-lg-medium text-gray-500">해당 월의 큐픽 데이터가 없어요</p>
          </div>
        ) : (
          records.map((record, index) => (
            <CheckTableRow
              key={index}
              record={record}
              isEven={index % 2 === 0}
              gridTemplate={gridTemplate}
              onToast={handleToast}
            />
          ))
        )}
      </div>

      {toastMessage && <TopToast message={toastMessage} key={toastMessage} />}
    </div>
  )
}
