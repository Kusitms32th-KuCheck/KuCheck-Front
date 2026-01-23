'use client'

import { useSearchParams } from 'next/navigation'

import MemberHeader from '@/components/member/common/MemberHeader'
import SignUpStepIndicator from '@/components/common/sign-up/member/SignUpStepIndicator'
import { LogoIcon } from '@/assets/svgComponents/manager'

export default function SignUpHeaderContainer() {
  const searchParams = useSearchParams()
  const step = searchParams.get('step')

  if (step === '7') {
    return null
  }

  return (
    <div >
      <div className="desktop:hidden laptop:hidden tablet:hidden">
        <MemberHeader headerType={'dynamic'} rightElement={<SignUpStepIndicator />} />
      </div>
      <div className="hidden desktop:block laptop:block tablet:block">
        <div className="flex py-[14px] px-[24px] bg-white">
          <LogoIcon width={120} height={18} />
        </div>
      </div>
    </div>
  )
}
