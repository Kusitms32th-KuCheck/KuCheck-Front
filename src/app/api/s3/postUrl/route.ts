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
    const folderName = url.searchParams.get('folderName')
    const fileName = url.searchParams.get('fileName')
    console.log('fileName', fileName)
    console.log('url', url)
    // 쿼리 파라미터로 백엔드 API URL 구성
    const endpoint = `/v1/s3/postUrl?folderName=${folderName}&fileName=${fileName}`

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
