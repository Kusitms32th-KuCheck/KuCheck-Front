'use client'

import React, { useState } from 'react'
import ManagerButton from '../common/ManagerButton'
import { useMemberStore } from '@/store/manager/useMemberStore'
import { NewIcon } from '@/assets/svgComponents/manager'

export default function MemberHeader() {
  const { isEditMode, toggleEditMode } = useMemberStore()
  const [pendingApprovals, setPendingApprovals] = useState<number>(2)

  return (
    <div className="flex flex-row items-center justify-between px-6 pt-[26px]">
      <p className="heading-lg-medium pl-2">학회원 관리</p>
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            className={`body-sm-medium text-primary-500 flex cursor-pointer items-center rounded-[4px] bg-white px-3 py-2`}
            onClick={() => console.log('승인요청 클릭됨')}
          >
            승인요청{pendingApprovals > 0 ? ` ${pendingApprovals}` : ''}
          </button>
          <button className="sr-only" onClick={() => setPendingApprovals((n) => n + 1)} aria-hidden />
          {pendingApprovals > 0 && (
            <span className="absolute -top-1 -right-1">
              <NewIcon width={14} height={14} />
            </span>
          )}
        </div>

        <ManagerButton onClick={toggleEditMode} styleSize="sm">
          {isEditMode ? '저장하기' : '수정하기'}
        </ManagerButton>
      </div>
    </div>
  )
}
