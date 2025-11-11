'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { BarIcon, ChevronRightIcon, ScheduleIcon } from '@/assets/svgComponents'
import { ThisWeekSessionDataType } from '@/types/member/session'
import { formatToMonthDay } from '@/utils/common'

interface SessionScheduleCardProps {
  sessionData: ThisWeekSessionDataType | undefined
}

export default function SessionScheduleCard({ sessionData }: SessionScheduleCardProps) {
  const router = useRouter()

  const removeSeconds = (timeString: string | undefined): string | undefined => {
    return timeString?.split(':').slice(0, 2).join(':')
  }

  const handleCardClick = () => {
    if (sessionData?.sessionId) {
      router.push(`/session/${sessionData.sessionId}`)
    }
  }

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      className="flex w-full cursor-pointer flex-col justify-between gap-y-[29px] rounded-[16px] bg-white px-[14px] pt-[17px] pb-[10px] shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.1)]"
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 items-start gap-x-[5px]">
          <ScheduleIcon width={15} height={15} className="mt-1 flex-shrink-0" />
          {sessionData?.title ? (
            <p className="body-lg-semibold line-clamp-2">{sessionData.title}</p>
          ) : (
            <Skeleton width={120} height={30} />
          )}
        </div>

        <Link href="/session" className="ml-2 flex-shrink-0">
          <ChevronRightIcon width={24} height={24} />
        </Link>
      </div>

      <div className="flex flex-col gap-y-[3px] pl-[6px]">
        {sessionData?.place ? (
          <p className="caption-sm-medium line-clamp-1 text-gray-700">{sessionData.place}</p>
        ) : (
          <Skeleton width={120} height={16} />
        )}

        <div className="flex items-center gap-x-[6px]">
          {sessionData?.startDate ? (
            <p className="caption-sm-medium text-gray-700">{formatToMonthDay(sessionData.startDate)}</p>
          ) : (
            <Skeleton width={40} height={16} />
          )}

          {sessionData?.startDate && <BarIcon width={2} height={10} />}

          {sessionData?.startTime && sessionData?.endTime ? (
            <p className="caption-sm-medium text-gray-700">
              {removeSeconds(sessionData.startTime)}~{removeSeconds(sessionData.endTime)}
            </p>
          ) : (
            <Skeleton width={80} height={16} />
          )}
        </div>
      </div>
    </div>
  )
}
