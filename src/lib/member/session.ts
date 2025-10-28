import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { SessionDataType } from '@/types/member/session'

/**
 * 불참사유서 Server Component에서 호출 가능 (apiCallServer 사용)
 */
export const getSessionAbsenceServer = async (): Promise<ApiCallResult<SessionDataType[]>> => {
  try {
    const { data, error } = await apiCallServer('/v1/session/absence', {
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
