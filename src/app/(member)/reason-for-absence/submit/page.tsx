import { Suspense } from 'react'

import SessionField from '@/components/member/reason-for-absence/SessionField'
import AttendanceTypeSelector from '@/components/member/reason-for-absence/AttendanceTypeSelector'
import ReasonField from '@/components/member/reason-for-absence/ReasonField'
import ProofDocumentUpload from '@/components/member/reason-for-absence/ProofDocumentUpload'
import FinalCheckField from '@/components/member/reason-for-absence/FinalCheckField'
import SubmissionComplete from '@/components/member/reason-for-absence/SubmissionComplete'
import MemberHeader from '@/components/member/common/MemberHeader'
import AbsenceHeader from '@/components/member/reason-for-absence/AbsenceHeader'

import { getSessionAbsenceServer } from '@/lib/member/session'

import { SessionDataType } from '@/types/member/session'
import { SearchParams } from '@/types/common'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

/**
 * 'step' 에 따라 올바른 컴포넌트를 반환하는 스위처 컴포넌트
 * (코드를 깔끔하게 관리하기 위해 분리)
 */
function ReasonForAbsenceSubmitStepSwitcher({
  step,
  sessionList,
}: {
  step: StepType
  sessionList: SessionDataType[] | undefined
}) {
  if (step === '1') return <SessionField sessionList={sessionList} />
  if (step === '2') return <AttendanceTypeSelector />
  if (step === '3') return <ReasonField />
  if (step === '4') return <ProofDocumentUpload />
  if (step === '5') return <FinalCheckField />
  if (step === '6') return <SubmissionComplete />

  // 'step' 값이 유효하지 않을 경우 기본값으로 1단계 표시
  return <SessionField sessionList={sessionList} />
}

export default async function ReasonForAbsenceSubmitPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const step = (params.step as StepType) || '1' // 기본값
  const sessionDataResponse = await getSessionAbsenceServer()

  return (
    <main className="flex flex-1 flex-col pb-30">
      {/* 2. 'step'에 의존하는 부분을 Suspense로 감싸줌. */}
      {/* fallback에는 로딩 중에 보여줄 UI (스피너, 스켈레톤 등)를 넣음. */}
      <Suspense fallback={<div>Loading...</div>}>
        {step === '6' ? null : (
          <>
            <MemberHeader headerType={'dynamic'} title={'불참 사유서 제출'} />
            {/* 헤더의 높이만큼 공간 확보 */}
            <div className="h-[117px]" />
          </>
        )}
        <AbsenceHeader />
        <ReasonForAbsenceSubmitStepSwitcher step={step} sessionList={sessionDataResponse.data?.data} />
      </Suspense>
    </main>
  )
}
