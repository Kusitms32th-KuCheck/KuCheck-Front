import { apiCallServer } from '@/lib/api.server'
import { NoticeManageRequest } from '@/types/manager/notice/type'

//공지 등록
export async function POST(request: Request) {
  try {
    const sessionData: NoticeManageRequest = await request.json()

    if (!sessionData) {
      return Response.json({ error: 'Sign up data is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer('/v1/notice/manage', {
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
