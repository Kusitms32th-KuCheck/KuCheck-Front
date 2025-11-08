'use client'

import { useRouter } from 'next/navigation'

import MemberTag from '@/components/member/common/MemberTag'
import Image from 'next/image'

interface NoticeCardProps {
  id: number
  title: string
  tag: string
  tagStyle?: string
  content: string
  date: string
  imageUrl?: string
}

export default function NoticeCard({
  id,
  title,
  tag,
  content,
  date,
  imageUrl,
  tagStyle = 'bg-[#EFEAFF] text-[#6B42E0]',
}: NoticeCardProps) {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push(`/notice/${id}`)
      }}
      className="flex cursor-pointer items-end gap-x-[15px] border-b border-gray-200 py-[20px]"
    >
      <section className="flex flex-col">
        <div className="flex flex-col gap-y-[18px]">
          <div className="flex flex-col gap-y-[10px]">
            <MemberTag status={'default'} type={'category'} customClassName={tagStyle}>
              {tag}
            </MemberTag>
            <div className="flex flex-col gap-y-[6px]">
              <p className="body-lg-medium">{title}</p>
              <p className="body-sm-regular line-clamp-2">{content}</p>
            </div>
          </div>

          <p className="caption-sm-medium text-gray-400">{date}</p>
        </div>
      </section>
      {imageUrl ? (
        <div className="relative flex h-[95px] w-[95px] shrink-0 rounded-[6px] border border-gray-200 whitespace-nowrap">
          <Image fill src={imageUrl} alt="이미지" className="rounded-[6px] object-cover"></Image>
          <>
            <div className="absolute right-[7px] bottom-1 z-10 flex h-[14px] w-[14px] items-center justify-center rounded-[3px] bg-[#3A4047] text-white">
              <p className="font-pretendard text-[8px] font-medium text-white">4</p>
            </div>
            <div className="absolute right-1 bottom-[7px] h-[14px] w-[14px] rounded-[3px] bg-[#BDBDBD]" />
          </>
        </div>
      ) : null}
    </div>
  )
}
