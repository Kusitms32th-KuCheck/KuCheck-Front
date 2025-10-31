export interface AttendanceScanResponseType {
  memberId: number
  memberName: string
  sessionId: number
  state: string
  scannedAt: string
}

export interface CheckDocumentRecord {
  name: string
  part: string
  sessionDate: string
  applicationImage: string
  viewingImage: string
  documentStatus?: string
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
