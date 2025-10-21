'use client'

import { useEffect } from 'react'

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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">문제가 발생했습니다!</h2>
      <p className="mb-6 text-gray-600">예상치 못한 오류가 발생했습니다. 다시 시도해 주세요.</p>
      <button
        onClick={
          // 세그먼트를 다시 렌더링하여 복구를 시도합니다.
          () => reset()
        }
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  )
}
