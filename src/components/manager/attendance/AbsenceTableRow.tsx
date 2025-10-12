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

const ATTENDANCE_SCORE_OPTIONS = [
  { label: '결석(인정)', value: 'absence-approved', displayValue: '0' },
  { label: '결석(사유 -1)', value: 'absence-reason', displayValue: '-1' },
  { label: '결석(무단 -2)', value: 'absence-unauthorized', displayValue: '-2' },
  { label: '결석(미제출 -3)', value: 'absence-no-document', displayValue: '-3' },
  { label: '지각(-1)', value: 'late', displayValue: '-1' },
  { label: '조퇴(-1)', value: 'early-leave', displayValue: '-1' },
]

export default function AbsenceTableRow({ record, isEven }: AbsenceTableRowProps) {
  const [selectedScore, setSelectedScore] = useState('')

  const cellData = [record.name, record.part, record.sessionDate, record.attendanceStatus, record.time, record.reason]

  return (
    <div
      className={`body-lg-regular grid items-center gap-[50px] border-b border-gray-100 px-6 py-[22px] ${
        isEven ? 'bg-white' : 'bg-background1'
      }`}
      style={{ gridTemplateColumns: gridTemplate }}
    >
      {cellData.map((data, index) => (
        <p key={index}>{data}</p>
      ))}

      <p>
        <a href="#" className="hover:underline">
          {record.documentStatus}
        </a>
      </p>

      <div>
        <Dropdown
          options={ATTENDANCE_SCORE_OPTIONS}
          selected={selectedScore}
          onChange={setSelectedScore}
          rightIcon={<DownIcon width={24} height={24} />}
          rightIconActive={<UpIcon width={24} height={24} />}
          showValueInsteadOfLabel={true}
        />
      </div>
    </div>
  )
}

export type { AbsenceRecord }
