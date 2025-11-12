import { apiCallServer } from '@/lib/api.server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return Response.json({ error: 'Session ID is required as query parameter' }, { status: 400 })
    }

    console.log('🔍 API Route (manage) - Fetching absence data for sessionId:', sessionId)

    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer(`/v1/absence/manage/${sessionId}`, {
      method: 'GET',
    })

    if (error) {
      console.error('❌ API Route (manage) - Backend error:', error)
      return Response.json({ error }, { status: 400 })
    }

    console.log('✅ API Route (manage) - Successfully fetched data:', data)
    return Response.json(data)
  } catch (error) {
    console.error('❌ API Route (manage) - Internal error:', error)
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
