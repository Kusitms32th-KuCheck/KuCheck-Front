'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ProfileIcon } from '@/assets/svgComponents'
import { LogoIcon } from '@/assets/svgComponents/manager'
import ProfileModal from '../modal/ProfileModal'

export default function ManagerHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProfileClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <header className="align-center flex h-[68px] justify-between bg-white pr-[37px] pl-[24px]">
        <div className="flex items-center">
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
          <div onClick={(e) => e.stopPropagation()}>
            <ProfileModal />
          </div>
        </div>
      )}
    </>
  )
}
