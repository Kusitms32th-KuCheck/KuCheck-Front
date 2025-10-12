'use client'
import { useState } from 'react'
import { gridTemplate } from './AbsenceTableHeader'
import Dropdown from '../common/ManagerdropDown'
import { UpIcon, DownIcon } from '@/assets/svgComponents/manager'

interface AbsenceRecord {
  name: string
  part: string
  sessionDate: string
  attendanceStatus: string
  time: string
  reason: string
  documentStatus: string
}

interface AbsenceTableRowProps {
  record: AbsenceRecord
  isEven: boolean
}

export default function AbsenceTableRow({ record, isEven }: AbsenceTableRowProps) {
  const [selectedScore, setSelectedScore] = useState('')

  return (
    <div
      className={`body-lg-regular grid items-center gap-[50px] border-b border-gray-100 px-6 py-[22px] ${
        isEven ? 'bg-white' : 'bg-background1'
      }`}
      style={{ gridTemplateColumns: gridTemplate }}
    >
      <p className="m-0 p-0">{record.name}</p>
      <p className="m-0 p-0">{record.part}</p>
      <p className="m-0 p-0">{record.sessionDate}</p>
      <p className="m-0 p-0">{record.attendanceStatus}</p>
      <p className="m-0 p-0">{record.time}</p>
      <p className="m-0 p-0">{record.reason}</p>
      <p className="m-0 p-0">
        <a href="#" className="hover:underline">
          {record.documentStatus}
        </a>
      </p>
      <div className="flex items-center">
        <Dropdown
          size="md"
          options={[
            { label: '-3', value: '-3' },
            { label: '-2', value: '-2' },
            { label: '-1', value: '-1' },
            { label: '0', value: '0' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
          ]}
          selected={selectedScore}
          onChange={setSelectedScore}
          placeholder="선택"
          rightIcon={<DownIcon width={24} height={24} />}
          rightIconActive={<UpIcon width={24} height={24} />}
        />
      </div>
    </div>
  )
}

export type { AbsenceRecord }
