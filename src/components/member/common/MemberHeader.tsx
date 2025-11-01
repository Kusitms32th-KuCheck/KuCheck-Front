'use client'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { ChevronLeftBlackIcon, HomeLogoIcon, NotificationIcon, SettingIcon } from '@/assets/svgComponents'

interface HeaderProps {
  title?: string
  headerType?: 'default' | 'dynamic'
  headerColor?: string
  onBack?: () => void
  rightElement?: React.ReactNode
}

const MemberHeader = ({
  title,
  headerType = 'default',
  onBack,
  headerColor = 'bg-white',
  rightElement,
}: HeaderProps) => {
  const router = useRouter()
  const renderHeaderType = (headerType: 'default' | 'dynamic') => {
    switch (headerType) {
      case 'dynamic':
        return (
          <div className="relative flex h-[62px] items-center px-[7px]">
            <ChevronLeftBlackIcon
              onClick={onBack ? onBack : () => router.back()}
              width={36}
              height={36}
              className="cursor-pointer"
            />
            <p className="body-lg-semibold absolute left-1/2 -translate-x-1/2 whitespace-nowrap">{title}</p>
            {rightElement ? rightElement : <div className="h-[36px] w-[36px]" />}
          </div>
        )
      default:
        return (
          <div className="bg-background2 flex items-center justify-between px-5 pt-4 pb-[3px]">
            <Link href={'/public'}>
              <HomeLogoIcon width={35} height={28} />
            </Link>
            <div className="flex items-center gap-x-[22px]">
              <Link href={'/alarm'} className="flex h-[24px] w-[24px] items-center justify-center">
                <NotificationIcon width={25} height={25}></NotificationIcon>
              </Link>
              <Link href={'/setting'} className="flex h-[24px] w-[24px] items-center justify-center">
                <SettingIcon width={32} height={32}></SettingIcon>
              </Link>
            </div>
          </div>
        )
    }
  }

  return (
    <header
      className={`${headerType === 'default' ? 'bg-background2' : headerColor} desktop:w-[375px] fixed z-50 w-full pt-[54px]`}
    >
      {renderHeaderType(headerType)}
    </header>
  )
}
export default MemberHeader
