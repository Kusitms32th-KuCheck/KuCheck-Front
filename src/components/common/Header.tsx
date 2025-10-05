'use client'

import { ChevronLeftBlackIcon, HomeLogoIcon, NotificationIcon, SettingIcon } from '@/assets/svgComponents'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  title?: string
  headerType?: 'default' | 'dynamic'
  headerColor?: string
  onBack?: () => void
}

const Header = ({ title, headerType = 'default', onBack, headerColor = 'bg-white' }: HeaderProps) => {
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
          </div>
        )
      default:
        return (
          <div className="bg-background2 flex items-center justify-between px-5 pt-4 pb-[3px]">
            <Link href={'/'}>
              <HomeLogoIcon width={35} height={28} />
            </Link>
            <div className="flex items-center gap-x-[22px]">
              <Link href={'/alarm'} className="flex h-[24px] w-[24px] items-center justify-center">
                <NotificationIcon width={17} height={20}></NotificationIcon>
              </Link>
              <Link href={'/setting'} className="flex h-[24px] w-[24px] items-center justify-center">
                <SettingIcon width={17} height={19}></SettingIcon>
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
export default Header
