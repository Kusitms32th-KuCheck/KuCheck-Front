'use client'

import { useEffect } from 'react'
import { usePointTableStore } from '@/store/manager/usePointTableStore'
import { getOverviewClient } from '@/lib/manager/client/points'
import PointTableHeader from './PointTableHeader'
import PointTableBody from './PointTableBody'
import { computeVisibleDates, computeGridTemplate, computeMinWidth } from '../../../utils/manager/computePointTable'
import useScrollSync from '@/utils/manager/useScrollSync'

export default function PointTable() {
  const { collapsedMonths, toggleCollapsedMonth } = usePointTableStore()
  const setMembers = usePointTableStore((s) => s.setMembers)
  const { containerRef, headerScrollRef, isScrolled, isHorizScrolled } = useScrollSync()
  const visibleDates = computeVisibleDates(collapsedMonths)
  const gridTemplate = computeGridTemplate(visibleDates)
  const contentMinWidth = computeMinWidth(gridTemplate)

  const toggleMonth = (month: string) => toggleCollapsedMonth(month)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOverviewClient()
      if (res.success && res.data) {
        setMembers(
          res.data?.map((d) => ({
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
            studyPoints: d.studyPoints,
            kuportersPoints: d.kuportersPoints,
            memo: d.memo,
          }))
        )
      }
    }

    fetchData()
  }, [setMembers])

  return (
    <div className="flex-1 overflow-x-visible overflow-y-auto">
      <div className="flex h-full flex-col">
        <PointTableHeader
          visibleDates={visibleDates}
          collapsedMonths={collapsedMonths}
          onToggleMonth={toggleMonth}
          gridTemplate={gridTemplate}
          isScrolled={isScrolled}
          isHorizScrolled={isHorizScrolled}
          contentMinWidth={contentMinWidth}
          headerScrollRef={headerScrollRef}
        />

        <PointTableBody containerRef={containerRef} isHorizScrolled={isHorizScrolled} />
      </div>
    </div>
  )
}
