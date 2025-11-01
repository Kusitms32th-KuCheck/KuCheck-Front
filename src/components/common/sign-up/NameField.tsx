'use client'

import { usePathname, useRouter } from 'next/navigation'
import MemberButton from '@/components/member/common/MemberButton'
import { useSignUpStore } from '@/store/signUpStore'
import MemberInput from '@/components/member/common/MemberInput'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function NameField() {
  const setSignUpState = useSignUpStore((state) => state.setState)
  const signUpData = useSignUpStore((state) => state.signUpData)

  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * 이름 변경 event handler
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpState({ ...signUpData, signUpData: { ...signUpData, name: e.target.value } })
  }

  return (
    <div>
      {/* input field */}
      <section className="flex flex-col gap-y-[24px] px-5">
        <h1 className="heading-lg-semibold">이름을 입력해주세요</h1>
        <div className="flex flex-col gap-y-2">
          <MemberInput
            inputBoxStyle={'default'}
            type={'text'}
            value={signUpData?.name ?? ''}
            placeholder={'이름'}
            onChange={handleNameChange}
          />
          <p className="body-sm-medium text-gray-400">성까지 포함한 이름을 입력해 주세요.</p>
        </div>
      </section>

      {/* bottom button */}
      <section className="fixed bottom-[36px] w-full bg-white px-5">
        <MemberButton
          styleSize={'lg'}
          buttonType={'button'}
          styleType={'primary'}
          disabled={!(signUpData?.name && signUpData?.name?.length > 0)}
          styleStatus={signUpData?.name && signUpData?.name?.length > 0 ? 'default' : 'disabled'}
          onClick={() => {
            handleStepClick('2')
          }}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
