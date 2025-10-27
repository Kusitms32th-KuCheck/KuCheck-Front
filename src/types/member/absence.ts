export interface AbsenceDataType {
  absenceReportId?: number
  sessionId?: number
  absenceType?: AbsenceType
  reason?: string
  fileName?: string
  lateDateTime?: string
  leaveDateTime?: string
}

export type AbsenceType = 'ABSENT' | 'LATE' | 'EARLY_LEAVE'
