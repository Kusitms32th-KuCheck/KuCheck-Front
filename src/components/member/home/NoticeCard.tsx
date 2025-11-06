'use client'

import MemberTag from '@/components/member/common/MemberTag'
import { ChevronRightIcon, NoticeIcon } from '@/assets/svgComponents'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NoticeCard() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-y-[6px] rounded-[16px] bg-white pt-[15px] pb-[5px] shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)]">
      <div className="flex justify-between px-4">
        <div className="flex items-center gap-x-2">
          <NoticeIcon width={21} height={21} />
          <p className="body-lg-semibold">공지사항</p>
        </div>
        <Link href={'/notice'}>
          <ChevronRightIcon width={24} height={24} />
        </Link>
      </div>

      <div className="flex flex-col">
        <div
          onClick={() => {
            router.push('/notice/1')
          }}
          className="flex flex-col gap-y-[6px] border-b border-gray-100 px-5 pt-[14px] pb-[18px]"
        >
          <p className="body-sm-medium">📢 밋업 프로젝트 팀 빌딩 공지</p>
          <div className="flex gap-x-1">
            <MemberTag status={'default'} type={'round'}>
              밋업프로젝트
            </MemberTag>
            <MemberTag status={'default'} type={'round'}>
              자기소개서
            </MemberTag>
          </div>
        </div>
        <div
          onClick={() => {
            router.push('/notice/1')
          }}
          className="flex flex-col gap-y-[6px] px-5 pt-[14px] pb-[18px]"
        >
          <p className="body-sm-medium">🔥 1차 스프린트 안내 🔥</p>
          <div className="flex gap-x-1">
            <MemberTag status={'default'} type={'round'}>
              밋업프로젝트
            </MemberTag>
            <MemberTag status={'default'} type={'round'}>
              유의사항
            </MemberTag>
            <MemberTag status={'default'} type={'round'}>
              제출방법
            </MemberTag>
            <MemberTag status={'default'} type={'round'}>
              제출방법
            </MemberTag>
          </div>
        </div>
      </div>
    </div>
  )
}
