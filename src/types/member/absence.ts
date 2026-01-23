export interface AbsenceDataType {
  absenceReportId?: number | null
  sessionId?: number
  submitType?: AbsenceType
  reason?: string
  fileName?: string | null
  lateDateTime?: string | null
  leaveDateTime?: string | null
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
