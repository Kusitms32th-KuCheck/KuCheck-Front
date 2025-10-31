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

export interface GuideSection {
  id: string
  title: string
  description: string
  content?: GuideItem[]
}

export interface GuideItem {
  id?: string
  label?: string
  text: string
  point?: number
  pointType?: 'penalty' | 'reward'
  examples?: string[]
}
export interface SubmitAbsenceType {
  absenceReportId: number
  absenceType: AbsenceType
  absenceReportApproval: AbsenceReportApprovalType
  submitDateTime: string
  sessionTitle: string
  sessionStartDate: string
}

export type AbsenceReportApprovalType = 'SUBMIT' | 'APPROVED'
