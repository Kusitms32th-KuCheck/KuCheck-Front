import { apiCallServer } from '@/lib/api.server'
import { NoticeManageRequest } from '@/types/manager/notice/type'

//공지 수정
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const noticeData: NoticeManageRequest = await request.json()
    const noticeId = params.id

    if (!noticeId) {
      return Response.json({ error: 'Notice ID is required' }, { status: 400 })
    }

    if (!noticeData) {
      return Response.json({ error: 'Notice data is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer(`/v1/notice/manage/${noticeId}`, {
      method: 'PUT',
      body: JSON.stringify(noticeData),
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}

//공지 삭제
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const noticeId = params.id

    if (!noticeId) {
      return Response.json({ error: 'Notice ID is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer(`/v1/notice/manage/${noticeId}`, {
      method: 'DELETE',
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
