'use client'

import { useRouter } from 'next/navigation'
import { ChevronRightGray600Icon } from '@/assets/svgComponents/member'
import { useEffect, useState } from 'react'
import { getNotice } from '@/lib/member/client/notice'
import { NoticeType } from '@/types/member/notice'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function NoticeCard() {
  const router = useRouter()
  const [noticeData, setNoticeData] = useState<NoticeType[] | undefined>()

  const fetchNotice = async () => {
    const response = await getNotice(1, 2)

    const notices = response?.data?.data?.data
    if (Array.isArray(notices)) {
      setNoticeData(notices)
    }
  }

  useEffect(() => {
    fetchNotice()
  }, [])

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

      {noticeData ? (
        <div className="flex flex-col">
          {noticeData.map((notice, index) => (
            <div
              key={notice.id}
              onClick={() => {
                router.push(`/notice/${notice.id}`)
              }}
              className={`${index === 1 ? '' : 'border-b border-gray-100'} flex cursor-pointer flex-col gap-y-[6px] px-5 pt-[14px] pb-[18px]`}
            >
              <p className="body-sm-medium truncate">{notice.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex cursor-pointer flex-col gap-y-[6px] border-b border-gray-100 px-5 pt-[12px] pb-[16px]">
            <Skeleton width={250} height={20}></Skeleton>
          </div>
          <div className="flex cursor-pointer flex-col gap-y-[6px] px-5 pt-[12px] pb-[16px]">
            <Skeleton width={180} height={20}></Skeleton>
          </div>
        </div>
      )}
    </div>
  )
}
