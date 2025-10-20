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
  customClassName?: string
}
