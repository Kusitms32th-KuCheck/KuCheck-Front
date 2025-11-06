'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import ManagerButton from '../../common/ManagerButton'
import { ArrowLeftIcon } from '@/assets/svgComponents/manager'
import { useSessionEdit } from '@/components/manager/session-schedule/session-table/SessionEditContext'

export default function WriteHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const { runSaveHandlers } = useSessionEdit()
  const [saving, setSaving] = useState(false)

  const isDetailAddPage = pathname?.includes('/detail-add')
  const [isEditMode, setIsEditMode] = useState(isDetailAddPage || false)

  const handleButtonClick = async () => {
    if (!isEditMode) {
      setIsEditMode(true)
      return
    }

    setSaving(true)
    try {
      const ok = await runSaveHandlers()
      if (ok) {
        console.log('WriteHeader: 저장 성공!')
        if (!isDetailAddPage) {
          setIsEditMode(false)
        }
      } else {
        console.log('WriteHeader: 저장 실패')
        alert('저장에 실패했습니다. 내용을 확인해 주세요.')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="align-center sticky top-0 z-10 flex h-[110px] flex-col gap-4 bg-white px-[30px] pt-[12px]">
      <button
        className="flex w-full cursor-pointer items-center justify-start gap-1"
        type="button"
        onClick={() => router.back()}
        aria-label="뒤로가기"
      >
        <ArrowLeftIcon width={16} />
        <span className="body-lg-medium text-gray-600">세션 일정</span>
      </button>
      <div className="flex w-full flex-row items-center justify-between">
        <p className="heading-lg-medium">2주차 집중 협업세션</p>
        <ManagerButton onClick={handleButtonClick} styleSize="sm">
          {saving ? '저장중...' : isEditMode ? '저장하기' : '수정하기'}
        </ManagerButton>
      </div>
    </div>
  )
}
