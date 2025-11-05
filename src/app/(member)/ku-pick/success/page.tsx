'use client'

import { useRouter } from 'next/navigation'

import { BlueHomeLogoIcon } from '@/assets/svgComponents/member'

import MemberButton from '@/components/member/common/MemberButton'

export default function SubmitSuccess() {
  const router = useRouter()
  return (
    <div className="desktop:w-[375px] flex min-h-screen flex-col items-center justify-center bg-white">
      <section className="flex flex-col items-center gap-y-[40px] px-5 pt-[32px]">
        <BlueHomeLogoIcon width={117} height={97} />
        <p className="heading-sm-semibold text-primary-500">제출이 완료되었어요</p>
      </section>

      <section className="desktop:w-[375px] fixed bottom-0 w-full bg-white px-5 pb-[36px]">
        <MemberButton
          onClick={() => {
            router.push('/ku-pick')
          }}
        >
          확인
        </MemberButton>
      </section>
    </div>
  )
}
