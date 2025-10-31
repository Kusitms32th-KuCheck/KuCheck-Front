'use client'

import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'

import { BlueHomeLogoIcon } from '@/assets/svgComponents/member'

import MemberButton from '@/components/member/common/MemberButton'

interface SubmitSuccessProps {
  setIsSubmitSuccessOpen: Dispatch<SetStateAction<boolean>>
}

export default function SubmitSuccess({ setIsSubmitSuccessOpen }: SubmitSuccessProps) {
  const router = useRouter()
  return (
    <div className="fixed inset-0 z-60 flex flex-1 flex-col items-center justify-center bg-white">
      <section className="flex flex-col items-center gap-y-[40px] px-5 pt-[32px]">
        <BlueHomeLogoIcon width={117} height={97} />
        <p className="heading-sm-semibold text-primary-500">제출이 완료되었어요</p>
      </section>

      <section className="fixed bottom-0 w-full bg-white px-5 pb-[24px]">
        <MemberButton
          onClick={() => {
            setIsSubmitSuccessOpen(false)
            router.push('/ku-pick')
          }}
        >
          확인
        </MemberButton>
      </section>
    </div>
  )
}
