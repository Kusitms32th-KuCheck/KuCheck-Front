import SessionList from '@/components/member/session/SessionList'
import { getSessionAfterToday } from '@/lib/member/server/session'

export default async function SessionPage() {
  const sessionResponseResult = await getSessionAfterToday()
  const sessionList = sessionResponseResult.data
  console.log('sessionResponseResult', sessionResponseResult)

  return <SessionList sessionList={sessionList} />
}
