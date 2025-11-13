import { NextRequest, NextResponse } from 'next/server'
import { apiFetchServer } from '@/lib/api.server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const month = searchParams.get('month')

    if (!year || !month) {
      return NextResponse.json({ error: 'Year and month parameters are required' }, { status: 400 })
    }

    const endpoint = `/v1/kupick/manage/update?year=${year}&month=${month}`
    const response = await apiFetchServer(endpoint, {
      method: 'GET',
    })

    if (!response.ok) {
      const errorData = await response.text()
      return NextResponse.json({ error: errorData || `HTTP Error: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data.result || data)
  } catch (error) {
    console.error('Failed to fetch kupick records:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
