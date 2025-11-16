'use client'

import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MemberTag from '@/components/member/common/MemberTag'
import { UserSummaryType } from '@/types/member/user'
import { changePartEnumToContent } from '@/utils/common'

type ProfileCardProps = UserSummaryType

export default function ProfileCard({ name, part, totalPoints, profileImage }: ProfileCardProps) {
  return (
    <div className="relative flex flex-col gap-y-2 rounded-[16px] bg-white py-[11px] shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)]">
      <section className="flex items-center gap-x-[14px] px-[18px] py-[10px]">
        {profileImage ? (
          <div className="relative h-[53px] w-[53px] flex-shrink-0">
            <Image
              src={profileImage}
              alt="프로필 사진"
              fill
              priority
              quality={75}
              sizes="85px"
              className="rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/default-profile.png'
              }}
            />
          </div>
        ) : (
          <Skeleton circle height={85} width={85} baseColor="#f3f4f6" highlightColor="#e5e7eb" />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-x-2">
            {name ? <p className="heading-sm-semibold truncate">{name}</p> : <Skeleton width={58} height={26} />}

            {part ? (
              <MemberTag type="primary" status="default">
                {changePartEnumToContent(part)}
              </MemberTag>
            ) : (
              <Skeleton width={30} height={26} />
            )}
          </div>

          <div className="flex items-center gap-x-2">
            <p className="body-sm-regular text-gray-600">상벌점</p>
            {totalPoints !== undefined ? (
              <p className="body-sm-regular text-gray-600">{totalPoints}</p>
            ) : (
              <Skeleton width={25} height={20} />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
