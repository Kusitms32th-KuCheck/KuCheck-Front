'use client'

import MemberButton from '@/components/member/common/MemberButton'
import { useSignUpStore } from '@/store/signUpStore'
import { postMembersOnboarding } from '@/lib/common'

export default function StudentCardUploadField() {
  const signUpData = useSignUpStore((state) => state.signUpData)
  return (
    <div>
      <div className="fixed bottom-[24px] w-full bg-white px-5">
        <MemberButton
          styleSize={'lg'}
          buttonType={'button'}
          styleType={'primary'}
          styleStatus={'disabled'}
          onClick={async () => {
            const response = await postMembersOnboarding(signUpData)
            console.log('response', response)
          }}
        >
          다음
        </MemberButton>
      </div>
    </div>
  )
}
