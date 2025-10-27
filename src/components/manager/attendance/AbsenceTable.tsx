'use client'
import { useState } from 'react'
import AbsenceTableHeader from './AbsenceTableHeader'
import AbsenceTableRow, { type AbsenceRecord } from './AbsenceTableRow'
import Dropdown from '../common/ManagerdropDown'
import { CalendarIcon, CalendarOnIcon, UpIcon, DownIcon } from '@/assets/svgComponents/manager'

interface AbsenceTableProps {
  records: AbsenceRecord[]
  totalCount: number
}

export default function AbsenceTable({ records, totalCount }: AbsenceTableProps) {
  const [selectedDate, setSelectedDate] = useState('09/20')
  return (
    <div className="flex flex-col rounded-[12px] bg-white py-7">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <p className="heading-md-semibold m-0 p-0">불참 사유서</p>
            <p className="body-lg-semibold m-0 flex h-6 w-[30px] items-center justify-center rounded-full bg-black p-0 text-white">
              {totalCount}
            </p>
          </div>
          <Dropdown
            size="lg"
            options={[
              { label: '09/20', value: '09/20' },
              { label: '08/16', value: '08/16' },
              { label: '08/23', value: '08/23' },
              { label: '08/30', value: '08/30' },
            ]}
            selected={selectedDate}
            onChange={setSelectedDate}
            leftIcon={<CalendarIcon width={24} height={24} />}
            leftIconActive={<CalendarOnIcon width={24} height={24} />}
            rightIcon={<DownIcon width={24} height={24} />}
            rightIconActive={<UpIcon width={24} height={24} />}
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[960px]">
          <AbsenceTableHeader />
          <div>
            {records.map((record, index) => (
              <AbsenceTableRow key={index} record={record} isEven={index % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
