import React from 'react'
import AbsenceTableHeader from './AbsenceTableHeader'
import AbsenceTableRow, { type AbsenceRecord } from './AbsenceTableRow'

interface AbsenceTableProps {
  records: AbsenceRecord[]
  totalCount: number
}

export default function AbsenceTable({ records, totalCount }: AbsenceTableProps) {
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
          <select className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none">
            <option>09/20</option>
            <option>08/16</option>
            <option>08/23</option>
            <option>08/30</option>
          </select>
        </div>

        <AbsenceTableHeader />
      </div>

      {/* 테이블 바디 */}
      <div>
        {records.map((record, index) => (
          <AbsenceTableRow key={index} record={record} isEven={index % 2 === 0} />
        ))}
      </div>
    </div>
  )
}
