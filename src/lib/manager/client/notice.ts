import { ApiCallResult } from '@/types/common'
import {
  NoticeManageResponse,
  NoticeManageRequest,
  NoticeCategory,
  NoticeListResponse,
} from '@/types/manager/notice/type'

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

//공지 수정
export const putClientNoticeManage = async (
  noticeId: number,
  noticeData: NoticeManageRequest
): Promise<ApiCallResult<NoticeManageResponse>> => {
  try {
    const response = await fetch(`/api/notice/manage/${noticeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(noticeData),
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

//공지 상세 조회
export const getClientNoticeDetail = async (noticeId: number): Promise<ApiCallResult<NoticeManageResponse>> => {
  try {
    const response = await fetch(`/api/notice/${noticeId}`, {
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
    return { success: true, data: data.data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

//공지 리스트 조회
export const getClientNoticeList = async (page: number, size: number): Promise<ApiCallResult<NoticeListResponse>> => {
  try {
    const response = await fetch(`/api/notice?page=${page}&size=${size}`, {
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
    return { success: true, data: data.data }
  } catch (error) {
    console.error('Fetch 에러:', error)
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
    return { success: true, data: data.data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

//파일, 이미지 업로드
export const postClientNoticeFile = async (
  filename: string,
  fileType: 'FILE' | 'IMAGE',
  fileSize: number
): Promise<ApiCallResult<{ presignedUrl: string; fileId: number }>> => {
  try {
    const response = await fetch(
      `/api/notice/files?filename=${encodeURIComponent(filename)}&fileType=${fileType}&fileSize=${fileSize}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('API 성공 응답:', data)
    return { success: true, data: data.data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
