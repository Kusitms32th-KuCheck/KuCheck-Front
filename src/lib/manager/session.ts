import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { SessionDetailResponse } from '@/types/manager/session/type'

export const getSessionDetailServer = async (
  sessionDetailId: number
): Promise<ApiCallResult<SessionDetailResponse>> => {
  try {
    console.log('getSessionDetailServer called with sessionDetailId:', sessionDetailId)
    const endpoint = `/v1/session/staff/detail/${sessionDetailId}`
    console.log('API endpoint:', endpoint)

    const { data, error } = await apiCallServer<SessionDetailResponse>(endpoint, {
      method: 'GET',
    })

    console.log('API response - data:', data, 'error:', error)

    if (error) return { success: false, error }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to fetch session detail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
