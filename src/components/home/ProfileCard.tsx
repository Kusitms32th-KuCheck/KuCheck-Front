import { CalendarIcon, ProfileIcon } from '@/assets/svgComponents'
import Tag from '@/components/common/Tag'
import Link from 'next/link'

export default function ProfileCard() {
  return (
    <div className="relative flex flex-col gap-y-2 rounded-[16px] bg-white py-[11px] shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)]">
      <CalendarIcon className="absolute top-[17px] right-[17px]" width={21} height={23} />
      <section className="flex items-center gap-x-[14px] px-[18px] py-[10px]">
        <ProfileIcon width={85} height={85} />
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <p className="heading-md-semibold">이현진</p>
            <Tag type={'primary'} status={'default'}>
              프론트엔드 • 32기
            </Tag>
          </div>
          <div className="flex gap-x-2">
            <p className="body-sm-semibold text-gray-600">상벌점</p>
            <p className="body-sm-semibold text-gray-600">-3</p>
          </div>
        </div>
      </section>
      <section className="flex gap-x-[7px] px-[12px]">
        <Link
          href={'/attendance-check'}
          className="bg-primary-500 body-sm-medium flex h-[44px] w-full items-center justify-center rounded-[10px] text-white"
        >
          내 출석 확인하기
        </Link>
        <Link
          href={'/reason-for-absence'}
          className="body-sm-medium flex h-[44px] w-full items-center justify-center rounded-[10px] bg-gray-700 text-white"
        >
          불참 사유서 제출하기
        </Link>
      </section>
    </div>
  )
}
