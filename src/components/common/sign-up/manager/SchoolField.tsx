import ManagerInput from '@/components/manager/common/ManagerInput'
import { useSignUpStore } from '@/store/signUpStore'
import { useCallback, useMemo, useState } from 'react'
import { universityList } from '@/utils/sign-up'

export default function SchoolField() {
  const signUpData = useSignUpStore((state) => state.signUpData)
  const updateSignUpData = useSignUpStore((state) => state.updateSignUpData)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // 검색 결과 필터링 (useMemo로 최적화)
  const filteredUniversities = useMemo(() => {
    const searchTerm = signUpData?.school ?? ''
    if (!searchTerm.trim()) return []

    return universityList.filter((university) => university.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [signUpData?.school])

  const handleSchoolChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      updateSignUpData({ school: value })
      setIsDropdownOpen(true)
    },
    [signUpData, updateSignUpData]
  )
  // 대학교 선택 시
  const handleUniversitySelect = useCallback(
    (university: string) => {
      updateSignUpData({ school: university })

      setIsDropdownOpen(false)
    },
    [signUpData, updateSignUpData]
  )

  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="body-lg-medium">재학 중인 학교를 알려주세요</h2>
      <div className="relative">
        <ManagerInput value={signUpData?.school ?? ''} onChange={handleSchoolChange} inputBoxStyle={'default'} placeholder={'학교'} type={'text'} />
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

  )
}
