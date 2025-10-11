import React from 'react'
import { gridTemplate } from './AbsenceTableHeader'

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
        <div className="relative w-20">
          <select
            className="w-full appearance-none rounded border border-gray-300 bg-white px-3 py-1 pr-8 text-center text-sm focus:border-blue-500 focus:outline-none"
            defaultValue="0"
          >
            <option value="-3">-3</option>
            <option value="-2">-2</option>
            <option value="-1">-1</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export type { AbsenceRecord }
