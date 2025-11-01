// hooks/useUniversitySearch.ts
import { useMemo, useState } from 'react'
import { universityList } from '@/utils/sign-up'

interface UseUniversitySearchReturn {
  filteredList: string[]
  searchTerm: string
  setSearchTerm: (value: string) => void
  isLoading: boolean
}

export const useUniversitySearch = (): UseUniversitySearchReturn => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading] = useState(false)

  // useMemo로 필터링 로직을 메모이제이션 → 불필요한 재계산 방지
  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return []

    const term = searchTerm.toLowerCase()
    return universityList.filter((university) => university.toLowerCase().includes(term))
  }, [searchTerm])

  return {
    filteredList,
    searchTerm,
    setSearchTerm,
    isLoading,
  }
}
