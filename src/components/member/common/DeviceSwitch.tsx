'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeviceSwitch() {
  const [isWeb, setIsWeb] = useState(false)
  const router = useRouter()

  const handleToggle = (value: boolean) => {
    setIsWeb(value)
    if (value) {
      router.push('/attendance')
    }
  }

  return (
    <div className="flex items-center justify-center">
      {/* ✅ 스위치 컨테이너 */}
      <div className="relative flex h-[30px] w-[80px] items-center rounded-full bg-gray-500 p-1 shadow-lg">
        {/* ✅ 배경 슬라이드 */}
        <div
          className={`absolute h-[24px] w-[42px] rounded-full bg-white transition-all duration-300 ${
            isWeb ? 'translate-x-[42px]' : 'translate-x-0'
          }`}
        />

        {/* ✅ 모바일 텍스트 */}
        <div
          className={`relative z-10 flex flex-1 cursor-pointer items-center justify-center pl-[4px] transition-all duration-300 ${
            !isWeb ? 'caption-sm-medium text-black' : 'caption-sm-medium text-white'
          }`}
          onClick={() => handleToggle(false)}
        >
          모바일
        </div>

        {/* ✅ 웹 텍스트 */}
        <div
          className={`relative z-10 flex flex-1 cursor-pointer items-center justify-center transition-all duration-300 ${
            isWeb ? 'caption-sm-medium text-black' : 'caption-sm-medium text-white'
          }`}
          onClick={() => handleToggle(true)}
        >
          웹
        </div>
      </div>
    </div>
  )
}
