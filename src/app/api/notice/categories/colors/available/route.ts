import { apiCallServer } from '@/lib/api.server'

//사용 가능한 카테고리 색상 조회
export async function GET() {
  try {
    const endpoint = `/v1/notice/categories/colors/available`

    const { data, error } = await apiCallServer(endpoint, {
      method: 'GET',
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
