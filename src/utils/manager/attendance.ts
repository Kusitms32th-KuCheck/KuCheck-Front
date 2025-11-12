import { SessionScheduleData } from '@/types/manager/session/type'
import {
  AbsenceReportItem,
  AbsenceSubmitType,
  PartType,
  TransformedAbsenceReportItem,
} from '@/types/manager/attendance/type'

/**
 * URL에서 파일 확장자를 추출하는 함수
 */
const getFileExtension = (url: string): string => {
  if (!url) return 'pdf' // 기본값

  try {
    // URL에서 파일명 부분 추출
    const urlPath = new URL(url).pathname
    const fileName = urlPath.split('/').pop() || ''
    const extension = fileName.split('.').pop()?.toLowerCase()

    // 일반적인 문서 확장자들만 허용, 그 외는 기본값 반환
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'doc', 'docx', 'hwp', 'txt']
    return extension && allowedExtensions.includes(extension) ? extension : 'pdf'
  } catch {
    // URL 파싱 실패 시 기본값 반환
    return 'pdf'
  }
}

/**
 * AbsenceReportItem을 AbsenceTable에서 사용하는 형태로 변환하는 함수
 */
export const transformAbsenceReportItem = (item: AbsenceReportItem): TransformedAbsenceReportItem => {
  const getAttendanceStatus = (submitType: AbsenceSubmitType): string => {
    switch (submitType) {
      case 'ABSENT':
        return '불참'
      case 'LATE':
        return '지각'
      case 'EARLY_LEAVE':
        return '조퇴'
      default:
        return '불참'
    }
  }

  const getPartName = (part: PartType): string => {
    switch (part) {
      case 'FRONTEND':
        return '프론트엔드'
      case 'BACKEND':
        return '백엔드'
      case 'DESIGN':
        return '디자인'
      case 'PLANNING':
        return '기획'
      default:
        return part
    }
  }

  const fileExtension = getFileExtension(item.url)

  return {
    ...item, // 기존 AbsenceReportItem의 모든 필드 유지
    part: getPartName(item.part), // 한국어로 변환된 파트명으로 덮어쓰기
    submitDate: formatDateToMD(item.submitDate), // 포맷된 날짜로 덮어쓰기
    submitType: getAttendanceStatus(item.submitType), // 한국어로 변환된 상태로 덮어쓰기
    time: item.time || '-', // null일 경우 '-'로 표시
    // 추가 필드들 (UI에서 사용)
    sessionDate: formatDateToMD(item.submitDate),
    attendanceStatus: getAttendanceStatus(item.submitType),
    documentStatus: `${item.name}_증빙.${fileExtension}`,
  }
}

/**
 * 현재 날짜를 기준으로 가장 가까운 진행 중이거나 시작하지 않은 세션을 찾는 함수
 */
export const findUpcomingOrCurrentSession = (sessions: SessionScheduleData[]): SessionScheduleData | null => {
  if (!sessions || sessions.length === 0) {
    return null
  }

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // 오늘 날짜의 00:00:00

  // 세션을 날짜순으로 정렬
  const sortedSessions = sessions.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })

  // 오늘 이후의 세션 중 가장 가까운 것을 찾기
  const futureSession = sortedSessions.find((session) => {
    const sessionDate = new Date(session.startDate)
    const sessionDateOnly = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate())
    return sessionDateOnly >= today
  })

  // 만약 오늘 이후의 세션이 없다면, 가장 최근의 세션을 반환
  if (!futureSession) {
    return sortedSessions[sortedSessions.length - 1] || null
  }

  return futureSession
}

/**
 * 날짜를 'M/DD' 형식으로 포맷팅하는 함수
 */
export const formatDateToMD = (dateString: string): string => {
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day.toString().padStart(2, '0')}`
}

/**
 * 시간을 'HH:MM' 형식으로 포맷팅하는 함수 (초 제거)
 */
export const formatTimeToHM = (timeString: string): string => {
  return timeString.split(':').slice(0, 2).join(':')
}

/**
 * 세션 데이터로부터 드롭다운 옵션을 생성하는 함수
 */
export const generateDateOptionsFromSessions = (
  sessions: SessionScheduleData[]
): Array<{ label: string; value: string; sessionId: number }> => {
  if (!sessions || sessions.length === 0) {
    return [
      { label: '09/20', value: '09/20', sessionId: 0 },
      { label: '08/16', value: '08/16', sessionId: 0 },
      { label: '08/23', value: '08/23', sessionId: 0 },
      { label: '08/30', value: '08/30', sessionId: 0 },
    ]
  }

  // 세션을 날짜순으로 정렬
  const sortedSessions = sessions.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })

  // 날짜별로 첫 번째 세션만 선택하여 옵션 생성
  const uniqueDates = new Map<string, SessionScheduleData>()

  sortedSessions.forEach((session) => {
    const formattedDate = formatDateToMD(session.startDate)
    if (!uniqueDates.has(formattedDate)) {
      uniqueDates.set(formattedDate, session)
    }
  })

  const options: Array<{ label: string; value: string; sessionId: number }> = []
  uniqueDates.forEach((session, date) => {
    options.push({
      label: date,
      value: date,
      sessionId: session.sessionId,
    })
  })

  return options.length > 0
    ? options
    : [
        { label: '09/20', value: '09/20', sessionId: 0 },
        { label: '08/16', value: '08/16', sessionId: 0 },
        { label: '08/23', value: '08/23', sessionId: 0 },
        { label: '08/30', value: '08/30', sessionId: 0 },
      ]
}

/**
 * 가장 가까운 세션의 날짜를 반환하는 함수
 */
export const getDefaultSelectedDate = (sessions: SessionScheduleData[]): string => {
  const upcomingSession = findUpcomingOrCurrentSession(sessions)
  if (upcomingSession) {
    return formatDateToMD(upcomingSession.startDate)
  }
  return '선택' // 폴백값
}
