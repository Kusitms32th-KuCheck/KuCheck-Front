'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import MemberButton from '@/components/member/common/MemberButton'

import { BlueHomeLogoIcon } from '@/assets/svgComponents/member'

import { useAbsenceStore } from '@/store/member/absenceStore'

export default function SubmissionComplete() {
  const router = useRouter()
  const setState = useAbsenceStore((state) => state.setState)

  const handleStepClick = () => {
    router.push('/reason-for-absence')
  }

  useEffect(() => {
    //언마운트시 클린업
    return () => {
      setState({ absenceData: undefined, file: undefined, selectedSessionContent: undefined })
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <section className="flex flex-col items-center gap-y-[40px] px-5 pt-[32px]">
        <BlueHomeLogoIcon width={117} height={97} />
        <p className="heading-sm-semibold text-primary-500">제출이 완료되었어요</p>
      </section>

      <section className="fixed bottom-0 w-full bg-white px-5 pb-[24px]">
        <MemberButton onClick={handleStepClick}>확인</MemberButton>
      </section>
    </div>
  )
}
