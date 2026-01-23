'use client'

import { useEffect } from 'react'
import { DangerIcon, RefreshCwIcon } from '@/assets/svgComponents/member'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void // 페이지를 다시 렌더링하는 함수
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // 에러 리포팅 서비스(Sentry 등)에 에러를 기록할 수 있습니다.
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-[25px] bg-white">
      <div className="flex flex-col items-center justify-center">
        <DangerIcon width={24} height={24} />
        <h2 className="body-lg-regular mt-[7px] text-gray-500">문제가 발생했어요!</h2>
        <p className="caption-sm-medium mt-[8px] text-center text-gray-400">
          예상치 못한 오류가 발생했습니다. <br />
          다시 시도해 주세요.
        </p>
      </div>

      <button
        onClick={
          // 세그먼트를 다시 렌더링하여 복구를 시도합니다.
          () => reset()
        }
        className="caption-sm-semibold flex gap-x-2 rounded-full border border-gray-300 px-3 py-2 text-gray-400"
      >
        <RefreshCwIcon width={16} height={16} />
        다시 시도
      </button>
    </div>
  )
}
