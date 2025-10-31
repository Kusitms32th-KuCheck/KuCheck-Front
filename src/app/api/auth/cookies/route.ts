// app/api/auth/cookies/route.ts
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

/**
 * POST /api/auth/cookies - 쿠키 설정
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accessToken, refreshToken, status, role } = body

    const cookieStore = await cookies()

    if (accessToken) {
      cookieStore.set('accessToken', accessToken, cookieOptions)
    }

    if (refreshToken) {
      cookieStore.set('refreshToken', refreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7,
      })
    }

    if (status) {
      cookieStore.set('status', status, cookieOptions)
    }

    if (role) {
      cookieStore.set('role', role, cookieOptions)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error setting cookies:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

/**
 * DELETE /api/auth/cookies - 쿠키 삭제
 */
export async function DELETE() {
  try {
    const cookieStore = await cookies()

    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    cookieStore.delete('status')
    cookieStore.delete('role')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error clearing cookies:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
