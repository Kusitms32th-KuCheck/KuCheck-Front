'use client'

import Header from '@/components/common/Header'
import { CameraIcon, ProfileIcon } from '@/assets/svgComponents'
import { useState } from 'react'
import LogoutModal from '@/components/modal/LogoutModal'
import { useRouter } from 'next/navigation'

export default function SettingPage() {
  const router = useRouter()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  return (
    <main className="flex items-center justify-center bg-gray-100">
      {isLogoutModalOpen && <LogoutModal setIsLogoutModalOpen={setIsLogoutModalOpen} />}
      <div className="desktop:w-[375px] min-h-screen bg-white">
        <Header headerType="dynamic" title={'설정'} />
        <div className="h-[116px]" />
        <div className="mt-3">
          <section className="flex flex-col items-center gap-y-3">
            <div className="relative h-[90px] w-[90px]">
              <ProfileIcon width={90} height={90} />
              <div className="absolute right-0 bottom-0 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-gray-100 bg-white">
                <CameraIcon width={20} height={18} />
              </div>
            </div>
            <p className="body-lg-semibold">이현진</p>
          </section>
          <section className="flex flex-col gap-y-[18px] border-b border-gray-100 px-5 py-[18px]">
            <p className="caption-sm-semibold">서비스 안내</p>
            <div className="flex flex-col gap-y-[18px]">
              <button
                onClick={() => {
                  router.push('/setting/privacy-policy')
                }}
                className="body-lg-regular flex cursor-pointer items-start"
              >
                개인정보 처리 방침
              </button>
              <button
                onClick={() => {
                  router.push('/setting/service-term')
                }}
                className="body-lg-regular flex cursor-pointer items-start"
              >
                서비스 이용 약관
              </button>
            </div>
          </section>
          <section className="flex flex-col gap-y-[18px] border-b border-gray-100 px-5 py-[18px]">
            <p className="caption-sm-semibold">계정설정</p>
            <div className="flex flex-col gap-y-[18px]">
              <button
                onClick={() => {
                  setIsLogoutModalOpen(!isLogoutModalOpen)
                }}
                className="body-lg-regular flex cursor-pointer items-start"
              >
                로그아웃
              </button>
              <button className="body-lg-regular flex cursor-pointer items-start">탈퇴하기</button>
            </div>
          </section>
          <section className="flex flex-col gap-y-[18px] px-5 py-[18px]">
            <p className="caption-sm-semibold">기타</p>
            <div className="flex flex-col gap-y-[18px]">
              <button
                onClick={() => {
                  router.push('/setting/people')
                }}
                className="body-lg-regular flex cursor-pointer items-start"
              >
                만든 사람들
              </button>
              <button className="body-lg-regular flex cursor-pointer items-start justify-between">
                <p>버전 정보</p>
                <p className="body-lg-regular text-gray-300">2.4.1</p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
