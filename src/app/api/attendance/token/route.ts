import { apiCallServer } from '@/lib/api.server'

export async function POST() {
  try {
    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer('/v1/attendance/token', {
      method: 'POST',
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
