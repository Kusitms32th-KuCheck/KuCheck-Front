/**
 * ⚠️ 서버 컴포넌트에서만 import 가능한 파일입니다
 * 'use client' 컴포넌트에서 import 하지 마세요
 *
 * 예시:
 * // ✅ 좋음
 * // @/lib/auth.server 사용
 *
 * // ❌ 나쁨
 * // 'use client' 컴포넌트에서 import
 */

import { cookies } from 'next/headers'
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
 * 서버 사이드에서 쿠키에서 accessToken 조회
 * Set-Cookie 헤더는 자동으로 쿠키에 저장됨
 *
 * @returns accessToken 또는 undefined
 */
export const getAccessTokenServer = async (): Promise<string | undefined> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    if (!token) {
      console.log('⚠️ AccessToken not found in server cookies')
      return undefined
    }

    console.log('✅ AccessToken found in server cookies')
    return token
  } catch (error) {
    console.error('Error reading accessToken from cookies:', error)
    return undefined
  }
}

/**
 * 서버 사이드에서 쿠키에서 refreshToken 조회
 *
 * @returns refreshToken 또는 undefined
 */
export const getRefreshTokenServer = async (): Promise<string | undefined> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('refreshToken')?.value

    if (!token) {
      console.log('⚠️ RefreshToken not found in server cookies')
      return undefined
    }

    console.log('✅ RefreshToken found in server cookies')
    return token
  } catch (error) {
    console.error('Error reading refreshToken from cookies:', error)
    return undefined
  }
}

/**
 * 서버 사이드에서 쿠키 삭제 (로그아웃)
 */
export const clearAuthCookiesServer = async () => {
  try {
    const cookieStore = await cookies()

    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    cookieStore.delete('status')
    cookieStore.delete('role')
  } catch (error) {
    console.error('Error clearing cookies on server:', error)
  }
}

/**
 * RefreshToken으로 새로운 AccessToken 발급 (서버 사이드)
 * 401/403 에러 시 이 함수를 호출하여 토큰 갱신
 */
export const refreshAccessTokenServer = async (): Promise<AuthCallResult> => {
  try {
    const refreshToken = await getRefreshTokenServer()

    if (!refreshToken) {
      throw new Error('Refresh token not found')
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Refresh-Token': refreshToken,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      // 401 or 403 - refreshToken도 만료됨, 재로그인 필요
      if (response.status === 401 || response.status === 403) {
        await clearAuthCookiesServer()
        throw new Error('Session expired, please login again')
      }
      throw new Error(`Failed to refresh token: ${response.status}`)
    }

    const data: ApiResponse<UserType> = await response.json()

    // isSuccess 확인
    if (!data.isSuccess) {
      await clearAuthCookiesServer()
      throw new Error(data.message || 'Token refresh failed')
    }

    const { status, role } = data.result

    // 새 토큰 추출
    const authAccessTokenHeader = response.headers.get('authorization')
    const newAccessToken = authAccessTokenHeader?.replace('Bearer ', '')
    const authRefreshTokenHeader = response.headers.get('x-refresh-token')
    const newRefreshToken = authRefreshTokenHeader?.replace('Bearer ', '')

    if (!newAccessToken) {
      throw new Error('New access token not found in response')
    }

    return {
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      status,
      role,
    }
  } catch (error) {
    console.error('Token refresh error:', error)

    // refreshToken이 만료된 경우 로그아웃 처리
    await clearAuthCookiesServer()

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Token refresh failed',
    }
  }
}
