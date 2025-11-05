export interface SessionScheduleParams {
  week: number
  sessionDate: string
  title: string
  category: string
  isHoliday: boolean
}

export type SessionScheduleRequest = SessionScheduleParams[]
