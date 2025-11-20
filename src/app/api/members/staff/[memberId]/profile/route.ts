import { apiCallServer } from '@/lib/api.server'

export async function PATCH(request: Request, { params }: { params: { memberId: string } }) {
  try {
    const profileData = await request.json()
    const memberId = params.memberId 

    if (!memberId) {
      return Response.json({ error: 'Member ID is required' }, { status: 400 })
    }

    if (!profileData) {
      return Response.json({ error: 'Profile data is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer(`/v1/members/staff/${memberId}/profile`, {
      method: 'PATCH',
      body: JSON.stringify(profileData),
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
