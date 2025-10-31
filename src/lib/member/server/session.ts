import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { SessionDataType, ThisWeekSessionDataType } from '@/types/member/session'

/**
 * 이번주 세션 정보 조회
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

/**
 * 전체 세션 정보 조회
 */
export const getSessionAfterToday = async (): Promise<ApiCallResult<SessionDataType[]>> => {
  try {
    const { data, error } = await apiCallServer('/v1/session/after/today', {
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
