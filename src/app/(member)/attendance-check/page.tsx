import QRcode from '@/components/member/attendance/QRcode'
import UserSummaryCard from '@/components/member/attendance/UserSummaryCard'

import { postServerAttendanceToken } from '@/lib/member/server/attendance'
import MemberHeader from '@/components/member/common/MemberHeader'

export const dynamic = 'force-dynamic'

export default async function AttendanceCheckPage() {
  const result = await postServerAttendanceToken()
  return (
    <>
      <MemberHeader headerType="dynamic" title={'출석체크'} headerColor={'bg-background1'} />
      <div className="h-[116px]" />
      <div className="mt-[40px] flex flex-col items-center justify-center gap-y-[60px] px-5">
        <QRcode expAt={result.data?.expAt} token={result.data?.token} />
        <UserSummaryCard
          name={result.data?.name}
          school={result.data?.school}
          part={result.data?.part}
          profileImageUrl={result.data?.profileImageUrl}
        />
      </div>
    </>
  )
}
