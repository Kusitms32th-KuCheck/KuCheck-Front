import { ApiCallResult } from '@/types/common'
import { AbsenceReportItem, AbsencePenaltyType } from '@/types/manager/attendance/type'

// 불참사유서 목록 조회
export const getAbsenceClient = async (sessionId: number): Promise<ApiCallResult<AbsenceReportItem[]>> => {
  try {
    const response = await fetch(`/api/absence/manage?sessionId=${sessionId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.error || 'Failed to submit' }
    }
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// 불참사유서 벌점 매기기
export const patchPenaltyClient = async (
  absenceReportId: number,
  penaltyType: AbsencePenaltyType
): Promise<ApiCallResult<unknown>> => {
  try {
    const response = await fetch(`/api/absence/manage?absenceReportId=${absenceReportId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ approvedType: penaltyType }),
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.error || 'Failed to set penalty' }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
