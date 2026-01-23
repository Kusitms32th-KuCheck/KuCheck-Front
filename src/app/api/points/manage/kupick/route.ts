import { apiCallServer } from '@/lib/api.server'

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { memberId, yearMonth } = body

    if (!memberId) {
      return Response.json({ error: 'memberId is required' }, { status: 400 })
    }

    if (!yearMonth) {
      return Response.json({ error: 'yearMonth is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer('/v1/points/manage/kupick', {
      method: 'PATCH',
      body: JSON.stringify({ memberId, yearMonth }),
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
