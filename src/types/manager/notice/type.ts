//공지 등록
export interface NoticeManageRequest {
  title: string
  categoryIds: number[]
  content: string
  fileIds?: number[]
}

type Category = {
  name: string
  color: string
}

type NoticeImageOrFile = {
  id: number
  url: string
  size: null | number
}
export interface NoticeManageResponse {
  id: number
  title: string
  categories: Category[]
  createdAt: string
  content: string
  authorId: number
  authorName: string
  imageUrls: NoticeImageOrFile[]
  fileUrls: NoticeImageOrFile[]
}

//공지 리스트
export interface NoticeListItem {
  id: number
  title: string
  content: string
  authorId: number
  authorName: string
  categories: Category[]
  createdAt: string
  status: string
  imageUrls: NoticeImageOrFile[]
  fileUrls: NoticeImageOrFile[]
}

export interface NoticeListResponse {
  data: NoticeListItem[]
  totalPages: number
  isLastPage: boolean
}

//카테고리조회
export interface NoticeCategory {
  id: number
  name: string
  color: string
}
