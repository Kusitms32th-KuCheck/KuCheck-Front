'use server'

import { postAuthLogout, postAuthWithDraw } from '@/lib/member/client/auth'
import { getRefreshTokenServer } from '@/lib/auth.server'
import { redirect } from 'next/navigation'

export async function handleLogoutAction() {
  try {
    const refreshToken = await getRefreshTokenServer()
    const result = await postAuthLogout(refreshToken)
    console.log('로그아웃 response:', result)

    // Route Handler로 쿠키 삭제
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/cookies`, {
      method: 'DELETE',
    })

    redirect('/')
  } catch (error) {
    console.error('로그아웃 실패:', error)
    throw error
  }
}

export async function handleWithDrawAction() {
  try {
    const refreshToken = await getRefreshTokenServer()
    const result = await postAuthWithDraw(refreshToken)
    console.log('탈퇴 response:', result)

    // Route Handler로 쿠키 삭제
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/cookies`, {
      method: 'DELETE',
    })

    redirect('/')
  } catch (error) {
    console.error('탈퇴 실패:', error)
    throw error
  }
}
