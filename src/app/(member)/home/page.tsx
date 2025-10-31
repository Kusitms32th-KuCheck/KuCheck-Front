import { getProfileSummary } from '@/lib/member/user'

import ProfileCard from '@/components/member/home/ProfileCard'
import SessionScheduleCard from '@/components/member/home/SessionScheduleCard'
import AttendanceQRCard from '@/components/member/home/AttendanceQRCard'
import NoticeCard from '@/components/member/home/NoticeCard'
import Banner from '@/components/member/home/Banner'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const result = await getProfileSummary()
  const userData = result.data

  if (!userData) {
    return (
      <div className="mt-[24px] flex flex-col gap-y-[10px] px-5 pb-[40px]">
        <div className="flex justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="mt-[24px] flex flex-col gap-y-[10px] px-5 pb-[40px]">
      <ProfileCard
        profileImage={userData.profileImage}
        name={userData?.name}
        totalPoints={userData?.totalPoints}
        part={userData?.part}
      />
      <div className="flex gap-x-[10px]">
        <SessionScheduleCard />
        <AttendanceQRCard />
      </div>
      <NoticeCard />
      <Banner />
    </div>
  )
}
