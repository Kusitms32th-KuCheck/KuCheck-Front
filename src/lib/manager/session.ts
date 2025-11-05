import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { SessionDetailRequest, SessionDetailResponse } from '@/types/manager/session/type'

export const postServerSessionDetail = async (
  detailData: SessionDetailRequest
): Promise<ApiCallResult<SessionDetailResponse>> => {
  try {
    const { data, error } = await apiCallServer('/v1/session/staff/detail', {
      method: 'POST',
      body: JSON.stringify(detailData),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to post session detail:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// export helper could be used by server route if needed
