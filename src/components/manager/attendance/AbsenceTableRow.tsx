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
      <p>{record.name}</p>
      <p>{record.part}</p>
      <p>{record.sessionDate}</p>
      <p>{record.attendanceStatus}</p>
      <p>{record.time}</p>
      <p>{record.reason}</p>
      <p>
        <a href="#" className="hover:underline">
          {record.documentStatus}
        </a>
      </p>
      <div className="">
        <Dropdown
          options={[
            { label: '결석(인정)', value: '0' },
            { label: '결석(사유 -1)', value: '-1' },
            { label: '결석(무단 -2)', value: '-2' },
            { label: '결석(미제출 -3)', value: '-3' },
            { label: '지각(-1)', value: '-1' },
            { label: '조퇴(-1)', value: '-1' },
          ]}
          selected={selectedScore}
          onChange={setSelectedScore}
          rightIcon={<DownIcon width={24} height={24} />}
          rightIconActive={<UpIcon width={24} height={24} />}
        />
      </div>
    </div>
  )
}

export type { AbsenceRecord }
