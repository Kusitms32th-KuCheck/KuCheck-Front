'use client'

import { useSearchParams } from 'next/navigation'

import MemberHeader from '@/components/member/common/MemberHeader'
import SignUpStepIndicator from '@/components/common/sign-up/SignUpStepIndicator'

export default function SignUpHeaderContainer() {
  const searchParams = useSearchParams()
  const step = searchParams.get('step')

  if (step === '7') {
    return null
  }

  return <MemberHeader headerType={'dynamic'} rightElement={<SignUpStepIndicator />} />
}
