import { redirect } from 'next/navigation'
import SessionNone from '@/components/manager/session-schedule/SessionNone'
import { getSessionScheduleServer } from '@/lib/manager/session'

export default async function SessionSchedulePage() {
  // 저장된 세션이 있는지 확인
  const result = await getSessionScheduleServer(1, 10)
  console.log('SessionSchedulePage - session check result:', result)
  
  // 세션이 있으면 편집 페이지로 리디렉션
  const hasSession = result.success && result.data && result.data.length > 0
  if (hasSession) {
    redirect('/session-schedule/edit')
  }

  return (
    <div style={{ height: 'calc(100% - 120px)' }}>
      <SessionNone />
    </div>
  )
}
