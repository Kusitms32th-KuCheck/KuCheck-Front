import { ApiCallResult } from '@/types/common'
import { AbsenceReportItem } from '@/types/manager/attendance/type'

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
