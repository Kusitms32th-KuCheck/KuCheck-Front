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
  | 'INDIGO'
  | 'PURPLE'
  | 'PINK'
  | 'BROWN'
  | 'GRAY'

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
}
export type NoticeStatusType = 'SCHEDULED' | 'DRAFT' | 'PUBLISHED'
