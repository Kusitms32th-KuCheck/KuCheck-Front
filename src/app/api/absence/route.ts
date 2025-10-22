/**
 * POST /api/absence
 *
 * 클라이언트에서 호출하는 API 라우트
 * 서버에서 백엔드 API를 호출
 */
import { apiCallServer } from '@/lib/api.server'
import { SignUpDataType } from '@/types/sign-up'

export async function POST(request: Request) {
  try {
    const signUpData: SignUpDataType = await request.json()

    if (!signUpData) {
      return Response.json({ error: 'Sign up data is required' }, { status: 400 })
    }

    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer('/v1/absence', {
      method: 'POST',
      body: JSON.stringify(signUpData),
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
