import { formatToMonthDay } from '@/utils/common'
import { SessionCategoryType, SessionDataType } from '@/types/member/session'
import { RefObject } from 'react'
import MemberTag from '@/components/member/common/MemberTag'

interface SessionItemProps extends SessionDataType {
  isCurrent: boolean
  isPast: boolean
  isFuture: boolean
  isLast: boolean
  currentSessionRef: RefObject<HTMLDivElement | null> | null
}

export default function SessionItem({
  isCurrent,
  isPast,
  isLast,
  sessionId,
  sessionCategory,
  startDate,
  title,
  currentSessionRef,
}: SessionItemProps) {
  const switchSessionEnumTypeToContent = (sessionEnum: SessionCategoryType) => {
    const tagConfigs: Record<SessionCategoryType, { className: string; label: string }> = {
      REST: {
        className: isPast ? 'bg-gray-100 text-gray-300' : 'bg-gray-200 text-gray-600',
        label: '휴회',
      },
      CORPORATE_PROJECT: {
        className: isPast ? 'bg-gray-100 text-gray-300' : 'bg-[#FFD4D0] text-[#F95085]',
        label: '기업프로젝트',
      },
      HOLIDAY: {
        className: isPast ? 'bg-gray-100 text-gray-300' : 'bg-gray-200 text-gray-600',
        label: '공휴일',
      },
      MEETUP_PROJECT: {
        className: isPast ? 'bg-gray-100 text-gray-300' : 'bg-[#C0E3FF] text-primary-400',
        label: '밋업프로젝트',
      },
      NETWORKING: {
        className: isPast ? 'bg-gray-100 text-gray-300' : 'bg-[#ECDBFF] text-[#9F45FF]',
        label: '네트워크',
      },
    }

    const config = tagConfigs[sessionEnum]

    return (
      <MemberTag type={'secondary'} status={'default'} customClassName={config.className}>
        {config.label}
      </MemberTag>
    )
  }

  return (
    <div className="flex items-center gap-x-[24px]" key={sessionId} ref={isCurrent ? currentSessionRef : null}>
      {/* 타임라인 점과 선 */}
      <div className="relative flex h-[26px] w-[26px] items-center justify-center">
        {/* 원형 점 */}
        {isCurrent ? (
          <div className="bg-primary-100 z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full">
            <div className="bg-primary-500 h-[12px] w-[12px] rounded-full" />
          </div>
        ) : isPast ? (
          <div className="z-10 h-[12px] w-[12px] rounded-full bg-gray-200" />
        ) : (
          <div className="bg-primary-200 z-10 h-[12px] w-[12px] rounded-full" />
        )}

        {/* 세로 줄 (마지막 아이템 제외) */}
        {!isLast && (
          <div className="bg-primary-50 absolute top-2 left-1/2 h-[calc(100%+80px)] w-[2px] -translate-x-1/2" />
        )}
      </div>

      <section className="flex w-full flex-col gap-y-2 rounded-[12px] bg-white px-[26px] py-[17px]">
        <div className="flex items-center gap-x-2">
          <p className={`${isPast ? 'text-gray-200' : 'text-gray-800'} body-lg-bold`}>{formatToMonthDay(startDate)}</p>
          {switchSessionEnumTypeToContent(sessionCategory)}
        </div>
        <p className={`${isPast ? 'text-gray-200' : 'text-gray-800'} body-md-regular`}>{title}</p>
      </section>
    </div>
  )
}
