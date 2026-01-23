'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { BlueHomeLogoIcon } from '@/assets/svgComponents/member'

import { useAbsenceStore } from '@/store/member/absenceStore'

export default function SubmissionComplete() {
  const router = useRouter()
  const setState = useAbsenceStore((state) => state.setState)

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/reason-for-absence')
    }, 2000)

    return () => {
      clearTimeout(timer)
      setState({ absenceData: undefined, file: undefined, selectedSessionContent: undefined })
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <section className="flex flex-col items-center gap-y-[40px] px-5 pt-[32px]">
        <BlueHomeLogoIcon width={117} height={97} />
        <p className="heading-sm-semibold text-primary-500">제출이 완료되었어요</p>
      </section>
    </div>
  )
}
