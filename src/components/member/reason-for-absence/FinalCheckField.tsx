'use client'
import { usePathname, useRouter } from 'next/navigation'
import MemberButton from '@/components/member/common/MemberButton'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function FinalCheckField() {
  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  return (
    <div>
      <section className="px-5 pt-[32px]">
        <h2 className="body-lg-semibold">세션 일시</h2>
      </section>

      <section className="fixed bottom-0 w-full bg-white px-5 pb-[24px]">
        <MemberButton
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
