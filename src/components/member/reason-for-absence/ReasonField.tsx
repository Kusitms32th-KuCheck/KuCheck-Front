'use client'

import { usePathname, useRouter } from 'next/navigation'

import MemberButton from '@/components/member/common/MemberButton'

import { useAbsenceStore } from '@/store/member/absenceStore'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function ReasonField() {
  const router = useRouter()
  const pathname = usePathname()

  // post data
  const setAbsenceState = useAbsenceStore((state) => state.setState)
  const absenceData = useAbsenceStore((state) => state.absenceData)

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * reason 값 변경 함수
   * @param value 입력값
   */
  const onChangeReason = (value: string) => {
    setAbsenceState({ ...absenceData, absenceData: { ...absenceData, reason: value } })
  }

  return (
    <div>
      {/* content */}
      <section className="px-5 pt-[32px]">
        <textarea
          value={absenceData?.reason}
          maxLength={100}
          onChange={(e) => onChangeReason(e.target.value)}
          className="bg-background1 body-lg-medium outline-primary-400 h-[124px] w-full rounded-[12px] border border-gray-300 p-[14px]"
        />
        <div className="flex w-full justify-end">
          <p className="caption-sm-medium text-gray-400">{absenceData?.reason ? absenceData?.reason.length : 0}/100</p>
        </div>
      </section>

      {/* bottom button */}
      <section className="fixed bottom-0 w-full bg-white px-5 pb-[36px]">
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
