import { ApiCallResult } from '@/types/common'
import { apiCallServer } from '@/lib/api.server'
import { UserSummaryType } from '@/types/member/user'

/**
 * profileSummary 데이터 불러오기
 */
export const getProfileSummary = async (): Promise<ApiCallResult<UserSummaryType>> => {
  try {
    const { data, error } = await apiCallServer('/v1/members/profile/summary', {
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
