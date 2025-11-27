import { apiCallServer } from '@/lib/api.server'
import { SessionDetailImageRequest, SessionDetailImageResponse } from '@/types/manager/session/type'

//세션 상세정보 이미지 업로드
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

//세션 상세정보 이미지 삭제
export async function DELETE(request: Request) { 
  try {
    const deleteData: { sessionImageId: number } = await request.json()

    if (!deleteData || !deleteData.sessionImageId) {
      return Response.json({ error: 'Session image ID is required' }, { status: 400 })
    }

    const endpoint = '/v1/session/staff/detail/image'
    const { data, error } = await apiCallServer<{ success: boolean }>(endpoint, {
      method: 'DELETE',
      body: JSON.stringify(deleteData),
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}