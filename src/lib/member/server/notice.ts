import { ApiCallResult } from '@/types/common'
import { apiCallServer } from '@/lib/api.server'
import { NoticeCategoryType } from '@/types/member/notice'

/**
 * 이번주 세션 정보 조회
 */
export const getNoticeCategories = async (): Promise<ApiCallResult<NoticeCategoryType[]>> => {
  try {
    const { data, error } = await apiCallServer('/v1/notice/categories', {
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
