'use client'

import { useState } from 'react'

import LogoutModal from '@/components/member/modal/LogoutModal'

import { handleLogoutAction } from '@/lib/member/actions/auth'
import Link from 'next/link'

export default function AccountSettingContainer() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onLogoutClick = async () => {
    setIsLoading(true)
    try {
      await handleLogoutAction()
    } catch (error) {
      console.error('로그아웃 중 오류:', error)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLogoutModalOpen && <LogoutModal onLogoutClick={onLogoutClick} setIsLogoutModalOpen={setIsLogoutModalOpen} />}
      <section className="flex flex-col gap-y-[18px] border-b border-gray-100 px-5 py-[18px]">
        <p className="caption-sm-semibold">계정설정</p>
        <div className="flex flex-col gap-y-[18px]">
          <button
            disabled={isLoading}
            onClick={() => {
              setIsLogoutModalOpen(!isLogoutModalOpen)
            }}
            className="body-lg-regular flex cursor-pointer items-start"
          >
            {isLoading ? '로그아웃 중...' : '로그아웃'}
          </button>
          <Link href={'/setting/withdraw'} className="body-lg-regular flex cursor-pointer items-start">
            탈퇴하기
          </Link>
        </div>
      </section>
    </>
  )
}
