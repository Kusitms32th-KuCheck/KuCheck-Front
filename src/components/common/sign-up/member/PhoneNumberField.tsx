'use client'

import { usePathname, useRouter } from 'next/navigation'
import MemberButton from '@/components/member/common/MemberButton'
import MemberInput from '@/components/member/common/MemberInput'
import { useSignUpStore } from '@/store/signUpStore'
import { formatPhoneNumber } from '@/utils/common'
import { getPhoneNumberErrorMessage, isValidPhoneNumber } from '@/utils/sign-up'

type StepType = '1' | '2' | '3' | '4' | '5' | '6' | '7'

export default function PhoneNumberField() {
  const signUpData = useSignUpStore((state) => state.signUpData)
  const updateSignUpData = useSignUpStore((state) => state.updateSignUpData)

  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * 휴대폰 번호 변경 event handler
   */
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    updateSignUpData({ phoneNumber: formatted })
  }

  /**
   * Enter 키 입력 감지
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter 키이고 유효한 휴대폰 번호일 때만 실행
    if (e.key === 'Enter' && isValidPhoneNumber(signUpData?.phoneNumber)) {
      e.preventDefault()
      handleStepClick('3')
    }
  }

  /**
   * 다음 버튼 클릭 handler
   */
  const handleNextClick = () => {
    // 유효한 번호인지 한 번 더 확인
    if (isValidPhoneNumber(signUpData?.phoneNumber)) {
      handleStepClick('3')
    }
  }

  const errorMessage = getPhoneNumberErrorMessage(signUpData?.phoneNumber)
  const isError = errorMessage !== null
  const isValid = isValidPhoneNumber(signUpData?.phoneNumber)

  return (
    <div>
      <section className="flex flex-col gap-y-[24px] px-5">
        <h1 className="heading-lg-semibold">휴대폰 번호를 입력해 주세요</h1>

        <div>
          <MemberInput
            inputBoxStyle={'default'}
            type={'text'}
            value={signUpData?.phoneNumber ?? ''}
            placeholder={'휴대폰 번호'}
            onChange={handlePhoneNumberChange}
            onKeyDown={handleKeyDown}
          />

          {isError && signUpData?.phoneNumber && (
            <p role="alert" className="mt-2 text-sm font-medium text-red-500">
              {errorMessage}
            </p>
          )}
        </div>
      </section>

      <section className="fixed bottom-[60px] w-full bg-white px-5">
        <MemberButton
          styleSize={'lg'}
          buttonType={'button'}
          styleType={'primary'}
          disabled={!isValid}
          styleStatus={isValid ? 'default' : 'disabled'}
          onClick={handleNextClick}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
