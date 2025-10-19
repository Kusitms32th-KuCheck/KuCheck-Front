import ProfileCard from '@/components/member/home/ProfileCard'
import SessionScheduleCard from '@/components/member/home/SessionScheduleCard'
import AttendanceQRCard from '@/components/member/home/AttendanceQRCard'
import NoticeCard from '@/components/member/home/NoticeCard'
import Banner from '@/components/member/home/Banner'

export default function HomePage() {
  return (
    <div className="mt-[24px] flex flex-col gap-y-[10px] px-5 pb-[40px]">
      <ProfileCard />
      <div className="flex gap-x-[10px]">
        <SessionScheduleCard />
        <AttendanceQRCard />
      </div>
      <NoticeCard />
      <Banner />
    </div>
  )
}
