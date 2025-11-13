//출석 스캔
export interface AttendanceScanResponseType {
  memberId: number
  memberName: string
  sessionId: number
  state: string
  scannedAt: string
}
//출석요약
export interface AttendanceSummaryType {
  present: number
  earlyLeave: number
  late: number
  absent: number
  total: number
}

// 불참 유형
export type AbsenceSubmitType = 'ABSENT' | 'LATE' | 'EARLY_LEAVE'
// 파트 유형
export type PartType = 'FRONTEND' | 'BACKEND' | 'DESIGN' | 'PLANNING'
// 불참사유서 승인 상태
export type AbsenceApprovedType = 'APPROVED' | 'REJECTED' | 'PENDING' | null
// 불참사유서 개별 항목 타입
export interface AbsenceReportItem {
  name: string
  part: PartType | string
  absenceReportId: number
  submitDate: string
  submitType: AbsenceSubmitType | string
  time: string | null
  reason: string
  url: string
  absenceApprovedType: AbsenceApprovedType | string
}

// 벌점 타입
export type AbsencePenaltyType = 'EXCUSED' | 'ABSENT' | 'ABSENT_WITH_DOC' | 'ABSENT_WITH_CAUSE' | 'LATE' | 'EARLY_LEAVE'

// 벌점 매기기 요청 타입
export interface AbsencePenaltyRequest {
  approvedType: AbsencePenaltyType
}
