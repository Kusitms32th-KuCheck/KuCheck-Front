import React from 'react'

type NoticeBottomToastProps = {
  message: string
}

export default function NoticeBottomToast({ message }: NoticeBottomToastProps) {
  if (!message) return null
  return (
    <div className="caption-sm-semibold fixed bottom-10 left-9/16 z-50 -translate-x-1/2 rounded-[8px] bg-gray-700 px-6 py-2 text-white">
      {message}
    </div>
  )
}
