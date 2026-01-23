import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { KuPickResponseType } from '@/types/member/ku-pick'

/**
 * 출석체크 QR 요청
 */
export const getKuPickMy = async (): Promise<ApiCallResult<KuPickResponseType>> => {
  try {
    const { data, error } = await apiCallServer('/v1/kupick/my', {
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
