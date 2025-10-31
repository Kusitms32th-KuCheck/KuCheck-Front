export interface CheckDocumentRecord {
  name: string
  part: string
  kupickId: number
  submitDate: string
  applicationUrl: string
  viewUrl: string
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
