'use client'

import { usePathname, useRouter } from 'next/navigation'
import MemberButton from '@/components/member/common/MemberButton'
import { PartType } from '@/types/sign-up'
import { useSignUpStore } from '@/store/signUpStore'
import { postMembersOnboarding } from '@/lib/common'
import { useToast } from '@/components/member/common/toast/ToastContext'
import { useNativeDeviceInfo } from '@/hooks/member/useNativeDeviceInfo'
import { useNativeMessage } from '@/hooks/member/useNativeMessage'

type StepType = '1' | '2' | '3' | '4' | '5' | '6' | '7'

export default function PartField() {
  // const deviceInfo = useNativeMessage()

  const updateSignUpData = useSignUpStore((state) => state.updateSignUpData)
  const signUpData = useSignUpStore((state) => state.signUpData)

  const router = useRouter()
  const pathname = usePathname()

  const { error } = useToast()

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
    updateSignUpData({ part: signUpData?.part === partEnum ? undefined : partEnum })
  }

  /**
   * 온보딩 제출
   */
  const handleSubmit = async () => {
    // deviceId가 있으면 fcmToken 추가
    const dataToSubmit = {
      ...signUpData,
      // ...(deviceInfo?.fcmToken && { fcmToken: deviceInfo.fcmToken }),
    }

    const response = await postMembersOnboarding(dataToSubmit)
    if (response.success) {
      // handleStepClick('7')

    } else if (response.error) {
      error(`${response.error}`)
    }
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
        {/*<p>디바이스 장치: {deviceInfo?.deviceId}</p>*/}
        {/*<p>fcmToken: {deviceInfo?.fcmToken}</p>*/}
        {/*<p>platform: {deviceInfo?.platform}</p>*/}
        {/*<p>timestamp: {deviceInfo?.timestamp}</p>*/}
      </section>

      {/* bottom button */}
      <section className="fixed bottom-[60px] w-full bg-white px-5">
        <MemberButton
          styleSize={'lg'}
          buttonType={'button'}
          styleType={'primary'}
          disabled={!signUpData?.part}
          styleStatus={signUpData?.part ? 'default' : 'disabled'}
          onClick={handleSubmit}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
