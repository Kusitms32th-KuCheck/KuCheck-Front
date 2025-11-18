import { ApiCallResult } from '@/types/common'
import { NoticeManageResponse, NoticeManageRequest, NoticeCategory } from '@/types/manager/notice/type'

//공지 등록
export const postClientNoticeManage = async (
  sessionData: NoticeManageRequest
): Promise<ApiCallResult<NoticeManageResponse>> => {
  try {
    const response = await fetch('/api/notice/manage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(sessionData),
    })

    const json = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: json.error || `HTTP ${response.status}`,
      }
    }

    const responseData: NoticeManageResponse = json.data

    return { success: true, data: responseData }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

//카테고리 조회
export const getClientCategory = async (): Promise<ApiCallResult<NoticeCategory[]>> => {
  try {
    const response = await fetch(`/api/notice/categories`, {
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
    // API 응답이 { data: Array } 형태일 때 data.data 반환
    return { success: true, data: data.data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
