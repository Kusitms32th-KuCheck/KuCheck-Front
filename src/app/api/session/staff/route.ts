import { apiCallServer } from '@/lib/api.server'
import { SessionScheduleRequest, SessionScheduleResponse } from '@/types/manager/session/type'

//세션 일정 저장
export async function POST(request: Request) {
  try {
    const sessionData: SessionScheduleRequest = await request.json()

    if (!sessionData) {
      return Response.json({ error: 'Sign up data is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer('/v1/session/staff', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}

//세션 정보 불러오기
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const size = searchParams.get('size') || '10'

    console.log('API route - received page:', page, 'size:', size)

    const { data, error } = await apiCallServer<SessionScheduleResponse>(
      `/v1/session/staff?page=${page}&size=${size}`,
      {
        method: 'GET',
      }
    )

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    console.error('Server error:', error)
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
