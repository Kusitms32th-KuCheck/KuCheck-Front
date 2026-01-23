'use client'

import { CancleIcon } from '@/assets/svgComponents/manager'
import { ImageModalProps } from '@/types/manager/check-document/types'
import { useState } from 'react'

export default function ImageModal({
  title = '',
  titles,
  images,
  footerText = '',
  onClose,
  customClassName,
  initialIndex = 0,
}: ImageModalProps & { initialIndex?: number }) {
  const [current, setCurrent] = useState(initialIndex)

  if (!images || images.length === 0) return null

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <section
        className={[
          'relative inline-flex max-h-[90vh] max-w-[1200px] min-w-[600px] flex-col rounded-[20px] bg-white p-[32px] shadow-lg',
          customClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="relative mb-[32px] flex items-center justify-center">
          <p className="heading-md-semibold text-center">
            {titles && titles[current] ? titles[current] : title || '사진'}
          </p>
          <button
            aria-label="닫기"
            onClick={() => onClose?.()}
            className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <CancleIcon width={32} height={32} />
          </button>
        </div>
        <div className="mx-auto flex w-full max-w-[90vw] justify-center">
          <div className="flex flex-col">
            <img
              src={images[current]}
              alt={titles && titles[current] ? titles[current] : title || '사진'}
              className={['max-h-[70vh] flex-1 object-contain px-[70px]'].filter(Boolean).join(' ')}
            />
            {footerText && <div className="body-2xl-regular mt-4 px-[70px] text-end text-gray-500">{footerText}</div>}
          </div>
        </div>
      </section>
    </div>
  )
}
