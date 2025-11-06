'use client'

import { useRouter } from 'next/navigation'

import MemberTag from '@/components/member/common/MemberTag'

export default function NoticeCard() {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push('/notice/1')
      }}
      className="flex items-end gap-x-[15px] border-b border-gray-200 py-[20px]"
    >
      <section className="flex flex-col">
        <div className="flex flex-col gap-y-[18px]">
          <div className="flex flex-col gap-y-[10px]">
            <MemberTag status={'default'} type={'category'} customClassName="bg-[#EFEAFF] text-[#6B42E0] ">
              밋업
            </MemberTag>
            <div className="flex flex-col gap-y-[6px]">
              <p className="body-lg-medium">🔥1차 스프린트 안내🔥</p>
              <p className="body-sm-regular">
                📌9/28(일) 12:00 PM(낮 12시, 정오)까지 (미제출 시 팀 임의 배정) 🔗 팀빌딩...
              </p>
            </div>
          </div>

          <p className="caption-sm-medium text-gray-400">2024/10/01</p>
        </div>
      </section>
      <div className="relative flex h-[95px] w-[95px] shrink-0 rounded-[6px] border border-gray-200 whitespace-nowrap">
        <>
          <div className="absolute right-[7px] bottom-1 z-10 flex h-[14px] w-[14px] items-center justify-center rounded-[3px] bg-[#3A4047] text-white">
            <p className="font-pretendard text-[8px] font-medium text-white">2</p>
          </div>
          <div className="absolute right-1 bottom-[7px] h-[14px] w-[14px] rounded-[3px] bg-[#BDBDBD]" />
        </>
      </div>
    </div>
  )
}
