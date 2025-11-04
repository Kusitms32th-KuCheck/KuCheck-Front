import { ApiCallResult } from '@/types/common'
import { PointMemberStatus } from '@/types/manager/point/types'

export const getOverviewClient = async (): Promise<ApiCallResult<PointMemberStatus[]>> => {
  try {
    const response = await fetch(`/api/points/manage/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('API 성공 응답:', data)
    return { success: true, data: data.data.data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
