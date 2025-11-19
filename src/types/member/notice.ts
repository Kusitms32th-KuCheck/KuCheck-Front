export interface NoticeCategoryType {
  id?: number
  name: string
  color: NoticeCategoryColorType
}
export type NoticeCategoryColorType =
  | 'RED'
  | 'ORANGE'
  | 'YELLOW'
  | 'GREEN'
  | 'TEAL'
  | 'BLUE'
  | 'LIGHT_GREEN'
  | 'PURPLE'
  | 'PINK'
  | 'BROWN'

export type NoticeType = {
  id?: number
  title?: string
  content?: string
  authorId?: number
  authorName?: string
  categories?: NoticeCategoryType[]
  createdAt?: string
  status?: NoticeStatusType
  imageUrls?: NoticeImageType[]
  fileUrls?: NoticeImageType[]
}

export interface NoticeImageType {
  id: number
  url: string
  size: number
}

export type NoticeStatusType = 'SCHEDULED' | 'DRAFT' | 'PUBLISHED'
