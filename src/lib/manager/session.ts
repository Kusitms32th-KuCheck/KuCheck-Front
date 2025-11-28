import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { SessionDetailResponse, SessionScheduleResponse } from '@/types/manager/session/type'

export const getSessionDetailServer = async (
  sessionDetailId: number
): Promise<ApiCallResult<SessionDetailResponse>> => {
  try {
    const endpoint = `/v1/session/staff/detail/${sessionDetailId}`

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

export const getSessionScheduleServer = async (
  page = 1,
  size = 10
): Promise<ApiCallResult<SessionScheduleResponse>> => {
  try {
    console.log('getSessionScheduleServer called with page:', page, 'size:', size)
    const endpoint = `/v1/session/staff?page=${page}&size=${size}`
    console.log('API endpoint:', endpoint)

    const { data, error } = await apiCallServer<{ data: SessionScheduleResponse }>(endpoint, {
      method: 'GET',
    })

    console.log('API response - data:', data, 'error:', error)

    if (error) return { success: false, error }

    return { success: true, data: data?.data || [] }
  } catch (error) {
    console.error('Failed to fetch session schedule:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
