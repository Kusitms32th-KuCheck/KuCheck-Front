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
            { label: '결석(인정)', value: '결석(인정)' },
            { label: '결석(사유 -1)', value: '결석(사유 -1)' },
            { label: '결석(무단 -2)', value: '결석(무단 -2)' },
            { label: '결석(미제출 -3)', value: '결석(미제출 -3)' },
            { label: '지각(-1)', value: '지각(-1)' },
            { label: '조퇴(-1)', value: '조퇴(-1)' },
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
