'use client'

import { useMemo, useState, useEffect } from 'react'
import SessionTable from './session-table/SessionTable'

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

const MOCK_DATA: Row[] = [
  { weekLabel: '1주차', date: '08/09', name: 'OT', type: '네트워킹' },
  { weekLabel: '2주차', date: '08/16', name: '집중 워크숍 세션', type: '기업프로젝트' },
  { weekLabel: '3주차', date: '08/23', name: 'UT', type: '기업프로젝트' },
  { weekLabel: '4주차', date: '08/30', name: '파트랜 상호 피드백', type: '기업프로젝트' },
  { weekLabel: '5주차', date: '09/06', name: '집중 워크숍 세션', type: '기업프로젝트' },
  { weekLabel: '6주차', date: '09/13', name: '컨솔팅 초청 강연회', type: '네트워킹' },
  { weekLabel: '7주차', date: '09/20', name: 'MT', type: '네트워킹' },
  { weekLabel: '8주차', date: '09/27', name: '아이디어 발제', type: '기업프로젝트' },
  { weekLabel: '9주차', date: '10/04', name: '주식 휴회', type: '휴회' },
  { weekLabel: '10주차', date: '10/11', name: '클로징데이', type: '네트워킹' },
  { weekLabel: '11주차', date: '10/18', name: '발학', type: '휴회' },
]

export default function SessionEditTable({ weeks, firstDate }: Props) {
  const [rows, setRows] = useState<Row[]>([])

  const generated = useMemo(() => {
    if (!firstDate || weeks == null || weeks <= 0) return MOCK_DATA
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
    <SessionTable
      rows={rows.length ? rows : generated}
      gridCols="grid-cols-[147px_145px_312px_193px_150px]"
      customClass="min-w-[650px] max-w-[797px]"
      onNameChange={handleNameChange}
      onTypeChange={handleTypeChange}
    />
  )
}
