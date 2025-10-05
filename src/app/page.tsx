import Header from '@/components/common/Header'
import ProfileCard from '@/components/home/ProfileCard'
import SessionScheduleCard from '@/components/home/SessionScheduleCard'
import AttendanceQRCard from '@/components/home/AttendanceQRCard'
import NoticeCard from '@/components/home/NoticeCard'
import Banner from '@/components/home/Banner'

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="desktop:w-[375px] bg-background2 min-h-screen">
        <Header />
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
