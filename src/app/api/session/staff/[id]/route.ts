import { apiCallServer } from '@/lib/api.server'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const sessionData = await request.json()
    const sessionId = params.id

    if (!sessionId) {
      return Response.json({ error: 'Session ID is required' }, { status: 400 })
    }

    if (!sessionData) {
      return Response.json({ error: 'Session data is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer(`/v1/session/staff/${sessionId}`, {
      method: 'PATCH',
      body: JSON.stringify(sessionData),
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