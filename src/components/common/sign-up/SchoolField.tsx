'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useCallback, useMemo } from 'react'
import MemberButton from '@/components/member/common/MemberButton'
import { useSignUpStore } from '@/store/signUpStore'
import MemberInput from '@/components/member/common/MemberInput'
import { universityList } from '@/utils/sign-up'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function SchoolField() {
  const router = useRouter()
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const setSignUpState = useSignUpStore((state) => state.setState)
  const signUpData = useSignUpStore((state) => state.signUpData)

  // 검색 결과 필터링 (useMemo로 최적화)
  const filteredUniversities = useMemo(() => {
    const searchTerm = signUpData?.school ?? ''
    if (!searchTerm.trim()) return []

    return universityList.filter((university) => university.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [signUpData?.school])

  const handleStepClick = useCallback(
    (step: StepType) => {
      router.push(`${pathname}?step=${encodeURIComponent(step)}`)
    },
    [pathname, router]
  )

  const handleSchoolChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSignUpState({
        ...signUpData,
        signUpData: { ...signUpData, school: value },
      })
      setIsDropdownOpen(true)
    },
    [signUpData, setSignUpState]
  )

  // 대학교 선택 시
  const handleUniversitySelect = useCallback(
    (university: string) => {
      setSignUpState({
        ...signUpData,
        signUpData: { ...signUpData, school: university },
      })
      setIsDropdownOpen(false)
    },
    [signUpData, setSignUpState]
  )

  const handleNext = useCallback(() => {
    handleStepClick('4')
  }, [handleStepClick])

  return (
    <div>
      <section className="flex flex-col gap-y-[24px] px-5">
        <h1 className="heading-lg-semibold">대학교를 입력해 주세요.</h1>

        {/* 검색 입력 컨테이너 */}
        <div className="relative">
          <MemberInput
            inputBoxStyle={'default'}
            type={'text'}
            value={signUpData?.school ?? ''}
            placeholder={'학교 이름 입력'}
            onChange={handleSchoolChange}
            onFocus={() => setIsDropdownOpen(true)}
          />

          {/* 드롭다운 */}
          {isDropdownOpen && (signUpData?.school ?? '').trim().length > 0 && (
            <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-[300px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {filteredUniversities.length > 0 ? (
                <>
                  {filteredUniversities.map((university) => (
                    <button
                      key={university}
                      onClick={() => handleUniversitySelect(university)}
                      className="w-full border-b border-gray-100 px-4 py-2.5 text-left transition-colors duration-150 last:border-b-0 hover:bg-gray-50"
                      type="button"
                    >
                      <span className="text-sm text-gray-700">{university}</span>
                    </button>
                  ))}
                  <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">총 {filteredUniversities.length}개</div>
                </>
              ) : (
                <div className="px-4 py-3 text-center text-sm text-gray-500">검색 결과가 없습니다.</div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="fixed bottom-[24px] w-full bg-white px-5">
        <MemberButton
          styleSize={'lg'}
          buttonType={'button'}
          styleType={'primary'}
          styleStatus={'default'}
          onClick={handleNext}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
