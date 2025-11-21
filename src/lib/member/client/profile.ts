import { ApiCallResult, PaginationResultType } from '@/types/common'
import { UserSummaryType } from '@/types/member/user'

export const getClientProfile = async (
): Promise<ApiCallResult<ApiCallResult<UserSummaryType>>> => {
  try {
    const response = await fetch(
      '/api/members/profile/summary',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 자동 포함 (httpOnly)
      }
    )

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
