import Image from 'next/image'

import { changePartEnumToContent } from '@/utils/common'

import { BlueHomeLogoIcon } from '@/assets/svgComponents/member'

import { PartType } from '@/types/common'

interface UserSummaryCardProps {
  name: string | undefined
  school: string | undefined
  part: PartType | undefined
  profileImageUrl: string | undefined
}

export default function UserSummaryCard({ name, profileImageUrl, school, part }: UserSummaryCardProps) {
  return (
    <div className="relative w-full rounded-[12px] bg-gradient-to-r from-[#E6EDFF] to-[#CBD9FF] py-[30px] pr-[12px] pl-[20px]">
      <section className="z-10 flex items-center gap-x-[20px]">
        {/* 이미지 추가 예정*/}
        <div className="relative h-[126px] w-[105px]">
          <Image
            src={profileImageUrl ? profileImageUrl : '/common/member/mock_profile.JPG'}
            alt={'프로필'}
            fill
            className="rounded-[8px] object-cover"
          />
        </div>

        <div>
          {part ? <p className="body-sm-medium">{changePartEnumToContent(part)}</p> : null}
          <p className="heading-sm-semibold">{name}</p>
          <div className="mt-[24px] flex flex-col gap-y-1">
            <p className="caption-md-regular">2001.04.07</p>
            <p className="caption-md-regular">{school}</p>
          </div>
        </div>
      </section>
      <BlueHomeLogoIcon width={150} height={120} className="absolute top-10 right-15 opacity-10" />
    </div>
  )
}
