import { apiCallServer } from '@/lib/api.server'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const approvalData = await request.json()
    const approvalId = params.id

    if (!approvalId) {
      return Response.json({ error: 'Approval ID is required' }, { status: 400 })
    }

    if (!approvalData) {
      return Response.json({ error: 'Approval data is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer(`/v1/members/staff/approvals`, {
      method: 'PATCH',
      body: JSON.stringify({ memberId: approvalId, status: approvalData.status }),
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