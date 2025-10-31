import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { ThisWeekSessionDataType } from '@/types/member/session'

/**
 * 출석체크 QR 요청
 */
export const getSessionThisWeek = async (): Promise<ApiCallResult<ThisWeekSessionDataType[]>> => {
  try {
    const { data, error } = await apiCallServer('/v1/session/this-week', {
      method: 'GET',
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
