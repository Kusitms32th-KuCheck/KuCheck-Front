import { apiCallServer } from '@/lib/api.server'

//공지 등록
export async function POST(request: Request) {
  try {
    // 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    const fileType = searchParams.get('fileType')

    if (!filename || !fileType) {
      return Response.json({ error: 'filename, fileType are required' }, { status: 400 })
    }

    // presigned url 발급 API 호출
    const url = `/v1/notice/manage/files?filename=${encodeURIComponent(filename)}&fileType=${encodeURIComponent(fileType)}`
    const { data, error } = await apiCallServer(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
