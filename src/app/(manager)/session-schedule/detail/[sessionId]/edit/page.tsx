import SessionDetailEdit from '@/components/manager/session-schedule/session-detail-edit/SessionDetailEdit'
import { getSessionDetailServer } from '@/lib/manager/session'

export default async function SessionEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>
  searchParams: Promise<{ date?: string }>
}) {
  const { sessionId } = await params
  const { date } = await searchParams
  console.log('SessionEditPage - sessionId (sessionDetailId):', sessionId, 'date:', date)

  const sessionDetailId = Number(sessionId) 
  const result = await getSessionDetailServer(sessionDetailId)
  console.log('SessionEditPage - API result:', result)
  const { data: sessionDetail } = result

  if (!sessionDetail) {
    return (
      <main className="flex h-full flex-col overflow-visible">
        <div className="p-4 text-sm text-gray-500">Session not found.</div>
      </main>
    )
  }

  return (
    <main className="flex h-full flex-col overflow-visible">
      <SessionDetailEdit
        sessionDetail={sessionDetail}
        sessionDetailId={sessionDetailId}
        sessionId={sessionDetailId} 
        date={date}
      />
    </main>
  )
}
