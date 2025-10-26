'use client'

import { useEffect } from 'react'
import { usePointTableStore } from '@/store/manager/usePointTableStore'
import { generateMockData } from '@/types/manager/point/mockData'
import PointTableHeader from './PointTableHeader'
import PointTableBody from './PointTableBody'
import { computeVisibleDates, computeGridTemplate, computeMinWidth } from '../../../utils/manager/computePointTable'
import useScrollSync from '@/utils/manager/useScrollSync'

export default function PointTable() {
  const { collapsedMonths, toggleCollapsedMonth } = usePointTableStore()
  const setMembers = usePointTableStore((s) => s.setMembers)
  const { containerRef, headerScrollRef, isScrolled } = useScrollSync()
  const visibleDates = computeVisibleDates(collapsedMonths)
  const gridTemplate = computeGridTemplate(visibleDates)
  const contentMinWidth = computeMinWidth(gridTemplate)

  const toggleMonth = (month: string) => toggleCollapsedMonth(month)

  useEffect(() => {
    setMembers(() => generateMockData())
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
          contentMinWidth={contentMinWidth}
          headerScrollRef={headerScrollRef}
        />

        <PointTableBody containerRef={containerRef} />
      </div>
    </div>
  )
}
