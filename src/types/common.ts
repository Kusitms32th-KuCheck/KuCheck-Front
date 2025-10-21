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
  status: UserStatus
  memberId: number
  role: UserRole
}

export type UserStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export type UserRole = 'GUEST' | 'USER' | 'ADMIN' | 'MANAGEMENT'
