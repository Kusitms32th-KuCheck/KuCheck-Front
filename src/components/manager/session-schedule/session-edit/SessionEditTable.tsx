'use client'

import { useMemo, useState, useEffect } from 'react'
import { useSessionEdit } from '../session-table/SessionEditContext'
import SessionTable from '../session-table/SessionTable'
import { getClientSessionSchedule } from '@/lib/manager/client/session'
import type { SessionScheduleResponse } from '@/types/manager/session/type'

type Row = {
  weekLabel: string
  date: string
  name: string
  type: string
  filled?: boolean
  isEditing?: boolean
  sessionDetailId?: number | null
}

type Props = {
  weeks?: number | null
  firstDate?: string
}

function formatMMDD(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}/${dd}`
}

function mapCategoryToLabel(category: string) {
  if (!category) return category
  switch (category) {
    case 'CORPORATE_PROJECT':
      return '기업프로젝트'
    case 'NETWORKING':
      return '네트워킹'
    default:
      return category
  }
}

export default function SessionEditTable({ weeks, firstDate }: Props) {
  const { isEditing } = useSessionEdit()
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

  useEffect(() => {
    let cancelled = false

    const fetchSessions = async () => {
      const res = await getClientSessionSchedule()
      console.log('getClientSessionSchedule response:', res)
      if (res.success && Array.isArray(res.data)) {
        console.log('First item structure:', res.data[0])
      }
      if (cancelled) return
      if (res.success && Array.isArray(res.data)) {
        const data = res.data as SessionScheduleResponse
        const mapped: Row[] = data.map((s, idx) => {
          const d = new Date(s.startDate)
          return {
            weekLabel: `${idx + 1}주차`,
            date: formatMMDD(d),
            name: s.title || '',
            type: mapCategoryToLabel(s.category),
            isEditing: true,
            sessionId: s.sessionId,
            sessionDetailId: s.sessionDetailId ?? null,
          }
        })
        setRows(mapped)
      } else {
        setRows([])
      }
    }

    if (!firstDate || weeks == null || weeks <= 0) {
      fetchSessions()
    } else {
      setRows(generated)
    }

    return () => {
      cancelled = true
    }
  }, [firstDate, weeks, generated])

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
