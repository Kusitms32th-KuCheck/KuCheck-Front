import Link from 'next/link'

import { CalendarIcon } from '@/assets/svgComponents'

import MemberTag from '@/components/member/common/MemberTag'
import MemberButton from '@/components/member/common/MemberButton'

import { UserSummaryType } from '@/types/member/user'

import { changePartEnumToContent } from '@/utils/common'
import Image from 'next/image'

type ProfileCardProps = UserSummaryType

export default function ProfileCard({ name, part, totalPoints, profileImage }: ProfileCardProps) {
  return (
    <div className="relative flex flex-col gap-y-2 rounded-[16px] bg-white py-[11px] shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)]">
      <section className="flex items-center gap-x-[14px] px-[18px] py-[10px]">
        <div className="relative h-[85px] w-[85px]">
          <Image src={profileImage} alt={'프로필사진'} fill className="rounded-full object-cover"></Image>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <p className="heading-md-semibold">{name}</p>
            <MemberTag type={'primary'} status={'default'}>
              {changePartEnumToContent(part)}
            </MemberTag>
          </div>
          <div className="flex gap-x-2">
            <p className="body-sm-semibold text-gray-600">상벌점</p>
            <p className="body-sm-semibold text-gray-600">{totalPoints}</p>
          </div>
        </div>
      </section>
      <section className="flex gap-x-[7px] px-[12px]">
        <Link
          href={'/my-attendance'}
          className="body-sm-medium flex h-[44px] w-[127px] flex-shrink-0 items-center justify-center rounded-[10px] bg-gray-100 whitespace-nowrap"
        >
          내 출석 확인하기
        </Link>
        <Link
          className="body-sm-medium bg-primary-50 text-primary-500 flex h-[44px] w-[127px] w-full items-center justify-center rounded-[10px]"
          href={'/reason-for-absence'}
        >
          불참 사유서 제출하기
        </Link>
      </section>
    </div>
  )
}
