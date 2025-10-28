'use client'

import type { Member } from '@/types/manager/member/mockData'
import { AppleIcon } from '@/assets/svgComponents/manager'

export default function StaffTableRow({
  member,
  index,
  gridTemplate,
}: {
  member: Member
  index: number
  gridTemplate?: string
}) {
  const baseBg = index % 2 === 0 ? 'bg-white' : 'bg-background1'
  const name = member.name
  const part = member.part
  const school = member.school
  const major = member.major
  const phone = member.phone

  return (
    <>
      <div
        className={`group grid cursor-default items-center gap-0`}
        style={{ gridTemplateColumns: gridTemplate ?? '200px repeat(4,1fr) 220px' }}
      >
        <div
          className={`body-lg-medium flex h-[68px] items-center border-r border-gray-200 px-[24px] text-start text-gray-900 ${baseBg} focus-within:border-primary-500 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <span className="w-full truncate">{name}</span>
        </div>

        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200 pl-3 text-gray-900 ${baseBg} group-hover:bg-gray-100`}
        >
          <span className="w-full truncate">{part}</span>
        </div>

        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 ${baseBg} focus-within:border-primary-500 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <span className="w-full truncate">{school}</span>
        </div>

        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 ${baseBg} focus-within:border-primary-500 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <span className="w-full truncate">{major}</span>
        </div>

        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 ${baseBg} focus-within:border-primary-500 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <span className="w-full truncate">{phone}</span>
        </div>

        <p
          className={`body-lg-medium flex h-[68px] items-center justify-start gap-2 px-6 text-gray-900 ${baseBg} group-hover:bg-gray-100`}
        >
          <AppleIcon width={20} height={20} />

          {member.social}
        </p>
      </div>
    </>
  )
}
