import { ApiCallResult, ApiResponse } from '@/types/common'

/**
 * JSON 응답을 파싱하는 헬퍼 함수
 * 백엔드 응답 형식: { code, isSuccess, message, result }
 *
 * 클라이언트 & 서버 양쪽에서 사용 가능
 */
export const parseJsonResponse = async <T = never>(response: Response): Promise<ApiCallResult<T>> => {
  try {
    const data: ApiResponse<T> = await response.json()

    // 성공 응답: isSuccess = true
    if (data.isSuccess) {
      return {
        success: true,
        data: data.result,
      }
    }

    // 실패 응답: isSuccess = false
    return {
      success: false,
      error: data.message || `Error: ${data.code}`,
    }
  } catch (error) {
    // JSON 파싱 실패 또는 네트워크 에러
    let errorMessage = `HTTP Error: ${response.status}`

    try {
      const errorText = await response.text()
      if (errorText) {
        errorMessage = errorText
      }
    } catch {
      // response.text() 실패 시 무시
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}
