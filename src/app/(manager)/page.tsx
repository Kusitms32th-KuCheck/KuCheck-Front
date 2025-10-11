'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ManagerPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/attendance')
  }, [router])

  return null
}
