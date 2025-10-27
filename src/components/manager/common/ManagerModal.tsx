'use client'

import { ReactNode, useEffect, useState } from 'react'

type ManagerModalProps = {
  open: boolean
  message?: ReactNode
  onCancel: () => void
  onConfirm: () => void
  customClassName?: string
  transientMessage?: ReactNode | null
  transientDuration?: number
  onTransientClose?: () => void
  confirmLabel?: string
}

export default function ManagerModal({
  open,
  message = '변경사항을 저장할까요?',
  onCancel,
  onConfirm,
  customClassName = '',
  transientMessage = null,
  transientDuration = 10000,
  onTransientClose,
  confirmLabel = '저장',
}: ManagerModalProps) {
  const [transientVisible, setTransientVisible] = useState(false)

  useEffect(() => {
    if (transientMessage) {
      setTransientVisible(true)
      const t = setTimeout(() => {
        setTransientVisible(false)
        onTransientClose?.()
      }, transientDuration)
      return () => clearTimeout(t)
    }
    setTransientVisible(false)
    return
  }, [transientMessage, transientDuration, onTransientClose])

  if (!open && !transientVisible) return null

  const isTransient = transientVisible && transientMessage

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <section
        className={`${customClassName} flex ${isTransient ? 'align-center rounded-[12px]' : 'h-[196px] justify-between rounded-[20px] px-[41px] pt-[44px] pb-6'} w-full max-w-[418px] flex-col bg-white`}
      >
        {isTransient ? (
          <div className="body-lg-medium flex w-full items-center justify-center py-3 text-gray-700">
            {transientMessage}
          </div>
        ) : (
          <>
            <div className="heading-sm-medium flex w-full items-center justify-center text-gray-700">{message}</div>
            <div className="flex gap-x-2">
              <button
                onClick={onCancel}
                className="body-2xl-semibold h-[52px] w-full cursor-pointer rounded-[12px] bg-gray-100 text-gray-600"
              >
                취소
              </button>
              <button
                onClick={onConfirm}
                className="bg-primary-500 body-2xl-semibold h-[52px] w-full cursor-pointer rounded-[12px] text-white"
              >
                {confirmLabel}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
