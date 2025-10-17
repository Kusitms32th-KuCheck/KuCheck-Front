'use client'

import { useRef, useState, useEffect } from 'react'
import { usePointTableStore } from '@/store/manager/usePointTableStore'
import { generateMockData } from '@/types/manager/point/mockData'
import PointTableHeader from './PointTableHeader'
import PointTableBody from './PointTableBody'
import { computeVisibleDates, computeGridTemplate, computeMinWidth } from '../../../utils/manager/computePointTable'

export default function PointTable() {
  const { collapsedMonths, toggleCollapsedMonth } = usePointTableStore()
  const setMembers = usePointTableStore((s) => s.setMembers)
  const [isScrolled, setIsScrolled] = useState(false)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const headerScrollRef = useRef<HTMLDivElement | null>(null)

  const visibleDates = computeVisibleDates(collapsedMonths)
  const gridTemplate = computeGridTemplate(visibleDates)
  const contentMinWidth = computeMinWidth(gridTemplate)

  const toggleMonth = (month: string) => toggleCollapsedMonth(month)

  useEffect(() => {
    setMembers(() => generateMockData())

    const container = containerRef.current
    const header = headerScrollRef.current
    if (!container || !header) return

    const onContainerScroll = () => {
      if (header.scrollLeft !== container.scrollLeft) header.scrollLeft = container.scrollLeft
      setIsScrolled(container.scrollTop > 0)
    }

    const onHeaderScroll = () => {
      if (container.scrollLeft !== header.scrollLeft) container.scrollLeft = header.scrollLeft
    }

    container.addEventListener('scroll', onContainerScroll)
    header.addEventListener('scroll', onHeaderScroll)

    onContainerScroll()
    return () => {
      container.removeEventListener('scroll', onContainerScroll)
      header.removeEventListener('scroll', onHeaderScroll)
    }
  }, [])

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
