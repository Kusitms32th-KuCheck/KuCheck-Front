import { apiCallServer } from '@/lib/api.server'

export async function PATCH(request: Request) {
  try {
    const approvalData = await request.json()

    if (!approvalData || !Array.isArray(approvalData) || approvalData.length === 0) {
      return Response.json({ error: 'Approval data array is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer(`/v1/members/staff/approvals`, {
      method: 'PATCH',
      body: JSON.stringify(approvalData),
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