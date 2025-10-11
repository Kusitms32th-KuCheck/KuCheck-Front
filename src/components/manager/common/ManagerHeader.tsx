import React from 'react'
import Link from 'next/link'
import { ProfileIcon } from '@/assets/svgComponents'
import { LogoIcon } from '@/assets/svgComponents/manager'

export default function ManagerHeader() {
  return (
    <header className="align-center flex h-[68px] justify-between bg-white pr-[37px] pl-[24px]">
      <div className="flex items-center">
        <Link href="/attendance" className="cursor-pointer">
          <LogoIcon width={119} height={18} />
        </Link>
      </div>
      <div className="flex items-center">
        <ProfileIcon width={40} height={40} />
      </div>
    </header>
  )
}
