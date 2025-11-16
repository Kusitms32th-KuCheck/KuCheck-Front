'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import { useSessionEdit } from '../session-table/SessionEditContext'
import SessionTable from '../session-table/SessionTable'
import { getClientSessionSchedule, patchClientSession } from '@/lib/manager/client/session'
import { useSessionScheduleStore } from '@/store/manager/useSessionScheduleStore'
import type { SessionScheduleResponse } from '@/types/manager/session/type'

type Row = {
  weekLabel: string
  date: string
  name: string
  type: string
  filled?: boolean
  isEditing?: boolean
  isHoliday?: boolean
  sessionDetailId?: number | null
  sessionId?: number
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
    case 'MEETUP_PROJECT':
      return '밋업프로젝트'
    case 'REST':
      return '휴회'
    default:
      return category
  }
}

export function mapLabelToCategory(label: string) {
  if (!label) return label
  switch (label) {
    case '기업프로젝트':
      return 'CORPORATE_PROJECT'
    case '네트워킹':
      return 'NETWORKING'
    case '밋업프로젝트':
      return 'MEETUP_PROJECT'
    case '휴회':
      return 'REST'
    case '선택':
      return 'NONE'
    default:
      return label
  }
}

export default function SessionEditTable({ weeks, firstDate }: Props) {
  const { isEditing, registerSaveHandler } = useSessionEdit()
  const { setSessions } = useSessionScheduleStore()
  const [rows, setRows] = useState<Row[]>([])
  const [originalRows, setOriginalRows] = useState<Row[]>([]) // 원본 데이터 저장

  // 행이 변경되었는지 확인하는 함수
  const isRowModified = useCallback((originalRow: Row, currentRow: Row) => {
    return (
      originalRow.name !== currentRow.name ||
      originalRow.type !== currentRow.type ||
      originalRow.isHoliday !== currentRow.isHoliday
    )
  }, [])

  // 저장 핸들러
  const handleSave = useCallback(async () => {
    try {
      console.log('세션 편집 저장 시작:', rows)

      // 수정된 세션들만 필터링하여 저장
      const modifiedRows = rows.filter((row) => {
        if (!row.sessionId || !row.name.trim()) return false

        const originalRow = originalRows.find((orig) => orig.sessionId === row.sessionId)
        if (!originalRow) return false

        return isRowModified(originalRow, row)
      })

      console.log('수정된 세션들:', modifiedRows.length, '개')

      if (modifiedRows.length === 0) {
        console.log('수정된 세션이 없습니다.')
        return true
      }

      const updatePromises = modifiedRows.map(async (row) => {
        // 날짜 변환: MM/DD -> YYYY-MM-DD
        const [month, day] = row.date.split('/')
        const year = new Date().getFullYear() // 현재 연도 사용
        const sessionDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

        const sessionData = {
          week: parseInt(row.weekLabel.replace('주차', '')), // "1주차" -> 1
          sessionDate: sessionDate,
          title: row.name,
          category: mapLabelToCategory(row.type),
          isHoliday: row.isHoliday || false,
        }

        console.log(`세션 ${row.sessionId} 수정 요청:`, sessionData)
        return patchClientSession(row.sessionId!, sessionData)
      })

      const results = await Promise.all(updatePromises)

      // 모든 요청이 성공했는지 확인
      const allSuccess = results.every((result) => result.success)

      if (allSuccess) {
        console.log('모든 세션 수정 완료')
        return true
      } else {
        console.log('일부 세션 수정 실패:', results)
        return false
      }
    } catch (error) {
      console.error('세션 수정 중 오류:', error)
      return false
    }
  }, [rows, originalRows, isRowModified])

  // 저장 핸들러 등록
  useEffect(() => {
    if (isEditing) {
      const unregister = registerSaveHandler(handleSave)
      return unregister
    }
  }, [isEditing, registerSaveHandler, handleSave])

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

        // 스토어에 세션 데이터 저장 (날짜 자동 추출됨)
        setSessions(data)

        const mapped: Row[] = data.map((s, idx) => {
          const d = new Date(s.startDate)
          return {
            weekLabel: `${idx + 1}주차`,
            date: formatMMDD(d),
            name: s.title || '',
            type: mapCategoryToLabel(s.category),
            isEditing: true,
            isHoliday: s.isHoliday || false,
            sessionId: s.sessionId,
            sessionDetailId: s.sessionDetailId ?? null,
          }
        })
        setRows(mapped)
        setOriginalRows([...mapped]) // 원본 데이터 저장
      } else {
        setRows([])
        setOriginalRows([])
      }
    }

    if (!firstDate || weeks == null || weeks <= 0) {
      fetchSessions()
    } else {
      setRows(generated)
      setOriginalRows([...generated]) // 새 데이터의 경우도 원본으로 저장
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
        onHolidayChange={(i, v) => setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, isHoliday: v } : r)))}
        onViewClick={(i) => console.log(`${i + 1}주차 보기 클릭`)}
      />
    </div>
  )
}
