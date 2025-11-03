'use client'

import { useMemo, useState, useEffect } from 'react'

type Row = {
  weekLabel: string
  date: string
  name: string
  type: string
}

type Props = {
  weeks: number | null
  firstDate?: string
}

function formatMMDD(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}/${dd}`
}

export default function SessionAddTable({ weeks, firstDate }: Props) {
  const [rows, setRows] = useState<Row[]>([])

  const generated = useMemo(() => {
    if (!firstDate || weeks == null || weeks <= 0) return []
    const d0 = new Date(firstDate)
    const arr: Row[] = []
    for (let i = 0; i < weeks; i++) {
      const d = new Date(d0)
      d.setDate(d0.getDate() + i * 7)
      arr.push({ weekLabel: `${i + 1}주차`, date: formatMMDD(d), name: '', type: '선택' })
    }
    return arr
  }, [weeks, firstDate])

  useEffect(() => {
    setRows(generated)
  }, [generated])

  const handleNameChange = (idx: number, v: string) => {
    setRows((s) => {
      const copy = [...s]
      copy[idx] = { ...copy[idx], name: v }
      return copy
    })
  }

  const handleTypeChange = (idx: number, v: string) => {
    setRows((s) => {
      const copy = [...s]
      copy[idx] = { ...copy[idx], type: v }
      return copy
    })
  }

  return (
    <div className="shadow-middlemodal flex h-full w-[797px] min-w-[690px] flex-col rounded-[12px] bg-white">
      <div className="body-lg-semibold grid grid-cols-[147px_145px_312px_193px] border-b border-gray-200 text-gray-500">
        <p>주차</p>
        <p className="">세션 일자</p>
        <p className="">세션 이름</p>
        <p className="">세션 종류</p>
      </div>

      <div className="flex-1 overflow-auto">
        {(rows.length ? rows : generated).map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-[160px_100px_1fr_140px] items-center gap-0 border-b border-gray-100 px-4 py-2 text-sm md:grid-cols-[200px_120px_1fr_180px] md:px-6 md:py-3"
          >
            <div className="text-gray-700">{r.weekLabel}</div>
            <div className="text-end text-gray-700">{r.date}</div>
            <div>
              <input
                value={r.name}
                onChange={(e) => handleNameChange(i, e.target.value)}
                className="w-full rounded-sm border border-gray-200 px-2 py-1 text-sm md:px-3 md:py-2"
              />
            </div>
            <div className="text-end">
              <select
                value={r.type}
                onChange={(e) => handleTypeChange(i, e.target.value)}
                className="rounded-sm border border-gray-200 px-2 py-1 text-sm md:px-3 md:py-2"
              >
                <option>선택</option>
                <option>네트워킹</option>
                <option>기업프로젝트</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
