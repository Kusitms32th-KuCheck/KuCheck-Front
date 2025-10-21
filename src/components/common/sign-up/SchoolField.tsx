'use client'

import { usePathname, useRouter } from 'next/navigation'
import MemberButton from '@/components/member/common/MemberButton'
import { useSignUpStore } from '@/store/signUpStore'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function SchoolField() {
  const router = useRouter()
  const pathname = usePathname()

  const setSignUpState = useSignUpStore((state) => state.setState)
  const signUpData = useSignUpStore((state) => state.signUpData)

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }
  return (
    <div>
      <section className="flex flex-col px-5">
        <h1 className="heading-lg-semibold">대학교를 입력해 주세요.</h1>
      </section>
      <section className="fixed bottom-[24px] w-full bg-white px-5">
        <MemberButton
          styleSize={'lg'}
          buttonType={'button'}
          styleType={'primary'}
          styleStatus={'default'}
          onClick={() => {
            handleStepClick('4')
            setSignUpState({ ...signUpData, signUpData: { ...signUpData, school: '서울대학교' } })
          }}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
