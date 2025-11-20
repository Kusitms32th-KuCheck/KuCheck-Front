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

//회원 승인 상태 일괄 변경
export const patchClientStaffApprovalStatus = async (
  memberId: number,
  status: 'APPROVED' | 'REJECTED'
): Promise<ApiCallResult<null>> => {
  try {
    const response = await fetch(`/api/members/staff/approvals`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ memberId, status }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('API 성공 응답:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// 회원 승인 상태 일괄 변경 (배치)
export const patchClientStaffApprovalStatusBatch = async (
  approvals: { memberId: number; status: 'APPROVED' | 'REJECTED' }[]
): Promise<ApiCallResult<null>> => {
  try {
    const response = await fetch(`/api/members/staff/approvals`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(approvals),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('API 성공 응답:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

//학회원 프로필 정보 수정
export const patchClientStaffProfile = async (
  memberId: number,
  body: { name?: string; school?: string; major?: string; phoneNumber?: string; part?: string }
): Promise<ApiCallResult<null>> => {
  try {
    const response = await fetch(`/api/members/staff/${memberId}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }
    const data = await response.json()
    console.log('API 성공 응답:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}