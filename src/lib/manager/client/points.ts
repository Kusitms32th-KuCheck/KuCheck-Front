import { ApiCallResult } from '@/types/common'
import {
  PointMemberStatus,
  StudyModification,
  MemoModification,
  tfModification,
  kupportersModification,
  kupickModification,
  staffModification,
  KupickToggleResponse,
  TfToggleResponse,
  StaffToggleResponse,
} from '@/types/manager/point/types'

// GET: 상벌점 조회
export const getOverviewClient = async (): Promise<ApiCallResult<PointMemberStatus[]>> => {
  try {
    const response = await fetch(`/api/points/manage/overview`, {
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

// PATCH: 스터디 포인트 수정
export const updateStudyPointsClient = async (
  payload: StudyModification
): Promise<ApiCallResult<StudyModification>> => {
  try {
    const response = await fetch(`/api/points/manage/study`, {
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
