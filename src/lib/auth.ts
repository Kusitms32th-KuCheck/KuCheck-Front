import { ApiResponse, UserType } from '@/types/common'
interface AuthCallResult {
  success: boolean
  accessToken?: string
  refreshToken?: string | null
  status?: string
  role?: string
  error?: string
}

/**
 * 카카오 인증 - code를 받아 JWT 토큰 발급
 * PENDING 상태일 때는 accessToken만, APPROVED 상태일 때는 refreshToken도 반환
 * @param code - 카카오에서 받은 인증 코드
 *
 * 주의: 이 함수는 API 응답만 처리합니다.
 * 쿠키 설정은 백엔드의 Set-Cookie 헤더로 자동 처리됩니다.
 */
export const postAuthKaKao = async (code: string | null): Promise<AuthCallResult> => {
  try {
    if (!code) {
      throw new Error('Authorization code not provided')
    }

    const jwtResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
      cache: 'no-store',
    })

    if (!jwtResponse.ok) {
      const errorData = await jwtResponse.text()
      console.error('Kakao auth error:', errorData)
      throw new Error(`Failed to authenticate: ${jwtResponse.status}`)
    }

    const jwtResponseData: ApiResponse<UserType> = await jwtResponse.json()

    // isSuccess 확인
    if (!jwtResponseData.isSuccess) {
      throw new Error(jwtResponseData.message || 'Authentication failed')
    }

    const { status, role } = jwtResponseData.result

    // 헤더에서 토큰 추출
    // Set-Cookie 헤더: 백엔드에서 이미 httpOnly로 설정됨
    const accessToken = jwtResponse.headers.get('authorization')?.replace('Bearer ', '')
    const refreshToken = jwtResponse.headers.get('X-Refresh-Token')?.replace('Bearer ', '')

    if (!accessToken) {
      throw new Error('Access token not found in response')
    }

    console.log('✅ Kakao authentication successful')

    return {
      success: true,
      accessToken,
      refreshToken,
      status,
      role,
    }
  } catch (error) {
    console.error('Kakao authentication error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    }
  }
}
