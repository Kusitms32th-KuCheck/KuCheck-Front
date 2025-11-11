'use client'

import MemberTag from '@/components/member/common/MemberTag'
import { ChevronRightIcon, NoticeIcon } from '@/assets/svgComponents'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NoticeCard() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-y-[6px] rounded-[16px] bg-white pt-[15px] pb-[5px] shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)]">
      <section className="flex justify-between px-4">
        <div className="flex items-center gap-x-2">
          <NoticeIcon width={21} height={21} />
          <p className="body-lg-semibold">공지사항</p>
        </div>
        <Link href={'/notice'}>
          <ChevronRightIcon width={24} height={24} />
        </Link>
      </section>

      <div className="flex flex-col">
        <div
          onClick={() => {
            router.push('/notice/1')
          }}
          className="flex cursor-pointer flex-col gap-y-[6px] border-b border-gray-100 px-5 pt-[14px] pb-[18px]"
        >
          <p className="body-sm-medium">이달의 큐픽</p>
          <div className="flex gap-x-1">
            <MemberTag status={'default'} type={'round'}>
              큐픽
            </MemberTag>
          </div>
        </div>
        <div
          onClick={() => {
            router.push('/notice/1')
          }}
          className="flex cursor-pointer flex-col gap-y-[6px] px-5 pt-[14px] pb-[18px]"
        >
          <p className="body-sm-medium">[한글과컴퓨터] 한컴 AI 아카데미 3기 참여자 모집 (~11/12)</p>
          <div className="flex gap-x-1">
            <MemberTag status={'default'} type={'round'}>
              홍보
            </MemberTag>
          </div>
        </div>
      </div>
    </div>
  )
}
