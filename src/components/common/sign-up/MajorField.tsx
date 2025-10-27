'use client'
import { usePathname, useRouter } from 'next/navigation'
import MemberButton from '@/components/member/common/MemberButton'
import MemberInput from '@/components/member/common/MemberInput'
import { useSignUpStore } from '@/store/signUpStore'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function MajorField() {
  const setSignUpState = useSignUpStore((state) => state.setState)
  const signUpData = useSignUpStore((state) => state.signUpData)

  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * 전공 변경 event handler
   */
  const handleMajorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpState({ ...signUpData, signUpData: { ...signUpData, major: e.target.value } })
  }

  return (
    <div>
      {/* input field */}
      <section className="flex flex-col gap-y-[24px] px-5">
        <h1 className="heading-lg-semibold">학과를 알려주세요</h1>
        <div className="flex flex-col gap-y-2">
          <MemberInput
            inputBoxStyle={'default'}
            type={'text'}
            value={signUpData?.major ?? ''}
            placeholder={'학과'}
            onChange={handleMajorChange}
          />
          <p className="body-sm-medium text-gray-400">
            복수 전공이 있다면 함께 작성해 주세요 <br />
            ex. 큐시즘학과/큐밀리학과
          </p>
        </div>
      </section>

      {/* bottom button */}
      <section className="fixed bottom-[24px] w-full bg-white px-5">
        <MemberButton
          styleSize={'lg'}
          buttonType={'button'}
          styleType={'primary'}
          disabled={!(signUpData?.major && signUpData?.major.length > 0)}
          styleStatus={signUpData?.major && signUpData?.major?.length > 0 ? 'default' : 'disabled'}
          onClick={() => {
            handleStepClick('5')
          }}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
