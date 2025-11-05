import { ApiCallResult } from '@/types/common'
import { SessionScheduleRequest } from '@/types/manager/session/type'

export const postClientAttendanceScan = async (
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
