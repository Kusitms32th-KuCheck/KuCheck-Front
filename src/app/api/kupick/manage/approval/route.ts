import { apiCallServer } from '@/lib/api.server'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const kupickId = request.nextUrl.searchParams.get('kupickId')
  const approvalString = request.nextUrl.searchParams.get('approval')

  if (!kupickId || approvalString === null) {
    return Response.json({ error: 'kupickId와 approval 파라미터가 필요합니다.' }, { status: 400 })
  }

  const approval = approvalString.toLowerCase() === 'true'
  const backendUrl = `/v1/kupick/manage/approval?kupickId=${kupickId}&approval=${approval}`

  try {
    const { data, error } = await apiCallServer(backendUrl, {
      method: 'POST',
    })

    if (error) {
      return Response.json({ error: error || error || 'API 호출 실패' }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
