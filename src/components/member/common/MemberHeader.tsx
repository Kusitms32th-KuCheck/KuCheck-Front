'use client'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { ChevronLeftBlackIcon, HomeLogoIcon, NotificationIcon, SettingIcon } from '@/assets/svgComponents'
import DeviceSwitch from '@/components/member/common/DeviceSwitch'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

interface HeaderProps {
  title?: string
  headerType?: 'default' | 'dynamic'
  headerColor?: string
  backPath?: string
  onBack?: () => void
  rightElement?: React.ReactNode
  isBottomBorder?: boolean
}

const MemberHeader = ({
  title,
  headerType = 'default',
  onBack,
  headerColor,
  rightElement,
  isBottomBorder = false,
  backPath,
}: HeaderProps) => {
  const router = useRouter()
  const [role, setRole] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const handleBack = () => {
    if (onBack) return onBack()
    if (backPath) return router.push(backPath)
    router.back()
  }

  useEffect(() => {
    try {
      const roleFromCookie = Cookies.get('role')
      setRole(roleFromCookie)
    } catch (error) {
      setRole('USER')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const renderHeaderType = (headerType: 'default' | 'dynamic') => {
    switch (headerType) {
      case 'dynamic':
        return (
          <div className={`${headerColor} relative flex h-[62px] items-center px-[7px]`}>
            <ChevronLeftBlackIcon onClick={handleBack} width={36} height={36} className="cursor-pointer" />
            <p className="body-lg-semibold absolute left-1/2 -translate-x-1/2 whitespace-nowrap">{title}</p>
            {rightElement ? rightElement : <div className="h-[36px] w-[36px]" />}
          </div>
        )
      default:
        return (
          <div className="bg-background2 flex items-center justify-between px-5 pt-4 pb-[3px]">
            <Link href={'/home'}>
              <HomeLogoIcon width={35} height={28} />
            </Link>
            <div className="flex items-center gap-x-[22px]">
              {(!isLoading && role === 'EXECUTIVE') || role === 'STAFF' || role === 'MANAGEMENT' ? (
                <DeviceSwitch />
              ) : null}
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
      className={`${isBottomBorder ? 'border-b border-gray-100' : headerType === 'default' ? 'bg-background2' : headerColor} desktop:w-[375px] fixed top-0 z-50 w-full ${headerColor}`}
      style={{ paddingTop: '54px' }}
    >
      {renderHeaderType(headerType)}
    </header>
  )
}
export default MemberHeader
