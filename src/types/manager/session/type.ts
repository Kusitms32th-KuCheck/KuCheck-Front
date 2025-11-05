//세션 일정 저장
export interface SessionScheduleParams {
  week: number
  sessionDate: string
  title: string
  category: string
  isHoliday: boolean
}

export type SessionScheduleRequest = SessionScheduleParams[]

//세션 정보 가져오기
export interface SessionScheduleData {
  sessionId: number
  startDate: string
  title: string
  category: string
  sessionDetailId: number | null
}

export type SessionScheduleResponse = SessionScheduleData[]
