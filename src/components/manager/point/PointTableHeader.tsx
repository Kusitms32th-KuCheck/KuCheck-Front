import { VisibleDate } from '@/types/manager/point/types'
import { DropLIcon, DropRIcon } from '@/assets/svgComponents/manager'

interface PointTableHeaderProps {
  visibleDates: VisibleDate[]
  collapsedMonths: Set<string>
  onToggleMonth: (month: string) => void
  gridTemplate: string
  isScrolled: boolean
}

export default function PointTableHeader({
  visibleDates,
  collapsedMonths,
  onToggleMonth,
  gridTemplate,
  isScrolled,
}: PointTableHeaderProps) {
  return (
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
            <button
              onClick={() => onToggleMonth(item.month!)}
              className="flex items-center gap-1 rounded hover:bg-gray-100"
            >
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

      <p className="body-lg-medium px-[13px] text-end text-gray-500">9월 큐픽</p>
      <p className="body-lg-medium px-[13px] text-end text-gray-500">10월 큐픽</p>
      <p className="body-lg-medium px-[13px] text-end text-gray-500">11월 큐픽</p>
      <p className="body-lg-medium px-[13px] text-end text-gray-500">TF</p>
      <p className="body-lg-medium px-[13px] text-end text-gray-500">스터디</p>
      <p className="body-lg-medium px-[13px] text-end text-gray-500">큐포터즈</p>
      <p className="body-lg-medium px-[13px] text-end text-gray-500">운영진</p>
      <p className="body-lg-medium px-[13px] text-end text-gray-500">전화번호</p>
      <p className="body-lg-medium px-[13px] text-end text-gray-500">학교</p>
      <p className="body-lg-medium px-[13px] text-end text-gray-500">학과</p>
    </div>
  )
}
