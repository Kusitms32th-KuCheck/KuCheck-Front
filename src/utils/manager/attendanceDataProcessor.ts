import { AttendanceStatus, attendanceStatusDisplayMap, MonthlyAttendanceResult } from '@/types/manager/point/types'

/**
 * 출석 기록 조회 결과
 */
export interface AttendanceRecordResult {
  value: string
  displayClass: string
  isRecordExists: boolean
}

/**
 * 특정 날짜의 회원 출석 기록을 조회
 */
export function getMemberAttendanceData(
  date: string,
  member: { memberId: number; name: string },
  monthlyData: Record<number, MonthlyAttendanceResult>
): AttendanceRecordResult {
  // date 형식: "11/13", "11/14" 등에서 월과 일 추출
  const [monthStr, dayStr] = date.split('/')
  const month = parseInt(monthStr)
  const day = parseInt(dayStr)

  const monthData = monthlyData[month]
  if (!monthData?.members?.data) {
    return {
      value: '미기록',
      displayClass: 'text-gray-400',
      isRecordExists: false,
    }
  }

  // 해당 회원 찾기
  const memberData = monthData.members.data.find((m) => m.memberId === member.memberId)
  if (!memberData) {
    return {
      value: '미기록',
      displayClass: 'text-gray-400',
      isRecordExists: false,
    }
  }

  // 해당 날짜의 출결 기록 찾기 - 여러 형식 시도
  const currentYear = new Date().getFullYear()
  const targetDateStr1 = `${currentYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  const targetDateStr2 = `${month}/${day}`
  const targetDateStr3 = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`

  let record = memberData.records.find(
    (r) => r.date === targetDateStr1 || r.date === targetDateStr2 || r.date === targetDateStr3
  )

  // 해당 일자의 모든 기록을 찾아서 가장 최근 기록 또는 포인트가 있는 기록 사용
  const dayRecords = memberData.records.filter((r) => {
    const recordDate = new Date(r.date)
    return recordDate.getMonth() + 1 === month && recordDate.getDate() === day
  })

  if (dayRecords.length > 0) {
    // 포인트가 0이 아닌 기록을 우선하거나, 없으면 마지막 기록
    record = dayRecords.find((r) => r.point !== 0) || dayRecords[dayRecords.length - 1]
  }

  if (!record) {
    return {
      value: '미기록',
      displayClass: 'text-gray-400',
      isRecordExists: false,
    }
  }

  // 출석 상태에 따른 표시 설정
  const status = record.status as AttendanceStatus
  const point = record.point || 0

  if (status in attendanceStatusDisplayMap) {
    const displayFunction = attendanceStatusDisplayMap[status]
    return {
      value: displayFunction(point),
      displayClass: 'text-gray-900',
      isRecordExists: true,
    }
  }

  // 알 수 없는 상태의 경우
  return {
    value: '미기록',
    displayClass: 'text-gray-400',
    isRecordExists: false,
  }
}

/**
 * 월별 출석 점수 계산 (API 데이터 기반)
 */
export function getMonthlyScore(
  month: number,
  member: { memberId: number },
  monthlyData: Record<number, MonthlyAttendanceResult>
): number {
  const monthData = monthlyData[month]
  if (!monthData?.members?.data) return 0

  const memberData = monthData.members.data.find((m) => m.memberId === member.memberId)
  if (!memberData) return 0

  // 해당 월의 모든 출결 기록의 점수 합계
  const totalScore = memberData.records.reduce((sum, record) => {
    return sum + (record.point || 0)
  }, 0)

  return totalScore
}
