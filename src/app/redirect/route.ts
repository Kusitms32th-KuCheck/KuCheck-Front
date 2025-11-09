import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { postAuthKaKao } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const errorParam = searchParams.get('error')

  const baseUrl = request.nextUrl.origin

  const redirect = (pathname: string) => {
    return NextResponse.redirect(new URL(pathname, baseUrl))
  }

  if (errorParam) {
    console.error('Auth error:', errorParam)
    return redirect(`/login?error=${encodeURIComponent(errorParam)}`)
  }

  if (!code) {
    console.error('No authorization code provided')
    return redirect('/login?error=no_code')
  }

  try {
    const result = await postAuthKaKao(code, baseUrl === 'http://localhost:3000' ? 'LOCAL' : 'DEV')
    console.log('카톡 로그인 결과', result)

    if (!result.success) {
      console.error('Authentication failed:', result.error)
      return redirect(`/login?error=${encodeURIComponent(result.error || 'Authentication failed')}`)
    }

    const { status, role, accessToken, refreshToken, hasInfo } = result

    // 3. 쿠키 설정
    const cookieStore = await cookies()
    const cookieOptions = {
      maxAge: 7 * 24 * 60 * 60, // 7일
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    }

    // accessToken, refreshToken은 httpOnly 유지
    const secureTokenOptions = {
      ...cookieOptions,
      httpOnly: true,
    }
    console.log('액세스토큰', accessToken)
    console.log('리프레시토큰', refreshToken)

    if (accessToken) {
      cookieStore.set('accessToken', accessToken, secureTokenOptions)
    }
    if (refreshToken) {
      cookieStore.set('refreshToken', refreshToken, secureTokenOptions)
    }
    if (role) {
      cookieStore.set('role', role, cookieOptions)
    }

    // 4. 사용자 상태에 따른 리다이렉트
    if (status === 'PENDING') {
      if (hasInfo) {
        // 승인 대기 중 - 회원가입 정보 입력 페이지로
        return redirect('/sign-up?step=7')
      } else {
        return redirect('/sign-up')
      }
    }

    if (status === 'APPROVED') {
      // 승인됨 - 역할에 따라 분기
      if (role === 'USER' || role === 'MANAGEMENT' || role === 'STAFF' || role === 'EXECUTIVE') {
        return redirect('/home')
      } else if (role === 'GUEST') {
        return redirect('/sign-up')
      }
    }

    // 5. 예상치 못한 상태
    console.warn('Unexpected user status:', status)
    return redirect('/login?error=unexpected_status')
  } catch (error) {
    // API 호출 또는 쿠키 설정 중 발생한 예외 처리
    console.error('Redirect route handler error:', error)
    const errorMessage = error instanceof Error ? error.message : 'server_error'
    return redirect(`/login?error=${encodeURIComponent(errorMessage)}`)
  }
}
