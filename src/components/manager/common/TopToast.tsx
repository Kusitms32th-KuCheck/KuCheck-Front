'use client'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface TopToastProps {
  message: string
  duration?: number
  icon?: ReactNode
}

export default function TopToast({ message, duration = 3000, icon }: TopToastProps) {
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
    <div
      aria-live="polite"
      className="pointer-events-none absolute top-3/5 left-4/7 z-50 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={`w-fit rounded-[999px] bg-gray-800 px-[24px] py-3 text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-opacity duration-400 ease-in-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="bg-primary-500 flex h-5 w-5 items-center justify-center rounded-full text-gray-800">
            {icon ?? '!'}
          </div>
          <div className="body-lg-medium">{message}</div>
        </div>
      </div>
    </div>
  )
}
