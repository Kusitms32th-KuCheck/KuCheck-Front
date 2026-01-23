import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { postAuthKaKao, postAuthApple } from '@/lib/auth'

type Props = { params: Promise<{ platform: string }> }

/**
 * 1. 공통 인증 처리 함수
 * API 결과값을 받아 쿠키를 굽고 최종 페이지로 리다이렉트합니다.
 */
async function processAuth(result: any, baseUrl: string) {
  // 리다이렉트 시 303 상태 코드를 명시하여 POST -> GET으로 전환
  const redirect = (path: string) =>
    NextResponse.redirect(new URL(path, baseUrl), { status: 303 });

  if (!result.success) {
    console.error('Authentication failed:', result.error);
    return redirect(`/login?error=${encodeURIComponent(result.error || 'auth_failed')}`);
  }

  const { status, role, accessToken, refreshToken, hasInfo } = result;
  const cookieStore = await cookies();

  const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };

  // 1. 필수 인증 토큰/권한 쿠키 설정
  if (accessToken) cookieStore.set('accessToken', accessToken, { ...cookieOptions, httpOnly: true });
  if (refreshToken) cookieStore.set('refreshToken', refreshToken, { ...cookieOptions, httpOnly: true });
  if (role) cookieStore.set('role', role, cookieOptions);

  // 2. 미들웨어에서 사용하는 status와 hasInfo 쿠키를 반드시 구워줘야 합니다.
  if (status) cookieStore.set('status', status, cookieOptions);
  if (hasInfo !== undefined) cookieStore.set('hasInfo', String(hasInfo), cookieOptions);

  // 3. 리다이렉트 로직
  if (status === 'PENDING') {
    return redirect(hasInfo ? '/sign-up?step=7' : '/sign-up');
  }

  if (status === 'APPROVED') {
    const mainRoles = ['USER', 'MANAGEMENT', 'STAFF', 'EXECUTIVE'];
    if (mainRoles.includes(role)) return redirect('/home');
    if (role === 'GUEST') return redirect('/sign-up');
  }

  return redirect('/login?error=unexpected_status');
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
// ... 기존 import 동일
export async function POST(request: NextRequest, { params }: Props) {
  const { platform } = await params;
  const baseUrl = request.nextUrl.origin;

  try {
    if (platform === 'apple') {
      const formData = await request.formData();
      const code = formData.get('code') as string;

      if (!code) throw new Error('no_code');

      // 백엔드 호출
      const result = await postAuthApple(code);

      // 성공/실패 여부에 상관없이 processAuth에서 303 리다이렉트 처리
      return await processAuth(result, baseUrl);
    }
  } catch (error: any) {
    console.error('Apple POST Handler Error:', error);
    // 에러 발생 시에도 303으로 리다이렉트하여 405 방지
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, baseUrl),
      303
    );
  }
}
