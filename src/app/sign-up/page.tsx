import { Suspense } from 'react'
import { SearchParams } from '@/types/common'

import NameField from '@/components/common/sign-up/NameField'
import PhoneNumberField from '@/components/common/sign-up/PhoneNumberField'
import SchoolField from '@/components/common/sign-up/SchoolField'
import MajorField from '@/components/common/sign-up/MajorField'
import PartField from '@/components/common/sign-up/PartField'
import StudentCardUploadField from '@/components/common/sign-up/StudentCardUploadField'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

/**
 * 'step'에 따라 올바른 컴포넌트를 반환하는 스위처 컴포넌트
 * (코드를 깔끔하게 관리하기 위해 분리)
 */
function SignUpStepSwitcher({ step }: { step: StepType }) {
  if (step === '1') return <NameField />
  if (step === '2') return <PhoneNumberField />
  if (step === '3') return <SchoolField />
  if (step === '4') return <MajorField />
  if (step === '5') return <PartField />
  if (step === '6') return <StudentCardUploadField />

  // 'step' 값이 유효하지 않을 경우 기본값으로 1단계 표시
  return <NameField />
}

export default async function SignUpPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const step = (params.step as StepType) || '1' // 기본값

  return (
    <main>
      {/* 2. 'step'에 의존하는 부분을 Suspense로 감싸줌. */}
      {/* fallback에는 로딩 중에 보여줄 UI (스피너, 스켈레톤 등)를 넣음. */}
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpStepSwitcher step={step} />
      </Suspense>
    </main>
  )
}
