'use client'

import { useRouter } from 'next/navigation'
import { AbsenceNoteIcon, HomeCalendarIcon, PlayIcon, PointsIcon } from '@/assets/svgComponents/member'

export default function DirectLink() {
  const router = useRouter()
  return (
    <div className="rounded-[12px] bg-white pt-[15px] pb-5">
      <p className="body-lg-semibold px-5">바로가기</p>
      <div className="flex justify-between pt-4 pr-5 pl-4">
        <section
          onClick={() => {
            router.push('/my-attendance')
          }}
          className="flex h-[58px] w-[70px] flex-col items-center justify-between"
        >
          <PointsIcon width={34} height={34} />
          <p className="caption-sm-semibold text-gray-600">상벌점</p>
        </section>
        <section
          onClick={() => {
            router.push('/session')
          }}
          className="flex h-[58px] w-[70px] flex-col items-center justify-between"
        >
          <div className="h-[30px] w-[28px] pt-[1px]">
            <HomeCalendarIcon width={28} height={30} />
          </div>
          <p className="caption-sm-semibold text-gray-600">전체 일정</p>
        </section>
        <section
          onClick={() => {
            router.push('/ku-pick')
          }}
          className="flex h-[58px] w-[70px] flex-col items-center justify-between"
        >
          <div className="flex h-[32px] w-[32px] items-center justify-center">
            <PlayIcon width={30} height={30} />
          </div>
          <p className="caption-sm-semibold text-gray-600">큐픽</p>
        </section>
        <section
          onClick={() => {
            router.push('/reason-for-absence')
          }}
          className="flex h-[58px] w-[70px] flex-col items-center justify-between"
        >
          <AbsenceNoteIcon width={36} height={36} />
          <p className="caption-sm-semibold text-gray-600">불참사유서</p>
        </section>
      </div>
    </div>
  )
}
