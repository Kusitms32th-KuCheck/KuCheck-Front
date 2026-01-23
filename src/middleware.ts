import { NextRequest, NextResponse } from 'next/server'
import { refreshAccessTokenServer } from '@/lib/auth.server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookieStore = request.cookies

  // 1. 쿠키 정보 추출
  const accessToken = cookieStore.get('accessToken')?.value
  const status = cookieStore.get('status')?.value // 'PENDING' 또는 'APPROVED'
  const role = cookieStore.get('role')?.value
  const hasInfo = cookieStore.get('hasInfo')?.value === 'true'

  // --- [A] Access Token이 없는 경우 갱신 시도 ---
  if (!accessToken && !['/login', '/auth'].some(path => pathname.startsWith(path))) {
    // 특정 경로(home 등) 진입 시 토큰이 없다면 리프레시 시도
    if (pathname.startsWith('/home') || pathname.startsWith('/sign-up')) {
      const refreshResult = await refreshAccessTokenServer()
      if (!refreshResult.success) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
  }

  // --- [B] PENDING 상태인 경우: /sign-up 외 모든 경로 차단 ---
  if (status === 'PENDING') {
    // /sign-up으로 시작하는 경로는 허용, 그 외(특히 /home 등)는 리다이렉트
    if (!pathname.startsWith('/sign-up')) {
      const targetPath = hasInfo ? '/sign-up?step=7' : '/sign-up'
      return NextResponse.redirect(new URL(targetPath, request.url))
    }
    return NextResponse.next() // /sign-up 내에서의 이동은 허용
  }

  // --- [C] APPROVED 상태이며 USER 역할인 경우: 관리자급 페이지 접근 제한 ---
  if (status === 'APPROVED' && role === 'USER') {
    const restrictedPaths = [
      '/attendance',
      '/check-document',
      '/create-notice',
      '/member-management',
      '/point',
      '/session-schedule',
      '/staff-management'
    ]

    // 제한된 경로로 시작하는지 확인
    const isRestricted = restrictedPaths.some(path => pathname.startsWith(path))

    if (isRestricted) {
      // 권한이 없으므로 /home으로 리다이렉트 (또는 에러 페이지)
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }

  return NextResponse.next()
}

// 매칭 경로 설정
export const config = {
  matcher: [
    '/home/:path*',
    '/sign-up/:path*',
    '/attendance/:path*',
    '/check-document/:path*',
    '/create-notice/:path*',
    '/member-management/:path*',
    '/point/:path*',
    '/session-schedule/:path*',
    '/staff-management/:path*',
  ],
}
