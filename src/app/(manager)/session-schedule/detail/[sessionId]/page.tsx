import SessionDetail from '@/components/manager/session-schedule/session-detail/SessionDetail'
import { getSessionDetailServer } from '@/lib/manager/session'

export default async function SessionAddPage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>
  searchParams: Promise<{ date?: string }>
}) {
  const { sessionId } = await params
  const { date } = await searchParams
  console.log('SessionAddPage - received sessionId (actually sessionDetailId):', sessionId, 'date:', date)
  const sessionDetailId = Number(sessionId)
  const result = await getSessionDetailServer(sessionDetailId)
  console.log('SessionAddPage - API result:', result)
  const { data: sessionDetail } = result
  console.log('SessionAddPage - sessionDetail:', sessionDetail)
  if (!sessionDetail) {
    return (
      <main className="flex h-full flex-col overflow-visible">
        <div className="p-4 text-sm text-gray-500">Session not found.</div>
      </main>
    )
  }

  return (
    <main className="flex h-full flex-col overflow-visible">
      <SessionDetail sessionDetail={sessionDetail} date={date} />
    </main>
  )
}
