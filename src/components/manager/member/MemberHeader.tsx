'use client'

import React, { useState } from 'react'
import ManagerButton from '../common/ManagerButton'
import { useMemberStore } from '@/store/manager/useMemberStore'
import { NewIcon } from '@/assets/svgComponents/manager'
import { ManagementRightIcon } from '@/assets/svgComponents/manager'
export default function MemberHeader() {
  const { isEditMode, toggleEditMode, isApprovalView, setApprovalView } = useMemberStore()
  const [pendingApprovals, setPendingApprovals] = useState<number>(2)

  return (
    <div className="flex flex-row items-center justify-between px-6 pt-[26px]">
      <div className="pl-2">
        {isApprovalView ? (
          <div className="flex items-center">
            <p className="heading-lg-medium text-gray-500">학회원 관리</p>
            <ManagementRightIcon width={24} height={24} />
            <p className="heading-lg-medium">회원가입 승인</p>
          </div>
        ) : (
          <p className="heading-lg-medium">학회원 관리</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          {isApprovalView ? (
            <button
              className={`body-sm-medium text-primary-500 flex cursor-pointer items-center rounded-[4px] bg-white px-3 py-2`}
              onClick={() => setApprovalView(false)}
            >
              학회원 관리
            </button>
          ) : (
            <button
              className={`body-sm-medium text-primary-500 flex cursor-pointer items-center rounded-[4px] bg-white px-3 py-2`}
              onClick={() => setApprovalView(true)}
            >
              승인요청{pendingApprovals > 0 ? ` ${pendingApprovals}` : ''}
            </button>
          )}
          <button className="sr-only" onClick={() => setPendingApprovals((n) => n + 1)} aria-hidden />
          {!isApprovalView && pendingApprovals > 0 && (
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
