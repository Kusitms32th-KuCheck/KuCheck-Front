import { ApiCallResult, PaginationResultType } from '@/types/common'
import { NoticeType } from '@/types/member/notice'

export const getNotice = async (
  page: number,
  size: number,
  categoryId?: number
): Promise<ApiCallResult<ApiCallResult<PaginationResultType<NoticeType[]>>>> => {
  try {
    const response = await fetch(
      `/api/notice?page=${page}&size=${size}${categoryId && categoryId !== 0 ? `&categoryId=${categoryId}` : ''}`,
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
