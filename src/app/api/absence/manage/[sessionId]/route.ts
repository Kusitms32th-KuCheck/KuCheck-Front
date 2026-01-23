import { apiCallServer } from '@/lib/api.server'
import { AbsenceReportItem } from '@/types/manager/attendance/type'

export async function GET({ params }: { params: { sessionId: string } }) {
  try {
    const { sessionId } = params

    if (!sessionId) {
      return Response.json({ error: 'Session ID is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer<AbsenceReportItem[]>(`/v1/absence/manage/${sessionId}`, {
      method: 'GET',
    })

    if (error) {
      console.error('❌ API Route - Backend error:', error)
      return Response.json({ error }, { status: 400 })
    }

    console.log('✅ API Route - Successfully fetched data:', data)
    return Response.json(data)
  } catch (error) {
    console.error('❌ API Route - Internal error:', error)
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
