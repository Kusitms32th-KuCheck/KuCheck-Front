// app/api/auth/kakao/callback/route.ts
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GETKaKaoToken(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return redirect('/login?error=no_code')
  }

  try {
    // 1. 카카오 액세스 토큰 가져오기
    const kakaoTokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? '',
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '',
        code: code ?? '',
        client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET ?? '',
      }),
    })

    if (!kakaoTokenResponse.ok) {
      throw new Error('Failed to get Kakao access token')
    }

    const kakaoTokenData = await kakaoTokenResponse.json()
    const kakaoAccessToken = kakaoTokenData.access_token

    // 2. 백엔드 서버에 JWT 토큰 요청
    const jwtResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kakaoAccessToken,
      }),
    })

    if (!jwtResponse.ok) {
      throw new Error('Failed to get JWT token')
    }

    const jwtData = await jwtResponse.json()
    const { accessToken, refreshToken } = jwtData.data.tokens
    const { role } = jwtData.data

    // 3. 쿠키 설정 (7일 유효)
    const cookieStore = await cookies()
    const expires = new Date(Date.now() + 604800000) // 7일

    cookieStore.set('kakaoAccessToken', kakaoAccessToken, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    cookieStore.set('accessToken', accessToken, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    cookieStore.set('refreshToken', refreshToken, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    cookieStore.set('role', role, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    // 4. 권한에 따라 리다이렉트
    if (role === 'USER' || role === 'ADMIN') {
      return redirect('/home')
    } else {
      return redirect('/sign-up')
    }
  } catch (error) {
    console.error('Kakao login error:', error)
    return redirect('/login?error=auth_failed')
  }
}
