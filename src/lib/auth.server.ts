// lib/auth.server.ts
import { cookies } from 'next/headers'

export const getAccessTokenServer = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (accessToken) {
      console.log('✅ AccessToken found in server cookies')
    }

    return accessToken || null
  } catch (error) {
    console.error('Error reading accessToken from cookies:', error)
    return null
  }
}

export const getRefreshTokenServer = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (refreshToken) {
      console.log('✅ RefreshToken found in server cookies')
    }

    return refreshToken || null
  } catch (error) {
    console.error('Error reading refreshToken from cookies:', error)
    return null
  }
}

/**
 * 토큰 갱신 + 쿠키 업데이트 (Route Handler 사용)
 */
export const refreshAccessTokenServer = async () => {
  try {
    const refreshToken = await getRefreshTokenServer()

    if (!refreshToken) {
      return { success: false, error: 'No refresh token' }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      // 쿠키 삭제 - Route Handler 호출
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/cookies`, {
        method: 'DELETE',
      })
      return { success: false, error: 'Token refresh failed' }
    }

    const result = await response.json()
    const tokens = result.data

    // 쿠키 설정 - Route Handler 호출
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/cookies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        status: tokens.status,
        role: tokens.role,
      }),
    })

    return {
      success: true,
      accessToken: tokens.accessToken,
    }
  } catch (error) {
    console.error('Error refreshing token:', error)
    return { success: false, error: 'Token refresh error' }
  }
}
