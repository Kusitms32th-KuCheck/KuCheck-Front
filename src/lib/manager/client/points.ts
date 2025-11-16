import { ApiCallResult } from '@/types/common'
import {
  PointMemberStatus,
  MemoModification,
  tfModification,
  kupportersModification,
  kupickModification,
  staffModification,
  KupickToggleResponse,
  TfToggleResponse,
  StaffToggleResponse,
  MonthlyAttendanceResult,
  MonthlyAttendanceModification,
  MonthlyAttendanceUpdateResponse,
} from '@/types/manager/point/types'

// GET: 상벌점 조회
export const getOverviewClient = async (
  page: number = 1,
  size: number = 80
): Promise<ApiCallResult<PointMemberStatus[]>> => {
  try {
    const response = await fetch(`/api/points/manage/overview?page=${page}&size=${size}`, {
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
    console.log('API 성공 응답:', data)
    return { success: true, data: data.data.data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// GET: 월별 출결 조회
export const getMonthlyClient = async (
  month: number = 11,
  page: number = 1,
  size: number = 10
): Promise<ApiCallResult<MonthlyAttendanceResult>> => {
  try {
    console.log(`${month}월 출결 데이터 요청 시작`)
    const response = await fetch(`/api/points/manage/monthly?month=${month}&page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('월별 출결 API 응답 에러:', {
        month: month,
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        error: error,
      })
      return { success: false, error: error.error || `HTTP ${response.status}: ${response.statusText}` }
    }

    const data = await response.json()
    console.log(`${month}월 출결 API 성공 응답:`, data)
    return { success: true, data: data.data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// PATCH: 메모 수정
export const updateMemoClient = async (payload: MemoModification): Promise<ApiCallResult<MemoModification>> => {
  try {
    const response = await fetch(`/api/points/manage/memo`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
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

// PATCH: 큐포터즈 포인트 수정
export const updateKuportersPointsClient = async (
  payload: kupportersModification
): Promise<ApiCallResult<kupportersModification>> => {
  try {
    const response = await fetch(`/api/points/manage/kupporters`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
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

// PATCH: 큐픽 참여 여부 수정
export const updateKupickParticipationClient = async (
  payload: kupickModification
): Promise<ApiCallResult<KupickToggleResponse>> => {
  try {
    const response = await fetch(`/api/points/manage/kupick`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
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

// PATCH: TF 여부 수정
export const updateIsTfClient = async (payload: tfModification): Promise<ApiCallResult<TfToggleResponse>> => {
  try {
    const response = await fetch(`/api/points/manage/is-tf`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
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

// PATCH: 운영진 여부 수정
export const updateIsStaffClient = async (payload: staffModification): Promise<ApiCallResult<StaffToggleResponse>> => {
  try {
    const response = await fetch(`/api/points/manage/is-staff`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
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

// PATCH: 월별 출석 상태 수정
export const updateMonthlyAttendanceClient = async (
  payload: MonthlyAttendanceModification
): Promise<ApiCallResult<MonthlyAttendanceUpdateResponse>> => {
  try {
    const response = await fetch(`/api/points/manage/monthly`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
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
