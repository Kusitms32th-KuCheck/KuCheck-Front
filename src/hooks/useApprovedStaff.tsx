import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Member } from '@/types/manager/member/mockData'

export default function useApprovedStaff(page = 1, size = 10, isStaff = true) {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`https://dev.ku-check.o-r.kr/api/v1/members/staff/approved`, {
        params: { page, size, isStaff },
      })
      .then((res) => {
        setMembers(res.data.data || [])
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
        setMembers([])
      })
      .finally(() => setLoading(false))
  }, [page, size, isStaff])

  return { members, loading, error }
}
