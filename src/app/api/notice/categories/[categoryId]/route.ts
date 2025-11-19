import { apiCallServer } from '@/lib/api.server'

//카테고리 수정
export async function PUT(request: Request, { params }: { params: { categoryId: string } }) {
  try {
    const { name, color } = await request.json()
    const categoryId = params.categoryId

    const endpoint = `/v1/notice/categories/${categoryId}`

    const { data, error } = await apiCallServer(endpoint, {
      method: 'PUT',
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

//카테고리 삭제
export async function DELETE(request: Request, { params }: { params: { categoryId: string } }) {
  try {
    const categoryId = params.categoryId

    const endpoint = `/v1/notice/categories/${categoryId}`

    const { data, error } = await apiCallServer(endpoint, {
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
