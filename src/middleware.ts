// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { refreshAccessTokenServer } from '@/lib/auth.server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 인증이 필요한 경로만
  if (pathname.startsWith('/home')) {
    const accessToken = request.cookies.get('accessToken')?.value

    // access token이 없거나 만료되었을 가능성
    if (!accessToken) {
      console.log('미들웨어 통과')
      // 미리 refresh 시도
      const refreshResult = await refreshAccessTokenServer()

      if (refreshResult.success) {
        // 갱신된 토큰으로 새 응답 생성
        return NextResponse.next()
      } else {
        // 로그인 페이지로 리다이렉트
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/member/:path*'],
}
