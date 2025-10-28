'use server'

import { postAuthLogout } from '@/lib/member/client/auth'
import { clearAuthCookiesServer, getRefreshTokenServer } from '@/lib/auth.server'
import { redirect } from 'next/navigation'

export async function handleLogoutAction() {
  try {
    const refreshToken = await getRefreshTokenServer()
    const result = await postAuthLogout(refreshToken)
    console.log('로그아웃 response:', result)

    await clearAuthCookiesServer()
    redirect('/')
  } catch (error) {
    console.error('로그아웃 실패:', error)
    throw error
  }
}
