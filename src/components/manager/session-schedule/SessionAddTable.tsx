'use client'

import { useMemo, useState, useEffect } from 'react'
import SessionTable from './session-table/SessionTable'

type Row = { weekLabel: string; date: string; name: string; type: string }

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
    return Array.from({ length: weeks }, (_, i) => {
      const d = new Date(d0)
      d.setDate(d0.getDate() + i * 7)
      return { weekLabel: `${i + 1}주차`, date: formatMMDD(d), name: '', type: '선택' }
    })
  }, [weeks, firstDate])

  useEffect(() => setRows(generated), [generated])

  return (
    <SessionTable
      rows={rows}
      mode="edit"
      showViewButton={false}
      onNameChange={(i, v) => setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, name: v } : r)))}
      onTypeChange={(i, v) => setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, type: v } : r)))}
    />
  )
}
