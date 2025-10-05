import Header from '@/components/common/Header'
import { PenaltyPointIcon, RewardPointIcon, SessionNoticeBlueIcon } from '@/assets/svgComponents'

export default function AlarmPage() {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] min-h-screen w-full bg-white">
        <Header headerType="dynamic" title={'알림'} />
        <div className="h-[116px] border" />
        <div className="flex flex-col px-5">
          <section className="flex items-center gap-x-[21px] py-[14px]">
            <SessionNoticeBlueIcon width={28} height={28} />
            <div className="flex flex-col gap-y-[2px]">
              <p className="body-sm-medium">4주차 세션 공지를 확인해보세요!</p>
              <div className="caption-sm-medium flex gap-x-[6px] text-gray-400">
                <p className="">10/01</p>
                <p>12:12</p>
              </div>
            </div>
          </section>
          <section className="flex items-center gap-x-[21px] py-[14px]">
            <PenaltyPointIcon width={28} height={28} />
            <div className="flex flex-col gap-y-[2px]">
              <p className="body-sm-medium">지각으로 벌점 -1점 기록되었어요</p>
              <div className="caption-sm-medium flex gap-x-[6px] text-gray-400">
                <p className="">10/01</p>
                <p>12:12</p>
              </div>
            </div>
          </section>
          <section className="flex items-center gap-x-[21px] py-[14px]">
            <RewardPointIcon width={28} height={28} />
            <div className="flex flex-col gap-y-[2px]">
              <p className="body-sm-medium">큐포터즈 상점 등록이 완료되었어요</p>
              <div className="caption-sm-medium flex gap-x-[6px] text-gray-400">
                <p className="">10/01</p>
                <p>12:12</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
