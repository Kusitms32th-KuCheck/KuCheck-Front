'use client'

import { useMemo, useState, useEffect } from 'react'
import { useSessionEdit } from './session-table/SessionEditContext'
import SessionTable from './session-table/SessionTable'

type Row = { weekLabel: string; date: string; name: string; type: string; filled?: boolean; isEditing?: boolean }

type Props = {
  weeks?: number | null
  firstDate?: string
}

function formatMMDD(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}/${dd}`
}

const MOCK_DATA: Row[] = [
  { weekLabel: '1주차', date: '08/09', name: 'OT', type: '네트워킹', isEditing: true },
  { weekLabel: '2주차', date: '08/16', name: 'OT', type: '기업프로젝트', isEditing: false },
  { weekLabel: '3주차', date: '08/23', name: 'UT', type: '기업프로젝트', isEditing: true },
  { weekLabel: '4주차', date: '08/30', name: 'OT', type: '기업프로젝트', isEditing: false },
  { weekLabel: '5주차', date: '09/06', name: '집중 워크숍 세션', type: '기업프로젝트', isEditing: true },
  { weekLabel: '6주차', date: '09/13', name: 'OT', type: '네트워킹', isEditing: false },
  { weekLabel: '7주차', date: '09/20', name: 'MT', type: '네트워킹', isEditing: true },
  { weekLabel: '8주차', date: '09/27', name: 'OT', type: '기업프로젝트', isEditing: false },
  { weekLabel: '9주차', date: '10/04', name: '주식 휴회', type: '휴회', isEditing: true },
  { weekLabel: '10주차', date: '10/11', name: 'OT', type: '네트워킹', isEditing: false },
  { weekLabel: '11주차', date: '10/18', name: '발학', type: '휴회', isEditing: true },
]

export default function SessionEditTable({ weeks, firstDate }: Props) {
  const { isEditing } = useSessionEdit()
  const [rows, setRows] = useState<Row[]>([])

  const generated = useMemo(() => {
    if (!firstDate || weeks == null || weeks <= 0) return MOCK_DATA // ✅ 목데이터로 대체
    const d0 = new Date(firstDate)
    return Array.from({ length: weeks }, (_, i) => {
      const d = new Date(d0)
      d.setDate(d0.getDate() + i * 7)
      return { weekLabel: `${i + 1}주차`, date: formatMMDD(d), name: '', type: '선택' }
    })
  }, [weeks, firstDate])

  useEffect(() => setRows(generated), [generated])

  return (
    <div className="flex pt-[30px]">
      <SessionTable
        rows={rows}
        mode={isEditing ? 'edit' : 'view'}
        isRowFilled={(idx, row) => (typeof row.filled === 'boolean' ? row.filled : row.name.trim().length > 0)}
        showViewButton
        onNameChange={(i, v) => setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, name: v } : r)))}
        onTypeChange={(i, v) => setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, type: v } : r)))}
        onViewClick={(i) => console.log(`${i + 1}주차 보기 클릭`)}
      />
    </div>
  )
}
