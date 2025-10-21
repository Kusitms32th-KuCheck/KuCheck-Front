// lib/auth.ts
import { ApiResponse, UserType } from '@/types/common'

export const postAuthKaKao = async (code: string | null) => {
  try {
    if (!code) {
      throw new Error('Authorization code not provided')
    }

    // 백엔드 서버에 code를 전달하여 JWT 토큰 요청
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
      console.error('JWT Response error:', errorData)
      throw new Error(`Failed to get JWT token: ${jwtResponse.status}`)
    }

    const jwtResponseData: ApiResponse<UserType> = await jwtResponse.json()

    // 헤더에서 토큰 추출
    const accessToken = jwtResponse.headers.get('authorization')
    const { status, role } = jwtResponseData.result

    if (!accessToken) {
      throw new Error('Tokens not found in response headers')
    }

    console.log('✅ Authentication successful:', { accessToken, status, role })

    // ✅ 데이터만 반환 (리다이렉트는 페이지에서 처리)
    return { success: true, accessToken, status, role }
  } catch (error) {
    console.error('Kakao login error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
