import { apiCallServer } from '@/lib/api.server'
import { NoticeListResponse } from '@/types/manager/notice/type'

//공지 리스트 불러오기
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const size = searchParams.get('size')

    console.log('API route - received page:', page, 'size:', size)

    const { data, error } = await apiCallServer<NoticeListResponse>(`/v1/notice?page=${page}&size=${size}`, {
      method: 'GET',
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
