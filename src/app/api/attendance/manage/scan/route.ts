import { apiCallServer } from '@/lib/api.server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body

    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer('/v1/attendance/manage/scan', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    console.error('Server error:', error)
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
