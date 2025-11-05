import { ApiCallResult } from '@/types/common'
import { SessionScheduleRequest, SessionScheduleResponse } from '@/types/manager/session/type'
import { SessionDetailRequest, SessionDetailResponse } from '@/types/manager/session/type'

//세션 일정 저장
export const postClientSessionSchedule = async (
  sessionData: SessionScheduleRequest
): Promise<ApiCallResult<SessionScheduleRequest>> => {
  try {
    const response = await fetch('/api/session/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(sessionData),
    })

    const json = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: json.error || `HTTP ${response.status}`,
      }
    }

    const responseData: SessionScheduleRequest = json.data

    return { success: true, data: responseData }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

//세션 정보 보기
export const getClientSessionSchedule = async (
  page = 1,
  size = 20
): Promise<ApiCallResult<SessionScheduleResponse>> => {
  try {
    const response = await fetch(`/api/session/staff?page=${page}&size=${size}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    const json = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: json.error || `HTTP ${response.status}`,
      }
    }

    const data = json.data.data

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// 세션 상세 작성
export const postClientSessionDetail = async (
  detailData: SessionDetailRequest
): Promise<ApiCallResult<SessionDetailResponse>> => {
  try {
    const response = await fetch('/api/session/staff/detail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(detailData),
    })

    const json = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: json.error || `HTTP ${response.status}`,
      }
    }

    const responseData: SessionDetailResponse = json.data

    return { success: true, data: responseData }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
