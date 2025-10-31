import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult, PaginationResultListType } from '@/types/common'
import { SubmitAbsenceType } from '@/types/member/absence'

/**
 * 내 불참사유서 전체 조회
 */
export const getAbsence = async (
  page: number,
  size: number
): Promise<ApiCallResult<PaginationResultListType<SubmitAbsenceType>>> => {
  try {
    const { data, error } = await apiCallServer(`/v1/absence?page=${page}&size=${size}`, {
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
