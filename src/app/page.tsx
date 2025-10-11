'use client'

import MemberHeader from '@/components/member/common/MemberHeader'
import ProfileCard from '@/components/member/home/ProfileCard'
import SessionScheduleCard from '@/components/member/home/SessionScheduleCard'
import AttendanceQRCard from '@/components/member/home/AttendanceQRCard'
import NoticeCard from '@/components/member/home/NoticeCard'
import Banner from '@/components/member/home/Banner'

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="desktop:w-[375px] bg-background2 min-h-screen">
        <MemberHeader />
        <div className="h-[100px]" />
        <div className="mt-[24px] flex flex-col gap-y-[10px] px-5 pb-[40px]">
          <ProfileCard />
          <div className="flex gap-x-[10px]">
            <SessionScheduleCard />
            <AttendanceQRCard />
          </div>
          <NoticeCard />
          <Banner />
        </div>
      </div>
    </main>
  )
}
