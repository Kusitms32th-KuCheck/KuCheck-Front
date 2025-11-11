'use client'

import { useContext, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ToastContext } from '@/components/member/common/toast/ToastContext'
import ToastItem from './ToastItem'

export default function ToastContainer() {
  const context = useContext(ToastContext)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!context || !isHydrated) return null

  return (
    <div className="desktop:w-[375px] pointer-events-none fixed bottom-[60px] z-50 flex w-full flex-col gap-2">
      <AnimatePresence mode="wait">
        {context.toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onClose={() => context.removeToast(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
