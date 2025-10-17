import { VisibleDate } from '@/types/manager/point/types'
import { monthGroups } from '@/constants/manager/point'

export function computeVisibleDates(collapsedMonths: Set<string>): VisibleDate[] {
  const visibleDates: VisibleDate[] = []
  Object.entries(monthGroups).forEach(([month, dates]) => {
    const isCollapsed = collapsedMonths.has(month)
    visibleDates.push({ month, date: dates[0] })
    if (!isCollapsed) {
      dates.forEach((date) => visibleDates.push({ date }))
    }
  })
  return visibleDates
}

export function computeGridTemplate(visibleDates: VisibleDate[]) {
  const baseColumns = '146px 100px 140px'
  const dateColumns = visibleDates
    .map((vd) => {
      if (vd.month === '8월' || vd.month === '9월' || vd.month === '10월' || vd.month === '11월' || vd.month === '12월')
        return '150px'
      return '180px'
    })
    .join(' ')
  const statsColumns = '180px 180px 180px 100px 100px 100px 140px 190px 190px 340px'
  return `${baseColumns} ${dateColumns} ${statsColumns}`
}

export function computeMinWidth(template: string) {
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
