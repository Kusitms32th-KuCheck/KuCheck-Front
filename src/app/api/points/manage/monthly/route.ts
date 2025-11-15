import { apiCallServer } from '@/lib/api.server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month') || '11'
    const page = searchParams.get('page') || '1'
    const size = searchParams.get('size') || '10'

    const { data, error } = await apiCallServer(`/v1/points/manage/monthly?month=${month}&page=${page}&size=${size}`, {
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
