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

export interface SessionDataType {
  sessionId: number
  sessionCategory: SessionCategoryType
  title: string
  startDate: string
}

export interface SessionDetailType {
  sessionId: number
  sessionDetailId: number
  title: string
  place: string
  startDate: string
  startTime: string
  endTime: string
  content: string
  images: string[]
  isHoliday: boolean
  createdAt: string
  updatedAt: string
}

export type SessionCategoryType = 'CORPORATE_PROJECT' | 'MEETUP_PROJECT' | 'NETWORKING' | 'HOLIDAY' | 'REST'
