// 불참 유형
export type AbsenceSubmitType = 'ABSENT' | 'LATE' | 'EARLY_LEAVE'

// 파트 유형
export type PartType = 'FRONTEND' | 'BACKEND' | 'DESIGN' | 'PLANNING'

// 불참사유서 승인 상태
export type AbsenceApprovedType = 'APPROVED' | 'REJECTED' | 'PENDING' | null

// 불참사유서 개별 항목 타입
export interface AbsenceReportItem {
  name: string
  part: PartType
  absenceReportId: number
  submitDate: string
  submitType: AbsenceSubmitType
  time: string | null
  reason: string
  url: string
  absenceApprovedType: AbsenceApprovedType
}

// UI에서 사용하는 변환된 불참사유서 데이터 타입
export interface TransformedAbsenceReportItem extends Omit<AbsenceReportItem, 'part' | 'submitType'> {
  part: string // 변환된 한국어 파트명
  submitType: string // 변환된 한국어 상태
  sessionDate: string // 포맷된 세션 날짜
  attendanceStatus: string // 한국어 출석 상태
  documentStatus: string // 문서 상태
}
