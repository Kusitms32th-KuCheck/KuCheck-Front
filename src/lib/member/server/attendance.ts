import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { AttendanceTokenResponseType } from '@/types/member/attendance'

/**
 * 출석체크 QR 요청
 */
export const postServerAttendanceToken = async (): Promise<ApiCallResult<AttendanceTokenResponseType>> => {
  try {
    const { data, error } = await apiCallServer('/v1/attendance/token', {
      method: 'POST',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to fetch session absence:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
