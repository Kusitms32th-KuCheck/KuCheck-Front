import { apiCallServer } from '@/lib/api.server'

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { memberId } = body

    if (!memberId) {
      return Response.json({ error: 'memberId is required' }, { status: 400 })
    }

    // forward full payload (includes memo) to internal API
    const { data, error } = await apiCallServer('/v1/points/manage/memo', {
      method: 'PATCH',
      body: JSON.stringify(body),
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
