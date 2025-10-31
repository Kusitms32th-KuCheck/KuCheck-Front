'use client'

import { ChevronRightIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import { ReactNode, useCallback } from 'react'
import { FillCheckIcon } from '@/assets/svgComponents/member'

interface SubmitCardProps {
  isSubmit: boolean
  step: number
  title: string
  description: ReactNode
  href: string
}

export default function SubmitCard({ title, step, description, href, isSubmit }: SubmitCardProps) {
  const router = useRouter()

  // useCallback으로 함수 메모이제이션 (불필요한 재생성 방지)
  const handleNavigate = useCallback(() => {
    router.push(href)
  }, [href, router])

  return (
    <div className="bg-primary-50 flex flex-col gap-y-[16px] rounded-[16px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-[2px]">
          <p className="caption-sm-medium text-primary-500">STEP {step}</p>
          <div className="flex items-center gap-x-2">
            <h1 className={`${isSubmit ? 'text-primary-500' : ''} body-2xl-semibold`}>{title}</h1>
            {isSubmit && <FillCheckIcon width={20} height={20} />}
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
      {description}
    </div>
  )
}
