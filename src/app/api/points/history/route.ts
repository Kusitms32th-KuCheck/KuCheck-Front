/**
 * POST /api/members/onboarding
 *
 * 클라이언트에서 호출하는 API 라우트
 * 서버에서 백엔드 API를 호출
 */
import { apiCallServer } from '@/lib/api.server'

export async function GET(request: Request) {
  try {
    // URL에서 쿼리 파라미터 추출
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')
    console.log('page', page)
    console.log('size', size)
    // 쿼리 파라미터로 백엔드 API URL 구성
    const endpoint = `/v1/points/history?page=${page}&size=${size}`

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
