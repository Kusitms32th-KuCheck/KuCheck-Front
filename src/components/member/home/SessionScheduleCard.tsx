import Link from 'next/link'

import { BarIcon, ChevronRightIcon, ScheduleIcon } from '@/assets/svgComponents'

import { ThisWeekSessionDataType } from '@/types/member/session'
import { formatToMonthDay } from '@/utils/common'

interface SessionScheduleCardProps {
  sessionData: ThisWeekSessionDataType | undefined
}

export default function SessionScheduleCard({ sessionData }: SessionScheduleCardProps) {
  /**
   * 시간 문자열에서 초(seconds)를 제거
   * @param timeString - 시간 문자열 (예: "15:02:00")
   * @returns 초가 제거된 시간 문자열 (예: "15:02")
   */
  const removeSeconds = (timeString: string | undefined) => {
    if (timeString) {
      return timeString.split(':').slice(0, 2).join(':')
    }
  }

  return (
    <div className="flex w-full flex-col justify-between gap-y-[29px] rounded-[16px] bg-white px-[14px] pt-[17px] pb-[10px] shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="flex h-[24px] w-[24px] items-center justify-center">
            <ScheduleIcon width={14} height={14} />
          </div>
          <p className="body-lg-semibold pl-[5px]">{sessionData?.title}</p>
        </div>

        <Link href={'/session'}>
          <ChevronRightIcon className="ml-[19px]" width={24} height={24} />
        </Link>
      </div>
      <div className="flex flex-col gap-y-[3px] pl-[6px]">
        <p className="caption-sm-medium text-gray-700">{sessionData?.place}</p>
        <div className="flex items-center gap-x-[6px]">
          {sessionData?.startDate && (
            <p className="caption-sm-medium text-gray-700">{formatToMonthDay(sessionData?.startDate)}</p>
          )}
          <BarIcon width={2} height={10} />
          <p className="caption-sm-medium text-gray-700">
            {removeSeconds(sessionData?.startTime)}~{removeSeconds(sessionData?.endTime)}
          </p>
        </div>
      </div>
    </div>
  )
}
