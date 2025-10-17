import { VisibleDate } from '@/types/manager/point/types'
import { DropLIcon, DropRIcon } from '@/assets/svgComponents/manager'

type Props = {
  visibleDates: VisibleDate[]
  collapsedMonths: Set<string>
  onToggleMonth: (m: string) => void
  gridTemplate: string
  isScrolled: boolean
  contentMinWidth: string
  headerScrollRef: React.RefObject<HTMLDivElement | null>
}

export default function PointTableHeader({
  visibleDates,
  collapsedMonths,
  onToggleMonth,
  gridTemplate,
  isScrolled,
  contentMinWidth,
  headerScrollRef,
}: Props) {
  return (
    <div
      className={`mx-[38px] mt-[29px] flex rounded-t-[12px] bg-white ${isScrolled ? 'z-20 shadow-[0_6px_20px_rgba(0,0,0,0.13)]' : ''}`}
    >
      <div ref={headerScrollRef} className="scrollbar-hide overflow-x-auto">
        <div style={{ minWidth: contentMinWidth }}>
          <div
            className={`relative z-100 grid items-center py-[14px] transition-shadow duration-200 ${
              isScrolled ? 'shadow-[0_0_20px_4px_rgba(0,0,0,0.15)]' : 'border-b border-gray-200'
            }`}
            style={{ gridTemplateColumns: gridTemplate, minWidth: 'max-content' }}
          >
            <p className="body-lg-medium pl-[30px] text-start text-gray-500">이름</p>
            <p className="body-lg-medium px-[13px] text-end text-gray-500">상벌점</p>
            <p className="body-lg-medium px-[13px] text-end text-gray-500">파트</p>

            {visibleDates.map((item, index) => (
              <div key={index} className="flex items-center justify-end px-[13px]">
                {item.month ? (
                  <button onClick={() => onToggleMonth(item.month!)} className="flex cursor-pointer items-center">
                    <p
                      className={`body-lg-medium text-end ${collapsedMonths.has(item.month) ? 'text-gray-500' : 'text-gray-700'}`}
                    >
                      {item.month}
                    </p>
                    {collapsedMonths.has(item.month) ? (
                      <DropRIcon width={24} height={24} />
                    ) : (
                      <DropLIcon width={24} height={24} />
                    )}
                  </button>
                ) : (
                  <p className="body-lg-medium text-end text-gray-500">{item.date}</p>
                )}
              </div>
            ))}
            {[
              '9월 큐픽',
              '10월 큐픽',
              '11월 큐픽',
              'TF',
              '스터디',
              '큐포터즈',
              '운영진',
              '전화번호',
              '학교',
              '학과',
            ].map((label, i) => (
              <p key={label + i} className="body-lg-medium px-[13px] text-end text-gray-500">
                {label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
