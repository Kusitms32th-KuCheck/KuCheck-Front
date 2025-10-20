'use client'

import { useEffect, useState } from 'react'
import CheckTableHeader from './CheckTableHeader'
import CheckTableRow from './CheckTableRow'
import Dropdown from '../common/ManagerdropDown'
import { CalendarIcon, CalendarOnIcon, UpIcon, DownIcon } from '@/assets/svgComponents/manager'
import type { CheckDocumentRecord } from '@/types/manager/check-document/types'

interface CheckTableProps {
  records: CheckDocumentRecord[]
  totalCount: number
}

export default function CheckTable({ records, totalCount }: CheckTableProps) {
  const [selectedMonth, setSelectedMonth] = useState('12월')
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const gridTemplate =
    'minmax(100px,140px) minmax(120px,641px) minmax(100px,202px) minmax(120px,227px) minmax(120px,227px) minmax(120px,1fr)'

  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector('main')
      if (!mainContent) return

      const currentScroll = (mainContent as HTMLElement).scrollTop
      setShowStickyHeader(currentScroll > 0 && currentScroll < 160)
    }

    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll)
      return () => mainContent.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const HeaderContent = () => (
    <>
      <div className="flex items-center gap-2">
        <p className="heading-md-semibold m-0 p-0">{selectedMonth} 큐픽</p>
        <p className="body-lg-semibold m-0 flex h-6 w-[30px] items-center justify-center rounded-full bg-black p-0 text-white">
          {totalCount}
        </p>
      </div>
    </>
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
          options={[
            { label: '12월', value: '12월' },
            { label: '11월', value: '11월' },
            { label: '10월', value: '10월' },
            { label: '9월', value: '9월' },
            { label: '8월', value: '8월' },
          ]}
          selected={selectedMonth}
          onChange={setSelectedMonth}
          leftIcon={<CalendarIcon width={24} height={24} />}
          leftIconActive={<CalendarOnIcon width={24} height={24} />}
          rightIcon={<DownIcon width={24} height={24} />}
          rightIconActive={<UpIcon width={24} height={24} />}
        />
      </div>

      <div className="overflow-x-auto">
        <CheckTableHeader gridTemplate={gridTemplate} />
        {records.map((record, index) => (
          <CheckTableRow key={index} record={record} isEven={index % 2 === 0} gridTemplate={gridTemplate} />
        ))}
      </div>
    </div>
  )
}
