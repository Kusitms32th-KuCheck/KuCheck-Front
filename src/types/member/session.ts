export interface AbsenceSessionDataType {
  sessionId: number
  title: string
  week: number
  active: boolean
  startDate: string
}

export interface ThisWeekSessionDataType {
  sessionId: number
  sessionDetailId: number
  title: string
  place: string
  startDate: string
  startTime: string
  endTime: string
}
