export interface ApiResponse<T> {
  code: number
  message: string
  result: T
  isSuccess: boolean
}
export interface UserType {
  status: 'PENDING'
  memberId: number
  role: string
}
