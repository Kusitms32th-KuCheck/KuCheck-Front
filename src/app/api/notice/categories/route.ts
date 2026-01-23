import { apiCallServer } from '@/lib/api.server'

//카테고리 조회
export async function GET() {
  try {
    const endpoint = `/v1/notice/categories`

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

//카테고리 등록 보내는건 name, color
export async function POST(request: Request) {
  try {
    const { name, color } = await request.json()

    const endpoint = `/v1/notice/categories`

    const { data, error } = await apiCallServer(endpoint, {
      method: 'POST',
      body: JSON.stringify({ name, color }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
