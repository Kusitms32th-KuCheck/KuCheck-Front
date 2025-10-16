'use client'
import { useState, useRef, useEffect } from 'react'
import { PointMemberStatus, VisibleDate } from '@/types/manager/point/types'
import { monthGroups } from '@/types/manager/point/constants'
import { generateMockData } from '@/types/manager/point/mockData'
import PointTableHeader from './PointTableHeader'
import PointTableRow from './PointTableRow'

export default function PointStatusTable() {
  const [members] = useState<PointMemberStatus[]>(generateMockData())
  const [isEditMode, setIsEditMode] = useState(false)
  const [collapsedMonths, setCollapsedMonths] = useState<Set<string>>(new Set())
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const headerScrollRef = useRef<HTMLDivElement>(null)

  const toggleMonth = (month: string) => {
    const newCollapsed = new Set(collapsedMonths)
    if (newCollapsed.has(month)) {
      newCollapsed.delete(month)
    } else {
      newCollapsed.add(month)
    }
    setCollapsedMonths(newCollapsed)
  }

  const handleSessionChange = (memberIndex: number, date: string, value: string) => {
    if (!isEditMode) return
    console.log('수정:', memberIndex, date, value)
  }

  const handleSave = () => {
    setIsEditMode(false)
    console.log('저장:', members)
  }

  useEffect(() => {
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

  const visibleDates: VisibleDate[] = []
  Object.entries(monthGroups).forEach(([month, dates]) => {
    const isCollapsed = collapsedMonths.has(month)
    visibleDates.push({ month, date: dates[0] })
    if (!isCollapsed) {
      dates.slice(1).forEach((date) => {
        visibleDates.push({ date })
      })
    }
  })

  const baseColumns = '146px 100px 140px'
  const dateColumns = visibleDates
    .map((vd) => {
      if (vd.month === '8월' || vd.month === '9월' || vd.month === '10월' || vd.month === '11월') return '150px' // narrower month header
      return '180px'
    })
    .join(' ')
  const statsColumns = '180px 180px 180px 100px 100px 100px 140px 190px 190px 340px'
  const gridTemplate = `${baseColumns} ${dateColumns} ${statsColumns}`

  const computeMinWidth = (template: string) => {
    return (
      template
        .split(/\s+/)
        .map((tok) => {
          const m = tok.match(/(\d+)px$/)
          return m ? parseInt(m[1], 10) : 0
        })
        .reduce((a, b) => a + b, 0) + 'px'
    )
  }

  const contentMinWidth = computeMinWidth(gridTemplate)

  return (
    <div className="flex h-full flex-col">
      <div
        className={`mx-[38px] mt-[29px] flex rounded-t-[12px] bg-white ${
          isScrolled ? 'z-20 shadow-[0_6px_20px_rgba(0,0,0,0.13)]' : ''
        }`}
      >
        <div ref={headerScrollRef} className="scrollbar-hide overflow-x-auto">
          <div style={{ minWidth: contentMinWidth }}>
            <PointTableHeader
              visibleDates={visibleDates}
              collapsedMonths={collapsedMonths}
              onToggleMonth={toggleMonth}
              gridTemplate={gridTemplate}
              isScrolled={isScrolled}
            />
          </div>
        </div>
      </div>

      <div className="mx-[38px] mb-6 min-h-0 flex-1">
        <div ref={containerRef} className="h-full overflow-auto rounded-b-[12px] bg-white">
          <div style={{ minWidth: contentMinWidth }}>
            {members.map((member, memberIndex) => (
              <PointTableRow
                key={memberIndex}
                member={member}
                memberIndex={memberIndex}
                visibleDates={visibleDates}
                isEditMode={isEditMode}
                onSessionChange={handleSessionChange}
                gridTemplate={gridTemplate}
                collapsedMonths={collapsedMonths}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
