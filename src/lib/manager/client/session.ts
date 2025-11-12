import { ApiCallResult } from '@/types/common'
import {
  SessionScheduleRequest,
  SessionScheduleResponse,
  SessionDetailRequest,
  SessionDetailResponse,
  SessionDetailImageRequest,
  SessionDetailImageResponse,
} from '@/types/manager/session/type'

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
  size = 40
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

//세션 상세정보 이미지 업로드
export const postDetailImage = async (
  uploadData: SessionDetailImageRequest | undefined
): Promise<ApiCallResult<SessionDetailImageResponse[]>> => {
  try {
    if (!uploadData) {
      return { success: false, error: 'Upload data is required' }
    }

    const response = await fetch('/api/session/staff/detail/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.error || 'Failed to submit' }
    }

    const data = await response.json()
    return { success: true, data: data.data || data.result }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

//세션 수정
export const patchClientSession = async (
  sessionId: number,
  sessionData: {
    week: number
    sessionDate: string
    title: string
    category: string
    isHoliday: boolean
  }
): Promise<ApiCallResult<unknown>> => {
  try {
    const response = await fetch(`/api/session/staff/${sessionId}`, {
      method: 'PATCH',
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

    return { success: true, data: json.data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
