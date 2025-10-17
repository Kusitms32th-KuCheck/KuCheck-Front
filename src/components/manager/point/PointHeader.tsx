'use client'

import ManagerButton from '../common/ManagerButton'
import { usePointStore } from '@/store/manager/usePointStore'

export default function PointHeader() {
  const { isEditMode, toggleEditMode } = usePointStore()

  return (
    <div className="flex flex-row items-center justify-between px-[38px] pt-8">
      <p className="heading-lg-medium">상벌점 조회</p>
      <ManagerButton onClick={toggleEditMode} styleSize="sm">
        {isEditMode ? '저장하기' : '수정하기'}
      </ManagerButton>
    </div>
  )
}
