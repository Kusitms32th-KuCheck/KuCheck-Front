import { Suspense } from 'react'
import { SearchParams } from '@/types/common'

import NameField from '@/components/common/sign-up/member/NameField'
import PhoneNumberField from '@/components/common/sign-up/member/PhoneNumberField'
import SchoolField from '@/components/common/sign-up/member/SchoolField'
import MajorField from '@/components/common/sign-up/member/MajorField'
import PartField from '@/components/common/sign-up/member/PartField'
import StudentCardUploadField from '@/components/common/sign-up/member/StudentCardUploadField'
import SignUpDataSubmitModal from '@/components/common/sign-up/member/SignUpDataSubmitModal'

type StepType = '1' | '2' | '3' | '4' | '5' | '6' | '7'

function SignUpStepSwitcher({ step }: { step: StepType }) {
  if (step === '1') return <NameField />
  if (step === '2') return <PhoneNumberField />
  if (step === '3') return <SchoolField />
  if (step === '4') return <MajorField />
  if (step === '5') return <PartField />
  if (step === '6') return <StudentCardUploadField />
  if (step === '7') return <SignUpDataSubmitModal />

  return <NameField />
}

export default async function SignUpPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const step = (params.step as StepType) || '1' // 기본값

  return (
    <main className="">
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpStepSwitcher step={step} />
      </Suspense>
    </main>
  )
}
