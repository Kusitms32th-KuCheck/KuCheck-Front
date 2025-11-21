'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProfileIcon } from '@/assets/svgComponents'
import { LogoIcon, SideMenuIcon } from '@/assets/svgComponents/manager'
import ProfileModal from '../modal/ProfileModal'
import ManagerSidebar from './ManagerSidebar'
import { getClientProfile } from '@/lib/member/client/profile'

export default function ManagerHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [name, setName] = useState<string | undefined>('')

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 766)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    getClientProfile().then((res) => {
      const userData = res.data?.data
      setName(userData?.name)
    })
  }, [])

  const handleProfileClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <>
      <header className="align-center flex h-[68px] justify-between bg-white pr-[24px] pl-[24px]">
        <div className="flex items-center">
          {isMobile && (
            <button
              onClick={handleSidebarToggle}
              className="cursor-pointer mr-2"
              aria-label="사이드 메뉴 토글"
            >
              <SideMenuIcon width={24} height={24} />
            </button>
          )}
          <Link href="/attendance" className="cursor-pointer">
            <LogoIcon width={119} height={18} />
          </Link>
        </div>
        <div className="flex items-center">
          <button onClick={handleProfileClick} className="cursor-pointer">
            <ProfileIcon width={40} height={40} />
          </button>
        </div>
      </header>
      {isModalOpen && (
        <div className="fixed inset-0 z-40" onClick={handleCloseModal}>
          <div
            className="absolute top-[82px] right-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            <ProfileModal name={name} />
          </div>
        </div>
      )}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-5000"
          onClick={handleSidebarToggle}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.8)' }}
          />
          <div
            className="fixed left-0 top-0 h-full w-[240px] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <ManagerSidebar forceShow={true} onLinkClick={handleSidebarToggle} />
          </div>
        </div>
      )}
    </>
  )
}