import { VisibleDate, MonthlyAttendanceResult } from '@/types/manager/point/types'
import { SessionScheduleData } from '@/types/manager/session/type'

/**
 * 월별 출석 데이터를 VisibleDate 형태로 변환
 */
export function convertMonthlyDataToVisibleDates(
  monthlyData: Record<number, MonthlyAttendanceResult>,
  collapsedMonths: Set<string>
): VisibleDate[] {
  const visibleDates: VisibleDate[] = []
  const allMonths = [8, 9, 10, 11, 12]

  allMonths.forEach((monthNum) => {
    const monthInfo = monthlyData[monthNum]
    const monthString = `${monthNum}월`

    if (monthInfo?.sessionDates && monthInfo.sessionDates.length > 0) {
      // 월 헤더 추가
      visibleDates.push({
        month: monthString,
        date: `${monthNum}/1`,
      })

      // 월이 접힌 상태가 아니라면 모든 세션 날짜들 추가
      if (!collapsedMonths.has(monthString)) {
        monthInfo.sessionDates.forEach((sessionDate) => {
          visibleDates.push({
            date: `${monthNum}/${sessionDate}`,
          })
        })
      }
    } else {
      // sessionDates가 없는 경우에도 월 헤더는 표시
      visibleDates.push({
        month: monthString,
        date: `${monthNum}/1`,
      })
    }
  })

  return visibleDates
}

/**
 * 세션 스케줄 데이터를 VisibleDate 형태로 변환
 */
export function convertSessionDataToVisibleDates(
  sessionDates: SessionScheduleData[],
  collapsedMonths: Set<string>
): VisibleDate[] {
  const visibleDates: VisibleDate[] = []

  // 안전성 검사
  if (!sessionDates || !Array.isArray(sessionDates)) {
    console.warn('sessionDates가 undefined이거나 배열이 아닙니다:', sessionDates)
    return []
  }

  // 세션 날짜를 월별로 그룹화
  const monthGroups: Record<number, string[]> = {}

  sessionDates.forEach((session) => {
    const date = new Date(session.startDate)
    const month = date.getMonth() + 1 // 0-based이므로 +1
    const day = date.getDate()

    if (!monthGroups[month]) {
      monthGroups[month] = []
    }
    monthGroups[month].push(`${month}/${day}`)
  })

  // 각 월의 날짜들을 정렬
  Object.keys(monthGroups).forEach((monthKey) => {
    const month = parseInt(monthKey)
    monthGroups[month].sort((a, b) => {
      const dayA = parseInt(a.split('/')[1])
      const dayB = parseInt(b.split('/')[1])
      return dayA - dayB
    })
  })

  // 8월부터 12월까지 순서대로 처리
  const allMonths = [8, 9, 10, 11, 12]

  allMonths.forEach((monthNum) => {
    const monthString = `${monthNum}월`
    const monthDates = monthGroups[monthNum] || []

    if (monthDates.length > 0) {
      // 월 헤더 추가
      visibleDates.push({
        month: monthString,
        date: `${monthNum}/1`,
      })

      // 월이 접힌 상태가 아니라면 모든 세션 날짜들 추가
      if (!collapsedMonths.has(monthString)) {
        monthDates.forEach((date) => {
          visibleDates.push({ date })
        })
      }
    } else {
      // 세션이 없는 월도 헤더는 표시
      visibleDates.push({
        month: monthString,
        date: `${monthNum}/1`,
      })
    }
  })

  return visibleDates
}

/**
 * 세션 데이터와 월별 데이터를 조합하여 최적의 VisibleDate 배열 생성
 * 세션 데이터가 우선, 없으면 월별 데이터로 폴백
 */
export function getOptimalVisibleDates(
  sessions: SessionScheduleData[],
  monthlyData: Record<number, MonthlyAttendanceResult>,
  collapsedMonths: Set<string>
): VisibleDate[] {
  if (sessions && sessions.length > 0) {
    return convertSessionDataToVisibleDates(sessions, collapsedMonths)
  }

  return convertMonthlyDataToVisibleDates(monthlyData, collapsedMonths)
}
