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

//카테고리조회
export interface NoticeCategory {
  id: number
  name: string
  color: string
}
