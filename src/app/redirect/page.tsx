import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function RedirectPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const code = typeof params.code === 'string' ? params.code : null

  console.log('Received code:', code)

  // if (!code) {
  //   console.error('No code provided')
  //   redirect('/login?error=no_code')
  // }

  try {
    // 백엔드 서버에 code를 전달하여 JWT 토큰 요청
    const jwtResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code, // 카카오에서 받은 인가 코드를 그대로 전달
      }),
    })

    console.log('JWT Response status:', jwtResponse)

    if (!jwtResponse.ok) {
      const errorData = await jwtResponse.text()
      console.error('JWT Response error:', errorData)
      throw new Error('Failed to get JWT token')
    }

    const jwtData = await jwtResponse.json()
    console.log('JWT Data received:', jwtData)

    const { accessToken, refreshToken } = jwtData.data.tokens
    const { role } = jwtData.data

    // 쿠키 설정 (7일 유효)
    const cookieStore = await cookies()
    const expires = new Date(Date.now() + 604800000) // 7일

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

    console.log('Cookies set successfully, redirecting based on role:', role)

    // 권한에 따라 리다이렉트
    if (role === 'USER' || role === 'ADMIN') {
      redirect('/home')
    } else {
      redirect('/sign-up')
    }
  } catch (error) {
    console.error('Kakao login error:', error)
    // redirect('/login?error=auth_failed')
  }

  return <main></main>
}
