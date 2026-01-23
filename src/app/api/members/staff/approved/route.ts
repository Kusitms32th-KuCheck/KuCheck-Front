import { apiCallServer } from '@/lib/api.server'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')
    const isStaff = url.searchParams.get('isStaff')
    let endpoint = `/v1/members/staff/approved?page=${page}&size=${size}`
    if (isStaff !== null) {
      endpoint += `&isStaff=${isStaff}`
    }

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
