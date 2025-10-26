/**
 * common.ts - 클라이언트 유틸 함수 모음
 *
 * 이 파일의 모든 함수는 클라이언트 컴포넌트에서 사용 가능합니다.
 * 서버 전용 패키지(next/headers 등)를 import하지 않습니다.
 */

import { SignUpDataType } from '@/types/sign-up'
import { ApiCallResult, PreSignedUrlResponseType } from '@/types/common'

/**
 * 온보딩 정보 제출 (클라이언트에서 호출)
 *
 * ✅ 클라이언트 컴포넌트에서만 사용
 * 내부적으로 /api/members/onboarding API 라우트를 호출
 * API 라우트는 서버에서 실행되어 백엔드 API를 호출
 *
 * 흐름:
 * 1. 클라이언트 컴포넌트에서 postMembersOnboarding() 호출
 * 2. fetch로 /api/members/onboarding에 요청
 * 3. API 라우트가 서버에서 실행
 * 4. apiCallServer()로 백엔드 /v1/members/onboarding에 요청
 * 5. 결과를 클라이언트로 반환
 *
 * @param signUpData 온보딩 정보
 */
export const postMembersOnboarding = async (signUpData: SignUpDataType | undefined) => {
  try {
    const response = await fetch('/api/members/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
      credentials: 'include', // 쿠키 자동 포함 (httpOnly)
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.error || 'Failed to submit' }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * s3 업로드
 * @param folderName 폴더 이름, 불참 사유서: absence, 이렇게 프론트측에서 임의로 지정하면 됩니다.
 * @param fileName 업로드된 파일 명을 작성하면 됩니다.
 */
export const getS3PostUrl = async (
  folderName: string,
  fileName: string
): Promise<ApiCallResult<ApiCallResult<PreSignedUrlResponseType>>> => {
  try {
    const response = await fetch(`/api/s3/postUrl?folderName=${folderName}&fileName=${fileName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 쿠키 자동 포함 (httpOnly)
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.error || 'Failed to submit' }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
