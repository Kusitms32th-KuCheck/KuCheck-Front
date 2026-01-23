import { apiCallServer } from '@/lib/api.server'

export async function GET() {
  try {
    const { data, error } = await apiCallServer('/v1/attendance/manage/weekly-summary', {
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
