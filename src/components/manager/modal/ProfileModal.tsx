'use client'
import { LogOutIcon } from '@/assets/svgComponents'
// import { getProfileSummary } from '@/lib/member/user'

export default async function ProfileModal() {
  // const userData = await getProfileSummary()

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
            {/* <p className="body-lg-medium">{userData.data?.name}</p>
            <p className="body-sm-medium text-gray-500">{userData.data?.name}</p> */}
          </div>
        </div>

        <button className="flex cursor-pointer items-center px-5 py-4">
          <LogOutIcon width={16} height={16} className="mr-3" />
          <p className="body-md-medium text-gray-700">로그아웃</p>
        </button>
      </div>
    </div>
  )
}
