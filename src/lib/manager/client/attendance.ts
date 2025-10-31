import { AttendanceScanResponseType } from '@/types/manager/check-document/types'
import { ApiCallResult } from '@/types/common'

export const postClientAttendanceScan = async (token: string): Promise<ApiCallResult<AttendanceScanResponseType>> => {
  try {
    const response = await fetch('/api/attendance/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token }),
    })

    const json = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: json.error || `HTTP ${response.status}`,
      }
    }

    const data: AttendanceScanResponseType = json.data

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
