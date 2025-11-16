'use client'

import { ChevronRightIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import { ReactNode, useCallback } from 'react'
import { AkarIconsCircleCheckFillIcon } from '@/assets/svgComponents/member'

interface SubmitCardProps {
  isSubmit: boolean
  step: number
  title: string
  description: ReactNode
  href: string
  colorGray: boolean
}

export default function SubmitCard({ title, step, description, href, isSubmit, colorGray }: SubmitCardProps) {
  const router = useRouter()
  const handleNavigate = useCallback(() => {
    if (colorGray) return
    else router.push(href)
  }, [href, router])

  return (
    <div className={`${colorGray ? 'bg-gray-100' : 'bg-primary-50'} flex flex-col gap-y-[16px] rounded-[16px] p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-[2px]">
          <p className={`${colorGray ? 'text-gray-600' : 'text-primary-500'} caption-sm-medium`}>STEP {step}</p>
          <div className="flex items-center gap-x-2">
            <h1 className={`${isSubmit ? 'text-primary-500' : ''} body-2xl-semibold`}>{title}</h1>
            {isSubmit && <AkarIconsCircleCheckFillIcon width={24} height={24} />}
          </div>
        </div>

        <button
          onClick={handleNavigate}
          className="cursor-pointer transition-transform hover:scale-110"
          aria-label={`${title} 페이지로 이동`}
          type="button"
        >
          <ChevronRightIcon width={24} height={24} />
        </button>
      </div>
      {isSubmit ? null : description}
    </div>
  )
}
