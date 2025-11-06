import MemberHeader from '@/components/member/common/MemberHeader'
import SessionList from '@/components/member/session/SessionList'
import { getSession } from '@/lib/member/server/session'

export default async function SessionDetailPage() {
  const sessionResponseResult = await getSession()
  const sessionList = sessionResponseResult.data

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] bg-background1 min-h-screen w-full">
        <MemberHeader headerType="dynamic" title={'전체 세션 일정'} headerColor={'bg-background1'} />
        <div className="h-[116px]" />
        <SessionList sessionList={sessionList} />
      </div>
    </div>
  )
}
