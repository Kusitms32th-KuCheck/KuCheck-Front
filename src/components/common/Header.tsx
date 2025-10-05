'use client'
import { usePathname, useRouter } from 'next/navigation'

interface HeaderProps {
  title?: string
  headerType?: 'default' | 'dynamic'
  onBack?: () => void
}

const Header = ({ title, headerType = 'default', onBack }: HeaderProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const renderHeaderType = (headerType: 'default' | 'dynamic') => {
    switch (headerType) {
      case 'dynamic':
        return <></>
      default:
        return <></>
    }
  }

  return <header className="fixed z-50 pt-[54px]">{renderHeaderType(headerType)}</header>
}
export default Header
