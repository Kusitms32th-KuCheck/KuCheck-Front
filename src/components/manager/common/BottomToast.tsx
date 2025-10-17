'use client'

import { useEffect, useState } from 'react'

interface BottomToastProps {
  message: string
  duration?: number
}

export default function BottomToast({ message, duration = 3000 }: BottomToastProps) {
  const [visible, setVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    setShouldRender(true)
    const showTimer = setTimeout(() => setVisible(true), 50)
    const hideTimer = setTimeout(() => setVisible(false), duration)
    const removeTimer = setTimeout(() => setShouldRender(false), duration + 400)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
    }
  }, [duration])

  if (!shouldRender) return null

  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div
        className={`w-[420px] rounded-full bg-gray-800 px-[16px] py-3 text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-opacity duration-400 ease-in-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="bg-primary-500 flex h-5 w-5 items-center justify-center rounded-full text-gray-800">!</div>
          <div className="body-lg-medium">{message}</div>
        </div>
      </div>
    </div>
  )
}

export const DEFAULT_SHIFT_WHEEL_MESSAGE = 'Shift 키를 누른 상태로 휠을 돌리면 좌우로 스크롤 됩니다.'
