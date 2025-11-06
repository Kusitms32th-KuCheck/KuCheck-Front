import { apiCallServer } from '@/lib/api.server'
import { SessionDetailImageRequest, SessionDetailImageResponse } from '@/types/manager/session/type'

export async function POST(request: Request) {
  try {
    const uploadData: SessionDetailImageRequest = await request.json()

    if (!uploadData || !uploadData.sessionDetailId || !uploadData.imageFileName?.length) {
      return Response.json({ error: 'Session detail ID and image file names are required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer<SessionDetailImageResponse[]>('/v1/session/staff/detail/image', {
      method: 'POST',
      body: JSON.stringify(uploadData),
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
