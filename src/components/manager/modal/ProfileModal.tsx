'use client'
import { LogOut } from '@/assets/svgComponents/manager'
import { useRouter } from 'next/navigation'
import { PhoneIcon } from '@/assets/svgComponents/manager'
import { handleLogoutAction } from '@/lib/member/actions/auth' // 추가

export default function ProfileModal({
  name = '김운영',
  email = 'qwerqwer@gmail.com',
  onLogout,
  onMobileView,
}: {
  name?: string
  email?: string
  onLogout?: () => void
  onMobileView?: () => void
}) {
  const router = useRouter()
  const handleMobileView = () => {
    if (onMobileView) {
      onMobileView()
    } else {
      router.push('/home')
    }
  }

  const handleLogout = async () => {
    if (onLogout) {
      onLogout()
    } else {
      await handleLogoutAction()
    }
  }

  return (
    <div
      style={{
        boxShadow: '0px 0px 12px 0px rgba(0, 0, 0, 0.15)',
      }}
      className="fixed top-[56px] right-[22px] z-50 w-[263px] rounded-[12px] bg-white px-[6px] shadow-lg"
    >
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center">
          <div className="flex w-full flex-col border-b border-gray-200 px-4 py-5">
            <p className="body-lg-medium">{name}</p>
            <p className="body-sm-medium text-gray-500">{email}</p>
          </div>
        </div>
        <button
          className="flex cursor-pointer items-center px-5 py-4"
          onClick={handleMobileView}
        >
          <PhoneIcon width={16} height={16} className="mr-3" />
          <p className="body-md-medium text-gray-700">모바일 화면으로 보기</p>
        </button>
        <button
          className="flex cursor-pointer items-center px-5 pb-4"
          onClick={handleLogout}
        >
          <LogOut width={16} height={16} className="mr-3" />
          <p className="body-md-medium text-primary-500">로그아웃</p>
        </button>
      </div>
    </div>
  )
}
