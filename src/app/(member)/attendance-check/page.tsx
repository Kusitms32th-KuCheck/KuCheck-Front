import QRcode from '@/components/member/attendance/QRcode'
import UserSummaryCard from '@/components/member/attendance/UserSummaryCard'

import { postServerAttendanceToken } from '@/lib/member/server/attendance'

export default async function AttendanceCheckPage() {
  const result = await postServerAttendanceToken()

  return (
    <div className="mt-[40px] flex flex-col items-center justify-center gap-y-[60px] px-5">
      <QRcode expAt={result.data?.expAt} token={result.data?.token} />
      <UserSummaryCard
        name={result.data?.name}
        school={result.data?.school}
        part={result.data?.part}
        profileImageUrl={result.data?.profileImageUrl}
      />
    </div>
  )
}
