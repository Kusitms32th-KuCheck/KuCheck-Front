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
export interface CheckDocumentRecord {
  name: string
  part: string
  kupickId: number
  submitDate: string
  applicationUrl: string
  viewUrl: string
  approval: boolean
}

export interface KupicData {
  kupickId: number
  approval: boolean
}

export interface ImageModalProps {
  title?: string
  titles?: string[]
  images: string[]
  footerText?: string
  initialIndex?: number
  onClose?: () => void
  imageClassName?: string
  customClassName?: string
}
