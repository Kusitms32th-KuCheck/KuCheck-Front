'use client'

import { usePathname, useRouter } from 'next/navigation'
import MemberButton from '@/components/member/common/MemberButton'
import { PartType } from '@/types/sign-up'
import { useSignUpStore } from '@/store/signUpStore'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function PartField() {
  const setSignUpState = useSignUpStore((state) => state.setState)
  const signUpData = useSignUpStore((state) => state.signUpData)

  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  const partList: { partName: string; partEnum: PartType }[] = [
    { partName: '기획', partEnum: 'PLANNING' },
    { partName: '디자인', partEnum: 'DESIGN' },
    { partName: '프론트엔드', partEnum: 'FRONTEND' },
    { partName: '백엔드', partEnum: 'BACKEND' },
  ]

  /**
   * 파트 변경 event handler
   */
  const handlePartChange = (partEnum: PartType) => {
    setSignUpState({
      ...signUpData,
      signUpData: { ...signUpData, part: signUpData?.part === partEnum ? undefined : partEnum },
    })
  }

  return (
    <div>
      {/* input field */}
      <section className="flex flex-col gap-y-[25px] px-5">
        <h1 className="heading-lg-semibold">파트를 선택해 주세요.</h1>
        <div className="grid grid-cols-2 gap-[5px]">
          {partList.map((part) => {
            return (
              <div
                onClick={() => handlePartChange(part.partEnum)}
                key={part.partEnum}
                className={`${signUpData?.part === part.partEnum ? 'bg-primary-50 border-primary-500 border' : 'bg-background1 border border-gray-200'} flex w-full cursor-pointer items-center justify-center rounded-[12px] py-[60px]`}
              >
                {part.partName}
              </div>
            )
          })}
        </div>
      </section>

      {/* bottom button */}
      <section className="fixed bottom-[36px] w-full bg-white px-5">
        <MemberButton
          styleSize={'lg'}
          buttonType={'button'}
          styleType={'primary'}
          disabled={!signUpData?.part}
          styleStatus={signUpData?.part ? 'default' : 'disabled'}
          onClick={() => {
            handleStepClick('6')
          }}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
