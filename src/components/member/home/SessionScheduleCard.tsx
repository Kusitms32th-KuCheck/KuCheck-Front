'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { ThisWeekSessionDataType } from '@/types/member/session'
import { ChevronRightGray600Icon } from '@/assets/svgComponents/member'

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
      className="flex w-full cursor-pointer flex-col justify-between rounded-[16px] bg-white pt-[17px] pr-[10px] pb-[10px] pl-5 shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.1)]"
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 items-start gap-x-[5px]">
          <p className="body-lg-semibold">이번주 세션</p>
        </div>

        <ChevronRightGray600Icon width={24} height={24} />
      </div>

      <div className="flex flex-col">
        {sessionData?.title ? (
          <p className="body-sm-medium line-clamp-2">{sessionData.title}</p>
        ) : (
          // <p className="body-sm-medium line-clamp-2">호앵앵</p>
          <Skeleton width={120} height={20} />
        )}
        <div className="flex flex-col pl-[1px]">
          {sessionData?.place ? (
            <p className="caption-sm-medium mt-[9px] line-clamp-1 text-gray-500">{sessionData.place}</p>
          ) : (
            <Skeleton width={120} height={16} />
            // <p className="caption-sm-medium mt-[9px] line-clamp-1 text-gray-500">마루 180 이벤트 홀</p>
          )}

          {sessionData?.startTime && sessionData?.endTime ? (
            <p className="caption-sm-medium mt-[1px] text-gray-500">
              {removeSeconds(sessionData.startTime)}~{removeSeconds(sessionData.endTime)}
            </p>
          ) : (
            // <p className="caption-sm-medium line-clamp-1 text-gray-500">13:00~17:00</p>
            <Skeleton width={80} height={16} />
          )}
        </div>
      </div>
    </div>
  )
}
