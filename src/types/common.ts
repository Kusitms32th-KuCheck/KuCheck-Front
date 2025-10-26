export interface ApiResponse<T> {
  code: number
  isSuccess: boolean
  message: string
  result: T
}

export interface ApiCallResult<T = never> {
  success: boolean
  data?: T
  error?: string
}

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export interface UserType {
  status: UserStatusType
  memberId: number
  role: UserRoleType
}
export type UserStatusType = 'PENDING' | 'APPROVED' | 'REJECTED'
export type UserRoleType = 'GUEST' | 'USER' | 'ADMIN' | 'MANAGEMENT'

export interface FileInfoType {
  name: string
  size: number
  url: string | ArrayBuffer | null
  id: string // 고유 식별자 추가
}
