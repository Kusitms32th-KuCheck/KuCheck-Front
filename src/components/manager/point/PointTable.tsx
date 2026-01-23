'use client'

import { useEffect, useState } from 'react'
import { usePointTableStore } from '@/store/manager/usePointTableStore'
import { getOverviewClient, getMonthlyClient } from '@/lib/manager/client/points'
import { useSessionScheduleStore } from '@/store/manager/useSessionScheduleStore'
import { getClientSessionSchedule } from '@/lib/manager/client/session'
import PointTableHeader from './PointTableHeader'
import PointTableBody from './PointTableBody'
import useScrollSync from '@/utils/manager/useScrollSync'
import { MonthlyAttendanceResult } from '@/types/manager/point/types'
import { getKupickMonths } from '@/utils/manager/kupick'

export default function PointTable() {
  const { collapsedMonths, toggleCollapsedMonth } = usePointTableStore()
  const setMembers = usePointTableStore((s) => s.setMembers)
  const setOriginalMembers = usePointTableStore((s) => s.setOriginalMembers)
  const { getAllSessionDates, setSessions, sessions } = useSessionScheduleStore()
  const { containerRef, headerScrollRef, isScrolled, isHorizScrolled } = useScrollSync()

  // 월별 데이터 상태 추가
  const [monthlyData, setMonthlyData] = useState<Record<number, MonthlyAttendanceResult>>({})
  const pointMonth = getKupickMonths()

  const toggleMonth = (month: string) => toggleCollapsedMonth(month)

  // 세션 데이터 먼저 로드
  useEffect(() => {
    const loadSessionData = async () => {
      if (sessions.length === 0) {
        console.log('포인트 테이블: 세션 데이터 로드 중...')
        const result = await getClientSessionSchedule()
        if (result.success && result.data) {
          setSessions(result.data)
          console.log('포인트 테이블: 세션 데이터 로드 완료:', result.data)
        }
      }
    }

    loadSessionData()
  }, [sessions.length, setSessions])

  // 상벌점 조회 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      const res = await getOverviewClient()
      if (res.success && res.data) {
        const membersData = res.data?.map((d) => ({
          memberId: d.memberId,
          name: d.name,
          part: d.part,
          phoneNumber: d.phoneNumber,
          school: d.school,
          major: d.major,
          isTf: d.isTf,
          isStaff: d.isStaff,
          attendanceMonthlyTotals: d.attendanceMonthlyTotals,
          kupickParticipation: d.kupickParticipation,
          kuportersPoints: d.kuportersPoints,
          memo: d.memo,
        }))

        setMembers(membersData)
        setOriginalMembers(membersData) // 원본 데이터 저장
      }
    }

    fetchData()
  }, [setMembers, setOriginalMembers])

  // 월별 출결 데이터 로드
  useEffect(() => {
    const fetchAllMonthlyData = async () => {
      const allMonthData: Record<number, MonthlyAttendanceResult> = {}
      const sessionDates = getAllSessionDates()

      console.log('포인트 테이블: 스토어에서 가져온 세션 날짜 키:', Object.keys(sessionDates))

      for (const month of pointMonth) {
        const result = await getMonthlyClient(month)
        if (result.success && result.data) {
          allMonthData[month] = {
            ...result.data,
            sessionDates: sessionDates[month] || [],
          }
        }
      }

      setMonthlyData(allMonthData)
    }

    if (pointMonth.length > 0 && sessions.length > 0 && Object.keys(monthlyData).length === 0) {
      fetchAllMonthlyData()
    }
  }, [sessions.length, pointMonth.length])

  return (
    <div className="flex-1 overflow-x-visible overflow-y-auto">
      <div className="flex h-full flex-col">
        <PointTableHeader
          collapsedMonths={collapsedMonths}
          onToggleMonth={toggleMonth}
          isScrolled={isScrolled}
          isHorizScrolled={isHorizScrolled}
          headerScrollRef={headerScrollRef}
          monthlyData={monthlyData}
        />

        <PointTableBody containerRef={containerRef} isHorizScrolled={isHorizScrolled} monthlyData={monthlyData} />
      </div>
    </div>
  )
}
