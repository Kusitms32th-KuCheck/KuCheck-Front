'use client'

import { usePathname } from 'next/navigation'
import WriteHeader from '../common/WriteHeader'
import ManagerButton from '../common/ManagerButton'

export default function SessionHeader() {
  const pathname = usePathname() || ''
  const isAddOrDetailAdd = pathname.includes('/detail') || pathname.includes('/detail-add')

  if (isAddOrDetailAdd) {
    return <WriteHeader />
  }

  const isEditMode = false
  return (
    <div className="flex flex-row items-center justify-between px-6 pt-8">
      <p className="heading-lg-medium">세션 일정</p>
      <ManagerButton onClick={() => {}} styleSize="sm">
        {isEditMode ? '저장하기' : '수정하기'}
      </ManagerButton>
    </div>
  )
}
