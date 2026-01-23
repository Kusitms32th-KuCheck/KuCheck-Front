import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { NoticeManageResponse } from '@/types/manager/notice/type'

//공지 상세 조회
export const getServerNoticeDetail = async (noticeId: number): Promise<ApiCallResult<NoticeManageResponse>> => {
  try {
    const { data, error } = await apiCallServer(`/v1/notice/${noticeId}`, {
      method: 'GET',
    })

    if (error) return { success: false, error }
    return { success: true, data }
  } catch (error) {
    console.error('Failed to fetch session detail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
