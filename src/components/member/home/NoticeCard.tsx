'use client'

import { useRouter } from 'next/navigation'
import { ChevronRightGray600Icon } from '@/assets/svgComponents/member'

export default function NoticeCard() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-y-[6px] rounded-[16px] bg-white pt-[15px] pb-[5px] shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)]">
      <section
        onClick={() => {
          router.push('/notice')
        }}
        className="flex justify-between pr-[13px] pl-5"
      >
        <p className="body-lg-semibold">공지사항</p>
        <ChevronRightGray600Icon width={24} height={24} />
      </section>

      <div className="flex flex-col">
        <div
          onClick={() => {
            router.push('/notice/1')
          }}
          className="flex cursor-pointer flex-col gap-y-[6px] border-b border-gray-100 px-5 pt-[14px] pb-[18px]"
        >
          <p className="body-sm-medium truncate">이달의 큐픽</p>
        </div>
        <div
          onClick={() => {
            router.push('/notice/1')
          }}
          className="flex cursor-pointer flex-col gap-y-[6px] px-5 pt-[14px] pb-[18px]"
        >
          <p className="body-sm-medium truncate">[한글과컴퓨터] 한컴 AI 아카데미 3기 참여자 모집 (~11/12)</p>
        </div>
      </div>
    </div>
  )
}
