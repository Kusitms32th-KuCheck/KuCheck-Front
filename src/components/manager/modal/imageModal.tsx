'use client'

import { useEffect, useState } from 'react'
import { CancleIcon, RightIcon, LeftIcon, ModalXIcon } from '@/assets/svgComponents/manager'
import { ImageModalProps } from '@/types/manager/check-document/types'

export default function ImageModal({
  title = '',
  titles,
  images,
  footerText = '',
  initialIndex = 0,
  onClose,
  customClassName,
}: ImageModalProps) {
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    setIndex(initialIndex ?? 0)
  }, [initialIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, images.length - 1))
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0))
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, onClose])

  if (!images || images.length === 0) return null

  const NavButton = ({
    direction,
    disabled,
    onClick,
  }: {
    direction: 'left' | 'right'
    disabled: boolean
    onClick: () => void
  }) => {
    if (images.length <= 1) return <div className="h-[48px] w-[48px]" />

    if (disabled)
      return (
        <button
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none flex h-[48px] w-[48px] items-center justify-center opacity-0"
        />
      )

    return (
      <button
        aria-label={direction === 'left' ? '이전' : '다음'}
        onClick={onClick}
        className="flex h-[48px] w-[48px] items-center justify-center text-4xl text-gray-700 hover:bg-white/20"
      >
        {direction === 'left' ? <LeftIcon width={32} height={32} /> : <RightIcon width={32} height={32} />}
      </button>
    )
  }

  const showNav = Boolean(titles)

  if (!showNav) {
    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
        <section
          className={['relative inline-flex flex-col rounded-[20px] bg-white p-[32px] shadow-lg', customClassName]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="relative flex items-center justify-center">
            <p className="heading-lg-medium text-center">{title}</p>
            <button
              aria-label="닫기"
              onClick={() => onClose?.()}
              className="absolute top-[-4] right-[-40px] text-gray-500 hover:text-gray-700"
            >
              <ModalXIcon width={32} height={32} />
            </button>
          </div>

          <div className="flex flex-col">
            <img
              src={images[index]}
              alt={title || `image-${index}`}
              className={['max-h-[70vh] object-contain'].filter(Boolean).join(' ')}
            />
            {footerText && <div className="body-2xl-regular mt-4 text-end text-gray-500">{footerText}</div>}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <section
        className={[
          'relative inline-flex max-h-[90vh] max-w-[1200px] min-w-[600px] flex-col rounded-[20px] bg-white p-[32px] shadow-lg',
          customClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="relative mb-[32px] flex items-center justify-center">
          <p className={showNav ? 'heading-md-semibold text-center' : 'heading-lg-medium text-center'}>
            {titles && titles[index]
              ? titles[index]
              : title || (index === 0 ? '신청 사진' : index === 1 ? '시청 사진' : '')}
          </p>
          <button
            aria-label="닫기"
            onClick={() => onClose?.()}
            className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <CancleIcon width={32} height={32} />
          </button>
        </div>

        <div
          className={`mx-auto flex w-full max-w-[90vw] items-center ${showNav ? 'justify-between' : 'justify-center'}`}
        >
          {showNav && (
            <NavButton direction="left" disabled={index <= 0} onClick={() => setIndex((i) => Math.max(i - 1, 0))} />
          )}
          <div className="flex flex-col">
            <img
              src={images[index]}
              alt={titles && titles[index] ? titles[index] : title || `image-${index}`}
              className={['max-h-[70vh] flex-1 object-contain px-[70px]'].filter(Boolean).join(' ')}
            />
            {footerText && (
              <div
                className={
                  showNav
                    ? 'mt-4 px-[70px] text-end text-gray-500'
                    : 'body-2xl-regular mt-4 px-[70px] text-end text-gray-500'
                }
              >
                {footerText}
              </div>
            )}
          </div>
          {showNav && (
            <NavButton
              direction="right"
              disabled={index >= images.length - 1}
              onClick={() => setIndex((i) => Math.min(i + 1, images.length - 1))}
            />
          )}
        </div>
      </section>
    </div>
  )
}
