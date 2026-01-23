import { apiCallServer } from '@/lib/api.server'

export async function PATCH(request: Request) {
  try {
    const staffData = await request.json()

    if (!staffData) {
      return Response.json({ error: 'Staff data is required' }, { status: 400 })
    }

    const { data, error } = await apiCallServer(`/v1/members/executive/staff`, {
      method: 'PATCH',
      body: JSON.stringify(staffData)
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