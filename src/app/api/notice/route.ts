import { apiCallServer } from '@/lib/api.server'

export async function GET(request: Request) {
  try {
    // URL에서 쿼리 파라미터 추출
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')
    const categoryId = url.searchParams.get('categoryId')
    // 쿼리 파라미터로 백엔드 API URL 구성
    const endpoint = `/v1/notice?page=${page}&size=${size}${categoryId && categoryId !== '0' ? `&categoryId=${categoryId}` : ''}`

    // 서버에서 백엔드 API 호출
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
