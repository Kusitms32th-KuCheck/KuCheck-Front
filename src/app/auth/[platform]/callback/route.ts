import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { postAuthKaKao, postAuthApple } from '@/lib/auth'

type Props = { params: Promise<{ platform: string }> }

/**
 * 1. 공통 인증 처리 함수
 * API 결과값을 받아 쿠키를 굽고 최종 페이지로 리다이렉트합니다.
 */
async function processAuth(result: any, baseUrl: string) {
  const redirect = (path: string) => NextResponse.redirect(new URL(path, baseUrl))

  if (!result.success) {
    console.error('Authentication failed:', result.error)
    return redirect(`/login?error=${encodeURIComponent(result.error || 'auth_failed')}`)
  }

  const { status, role, accessToken, refreshToken, hasInfo } = result
  const cookieStore = await cookies()

  // 쿠키 설정 로직 공통화
  const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  }

  if (accessToken) cookieStore.set('accessToken', accessToken, { ...cookieOptions, httpOnly: true })
  if (refreshToken) cookieStore.set('refreshToken', refreshToken, { ...cookieOptions, httpOnly: true })
  if (role) cookieStore.set('role', role, cookieOptions)

  // 리다이렉트 분기 처리
  if (status === 'PENDING') {
    return redirect(hasInfo ? '/sign-up?step=7' : '/sign-up')
  }

  if (status === 'APPROVED') {
    const mainRoles = ['USER', 'MANAGEMENT', 'STAFF', 'EXECUTIVE']
    if (mainRoles.includes(role)) return redirect('/home')
    if (role === 'GUEST') return redirect('/sign-up')
  }

  return redirect('/login?error=unexpected_status')
}

/**
 * 2. GET 핸들러 (카카오 등 쿼리 파라미터 방식)
 */
export async function GET(request: NextRequest, { params }: Props) {
  const { platform } = await params
  const { searchParams } = new URL(request.url)
  const baseUrl = request.nextUrl.origin
  const env = baseUrl === 'http://localhost:3000' ? 'LOCAL' : 'DEV'

  try {
    if (platform === 'kakao') {
      const code = searchParams.get('code')
      const error = searchParams.get('error')
      if (error || !code) throw new Error(error || 'no_code')

      const result = await postAuthKaKao(code, env)
      return await processAuth(result, baseUrl)
    }

    return NextResponse.redirect(new URL('/login?error=invalid_platform', baseUrl))
  } catch (error: any) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, baseUrl))
  }
}

/**
 * 3. POST 핸들러 (애플 등 Form Data 방식)
 */
export async function POST(request: NextRequest, { params }: Props) {
  const { platform } = await params
  const baseUrl = request.nextUrl.origin
  const env = baseUrl === 'http://localhost:3000' ? 'LOCAL' : 'DEV'

  try {
    if (platform === 'apple') {
      const formData = await request.formData()
      const code = formData.get('code') as string
      // 애플은 추가로 id_token, user 정보를 formData로 보낼 수 있음 (필요시 백엔드 전달)

      if (!code) throw new Error('no_code')

      const result = await postAuthApple(code)
      return await processAuth(result, baseUrl)
    }

    return NextResponse.redirect(new URL('/login?error=invalid_platform', baseUrl))
  } catch (error: any) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, baseUrl))
  }
}
