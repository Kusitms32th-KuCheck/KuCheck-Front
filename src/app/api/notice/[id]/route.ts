import { apiCallServer } from '@/lib/api.server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const noticeId = params.id

    if (!noticeId) {
      return Response.json({ error: 'Notice ID is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer(`/v1/notice/${noticeId}`, {
      method: 'GET',
    })
    console.log(noticeId, data, error)
    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
