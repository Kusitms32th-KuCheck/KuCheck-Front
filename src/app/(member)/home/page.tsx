import { getProfileSummary } from '@/lib/member/user'

import ProfileCard from '@/components/member/home/ProfileCard'
import SessionScheduleCard from '@/components/member/home/SessionScheduleCard'
import AttendanceQRCard from '@/components/member/home/AttendanceQRCard'
import NoticeCard from '@/components/member/home/NoticeCard'
import Banner from '@/components/member/home/Banner'
import { getSessionThisWeek } from '@/lib/member/server/session'

export default async function HomePage() {
  const profileSummaryResult = await getProfileSummary()
  const sessionResult = await getSessionThisWeek()

  const userData = profileSummaryResult.data
  const sessionData = sessionResult.data

  return (
    <div className="mt-[24px] flex flex-col gap-y-[10px] px-5 pb-[40px]">
      <ProfileCard
        profileImage={userData?.profileImage}
        name={userData?.name}
        totalPoints={userData?.totalPoints}
        part={userData?.part}
      />
      <div className="flex gap-x-[10px]">
        <SessionScheduleCard sessionData={sessionData ? sessionData[0] : undefined} />
        <AttendanceQRCard />
      </div>
      <NoticeCard />
      <Banner />
    </div>
  )
}
