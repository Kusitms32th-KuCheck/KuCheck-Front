'use client'

import { usePathname, useRouter } from 'next/navigation'

import MemberButton from '@/components/member/common/MemberButton'

import { useAbsenceStore } from '@/store/member/absenceStore'
import { useEffect } from 'react'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function ReasonField() {
  const router = useRouter()
  const pathname = usePathname()

  const setAbsenceState = useAbsenceStore((state) => state.setState)
  const absenceData = useAbsenceStore((state) => state.absenceData)

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  const onChangeReason = (value: string) => {
    // 100자 이상이면 100자까지만 잘라내기
    const trimmedValue = value.slice(0, 100)
    setAbsenceState({ ...absenceData, absenceData: { ...absenceData, reason: trimmedValue } })
  }

  // 스크롤 완전 차단
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div>
      {/* content */}
      <section className="flex flex-col overflow-hidden px-5 pt-[32px]">
        <textarea
          value={absenceData?.reason}
          maxLength={100}
          onChange={(e) => onChangeReason(e.target.value)}
          className="bg-background1 body-lg-medium outline-primary-400 h-[124px] w-full resize-none rounded-[12px] border border-gray-300 p-[14px]"
        />
        <div className="flex w-full justify-end">
          <p className="caption-sm-medium text-gray-400">{absenceData?.reason ? absenceData?.reason.length : 0}/100</p>
        </div>
      </section>

      {/* bottom button */}
      <section className="desktop:w-[375px] fixed bottom-0 w-full bg-white px-5 pb-[36px]">
        <MemberButton
          disabled={!absenceData?.reason}
          styleSize={'lg'}
          styleType={'primary'}
          styleStatus={absenceData?.reason && absenceData?.reason?.length > 0 ? 'default' : 'disabled'}
          onClick={() => {
            handleStepClick('4')
          }}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
