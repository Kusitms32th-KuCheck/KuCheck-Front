import { apiCallServer } from '@/lib/api.server'

export async function POST(request: Request) {
  try {
    // URL에서 쿼리 파라미터 추출
    const url = new URL(request.url)
    const fileName = url.searchParams.get('fileName')
    // 쿼리 파라미터로 백엔드 API URL 구성
    const endpoint = `/v1/kupick/application?fileName=${fileName}`

    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer(endpoint, {
      method: 'POST',
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
