'use client'

import { usePathname, useRouter } from 'next/navigation'
import MemberButton from '@/components/member/common/MemberButton'
import MemberInput from '@/components/member/common/MemberInput'
import { useSignUpStore } from '@/store/signUpStore'
import { formatPhoneNumber } from '@/utils/common'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function PhoneNumberField() {
  const setSignUpState = useSignUpStore((state) => state.setState)
  const signUpData = useSignUpStore((state) => state.signUpData)

  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * 휴대폰 번호 변경 event handler
   */
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setSignUpState({ ...signUpData, signUpData: { ...signUpData, phoneNumber: formatted } })
  }

  return (
    <div>
      {/* input field */}
      <section className="flex flex-col gap-y-[24px] px-5">
        <h1 className="heading-lg-semibold">휴대폰 번호를 입력해 주세요</h1>
        <MemberInput
          inputBoxStyle={'default'}
          type={'text'}
          value={signUpData?.phoneNumber ?? ''}
          placeholder={'휴대폰 번호'}
          onChange={handlePhoneNumberChange}
        />
      </section>

      {/* bottom button */}
      <section className="fixed bottom-[24px] w-full bg-white px-5">
        <MemberButton
          styleSize={'lg'}
          buttonType={'button'}
          styleType={'primary'}
          disabled={!(signUpData?.phoneNumber && signUpData?.phoneNumber?.length === 13)}
          styleStatus={signUpData?.phoneNumber && signUpData?.phoneNumber?.length === 13 ? 'default' : 'disabled'}
          onClick={() => {
            handleStepClick('3')
          }}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
