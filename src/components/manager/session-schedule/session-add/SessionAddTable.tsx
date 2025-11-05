'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import { useSessionEdit } from '../session-table/SessionEditContext'
import SessionTable from '../session-table/SessionTable'
import { SessionScheduleRequest } from '@/types/manager/session/type'
import { postClientSessionSchedule } from '@/lib/manager/client/session'

type Row = { weekLabel: string; date: string; name: string; type: string; isHoliday?: boolean }

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
      return { weekLabel: `${i + 1}주차`, date: formatMMDD(d), name: '', type: '선택', isHoliday: false }
    })
  }, [weeks, firstDate])

  useEffect(() => setRows(generated), [generated])

  const formatYYYYMMDD = (d: Date) => {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const handleSave = useCallback(async () => {
    if (!firstDate) return false
    const d0 = new Date(firstDate)
    const mapCategory = (label: string) => {
      if (label === '기업프로젝트') return 'CORPORATE_PROJECT'
      if (label === '네트워킹') return 'NETWORKING'
      if (label === '스터디') return 'STUDY'
      if (label === '선택') return 'NONE'
      return label
    }

    const allowedCategories = new Set(['CORPORATE_PROJECT', 'NETWORKING', 'STUDY', 'NONE'])

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i]
      if (!r.name || r.name.trim() === '') {
        return false
      }
      const mapped = mapCategory(r.type)
      if (!allowedCategories.has(mapped)) {
        return false
      }
    }

    const payload: SessionScheduleRequest = rows.map((r, i) => {
      const d = new Date(d0)
      d.setDate(d0.getDate() + i * 7)
      return {
        week: i + 1,
        sessionDate: formatYYYYMMDD(d),
        title: r.name,
        category: mapCategory(r.type),
        isHoliday: Boolean(r.isHoliday),
      }
    })

    try {
      const res = await postClientSessionSchedule(payload)
      if (res.success) {
        return true
      } else {
        return false
      }
    } catch {
      return false
    }
    return false
  }, [firstDate, rows])

  const { registerSaveHandler } = useSessionEdit()

  useEffect(() => {
    const unregister = registerSaveHandler(handleSave)
    return unregister
  }, [handleSave, registerSaveHandler])

  return (
    <div className="flex flex-col gap-4">
      <SessionTable
        rows={rows}
        mode="edit"
        showViewButton={false}
        onNameChange={(i, v) => setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, name: v } : r)))}
        onTypeChange={(i, v) => setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, type: v } : r)))}
        onHolidayChange={(i, v) => setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, isHoliday: v } : r)))}
      />
    </div>
  )
}
