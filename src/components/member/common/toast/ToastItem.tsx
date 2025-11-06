'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Toast } from '@/components/member/common/toast/ToastContext'
import { AlertErrorIcon, AlertInfoIcon, AlertSuccessIcon, XIcon } from '@/assets/svgComponents/member'

interface ToastItemProps {
  toast: Toast
  onClose: () => void
}

export default function ToastItem({ toast, onClose }: ToastItemProps) {
  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return

    const timer = setTimeout(onClose, toast.duration)
    return () => clearTimeout(timer)
  }, [toast.duration, onClose])

  const typeClass = {
    success: 'bg-primary-500',
    error: 'bg-sub-red',
    info: 'bg-gray-800',
    warning: 'bg-sub-red',
  }[toast.type]

  const icon = {
    success: <AlertSuccessIcon width={24} height={24} />,
    error: <AlertErrorIcon width={24} height={24} />,
    info: <AlertInfoIcon width={24} height={24} />,
    warning: <AlertErrorIcon width={24} height={24} />,
  }[toast.type]

  return (
    <motion.div
      // ✅ 초기 상태 - 아래에서 시작
      initial={{ opacity: 0, y: 100 }}
      // ✅ 진입 애니메이션 - 위로 올라오고 나타남
      animate={{ opacity: 1, y: 0 }}
      // ✅ 퇴장 애니메이션 - 아래로 내려가면서 사라짐
      exit={{ opacity: 0, y: 100 }}
      // ✅ 트랜지션 분리
      transition={{
        type: 'tween',
        duration: 0.3,
        ease: 'easeOut',
      }}
      className={`${typeClass} mx-5 flex h-[48px] w-[90%] items-center justify-between rounded-[8px] px-[10px]`}
      role="alert"
    >
      <div className="flex items-center gap-x-2">
        <span>{icon}</span>
        <span className="body-sm-medium text-white">{toast.message}</span>
      </div>
      <button onClick={onClose} className="transition-opacity hover:opacity-75">
        <XIcon width={24} height={24} />
      </button>
    </motion.div>
  )
}
