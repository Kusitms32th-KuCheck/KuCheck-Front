import { ApiCallResult, PaginationResultType } from '@/types/common'
import { AttendanceCheckResponseType } from '@/types/member/attendance'

export const getPointsHistory = async (
  page: number,
  size: number
): Promise<ApiCallResult<PaginationResultType<AttendanceCheckResponseType>>> => {
  try {
    const response = await fetch(`/api/points/history?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 쿠키 자동 포함 (httpOnly)
      // next: {
      //   revalidate: 604800, // 1주일 - 나의 출석은 1주일마다 갱신되므로 캐시처리
      //   tags: ['points-history'], // 캐시 태그
      // },
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
