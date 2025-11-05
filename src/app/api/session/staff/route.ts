import { apiCallServer } from '@/lib/api.server'
import { SessionScheduleRequest } from '@/types/manager/session/type'

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
