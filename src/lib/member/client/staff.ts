//지금 members/staff/approved했던거랑 members/staff/requests 여기다가도 추가해야해 
import { ApiCallResult } from '@/types/common'
import { MemberListResult, MemberApprovalRequestListResponse } from '@/types/manager/member/types'

//승인된 회원 명단 페이징 조회
export const getClientApprovedStaffMembers = async (
  page: number,
  size: number
): Promise<ApiCallResult<MemberListResult>> => {
  try {
    const response = await fetch(`/api/members/staff/approved?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('API 성공 응답:', data.data.members)
    return { success: true, data: data.data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

//승인 요청 목록 조회
export const getClientStaffApprovalRequests = async (
  page: number,
  size: number
): Promise<ApiCallResult<MemberApprovalRequestListResponse>> => {
  try {
    const response = await fetch(`/api/members/staff/requests?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('API 성공 응답:', data.data)
    return { success: true, data: data.data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
