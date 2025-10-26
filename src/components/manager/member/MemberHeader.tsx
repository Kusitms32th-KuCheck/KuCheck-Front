'use client'

import ManagerButton from '../common/ManagerButton'
import { useMemberStore } from '@/store/manager/useMemberStore'

export default function MemberHeader() {
  const { isEditMode, toggleEditMode } = useMemberStore()

  return (
    <div className="flex flex-row items-center justify-between px-6 pt-[26px]">
      <p className="heading-lg-medium pl-2">학회원 관리</p>
      <div className="flex items-center gap-2">
        <ManagerButton onClick={toggleEditMode} styleSize="sm">
          {isEditMode ? '저장하기' : '수정하기'}
        </ManagerButton>
      </div>
    </div>
  )
}
