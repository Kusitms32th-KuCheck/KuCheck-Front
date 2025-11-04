export interface ApiResponse<T> {
  code: number
  isSuccess: boolean
  message: string
  result: T
}
//api.ts의 parseJsonResponse 타입 (프론트 BFF 구조시 불러오는 responseType)
export interface ApiCallResult<T = never> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginationResultListType<T> {
  data: T[]
  totalPages: number
  isLastPage: boolean
}

export interface PaginationResultType<T> {
  data: T
  totalPages: number
  isLastPage: boolean
}

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export interface PreSignedUrlResponseType {
  preSignedUrl: string
  key: string
}

export interface UserType {
  status: UserStatusType
  memberId: number
  role: UserRoleType
  hasInfo: boolean
}

export type UserStatusType = 'PENDING' | 'APPROVED' | 'REJECTED'
export type UserRoleType = 'EXECUTIVE' | 'GUEST' | 'USER' | 'STAFF' | 'MANAGEMENT' //EXECUTIVE(회장단) > MANAGEMENT(경총) > STAFF(운영진) > USER(학회원) > GUEST(온보딩)
export type PartType = 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLANNING'

export interface FileInfoType {
  name: string
  size: number
  url: string | ArrayBuffer | null
  id: string // 고유 식별자 추가
}
