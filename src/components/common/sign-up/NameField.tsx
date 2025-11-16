'use client'

import { usePathname, useRouter } from 'next/navigation'
import MemberButton from '@/components/member/common/MemberButton'
import { useSignUpStore } from '@/store/signUpStore'
import MemberInput from '@/components/member/common/MemberInput'
import { useState, useCallback, useMemo } from 'react'
import { validateName } from '@/utils/sign-up'

type StepType = '1' | '2' | '3' | '4' | '5' | '6' | '7'

export default function NameField() {
  const signUpData = useSignUpStore((state) => state.signUpData)
  const updateSignUpData = useSignUpStore((state) => state.updateSignUpData)

  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = useCallback(
    (step: StepType) => {
      router.push(`${pathname}?step=${encodeURIComponent(step)}`)
    },
    [router, pathname]
  )

  /**
   * 이름 변경 event handler
   * ✅ 올바른 store 업데이트
   */
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value

      // ✅ updateSignUpData로 올바르게 업데이트
      updateSignUpData({ name: newName })

      // 실시간 검증
      if (newName.length > 0) {
        const validation = validateName(newName)
        setError(validation.error || null)
      } else {
        setError(null)
      }
    },
    [updateSignUpData]
  )

  /**
   * Enter 키 입력 감지
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && signUpData?.name && signUpData.name.length > 0) {
        e.preventDefault()
        handleStepClick('2')
      }
    },
    [signUpData?.name, handleStepClick]
  )

  /**
   * 다음 단계로 진행
   */
  const handleNextStep = useCallback(() => {
    const name = signUpData?.name ?? ''
    const validation = validateName(name)

    if (!validation.isValid) {
      setError(validation.error || '오류가 발생했습니다')
      return
    }

    setError(null)
    handleStepClick('2')
  }, [signUpData?.name, handleStepClick])

  // ✅ 버튼 활성화 상태 메모이제이션
  const isButtonEnabled = useMemo(() => validateName(signUpData?.name).isValid, [signUpData?.name])

  return (
    <div>
      <section className="flex flex-col gap-y-[24px] px-5">
        <h1 className="heading-lg-semibold">이름을 입력해주세요</h1>
        <div className="flex flex-col gap-y-2">
          <MemberInput
            inputBoxStyle="default"
            type="text"
            value={signUpData?.name ?? ''}
            placeholder="이름"
            onKeyDown={handleKeyDown}
            onChange={handleNameChange}
          />
          {error ? (
            <p role="alert" className="body-sm-medium text-red-500">
              {error}
            </p>
          ) : (
            <p className="body-sm-medium text-gray-400">성까지 포함한 이름을 입력해 주세요.</p>
          )}
        </div>
      </section>

      <section className="fixed bottom-[60px] w-full bg-white px-5">
        <MemberButton
          styleSize="lg"
          buttonType="button"
          styleType="primary"
          disabled={!isButtonEnabled}
          styleStatus={isButtonEnabled ? 'default' : 'disabled'}
          onClick={handleNextStep}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
