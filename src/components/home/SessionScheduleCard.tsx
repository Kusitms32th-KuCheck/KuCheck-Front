import { BarIcon, ChevronRightIcon, ScheduleIcon } from '@/assets/svgComponents'
import Link from 'next/link'

export default function SessionScheduleCard() {
  return (
    <div className="flex flex-col gap-y-[29px] rounded-[16px] bg-white px-[14px] pt-[17px] pb-[10px] shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)]">
      <div className="flex items-start">
        <div className="flex h-[24px] w-[24px] items-center justify-center">
          <ScheduleIcon width={14} height={14} />
        </div>
        <p className="body-lg-semibold pl-[5px]">아이디어 발제 및 커피챗</p>
        <Link href={'/session'}>
          <ChevronRightIcon className="ml-[19px]" width={24} height={24} />
        </Link>
      </div>
      <div className="flex flex-col gap-y-[3px] pl-[6px]">
        <p className="caption-sm-medium text-gray-700">마루 180 이벤트 홀</p>
        <div className="flex items-center gap-x-[6px]">
          <p className="caption-sm-medium text-gray-700">9/22</p>
          <BarIcon width={2} height={10} />
          <p className="caption-sm-medium text-gray-700">13:00~17:00</p>
        </div>
      </div>
    </div>
  )
}
