'use client'

import React, { useState, useEffect } from 'react'
import ManagerButton from '../common/ManagerButton'
import { useMemberStore } from '@/store/manager/useMemberStore'
import { NewIcon } from '@/assets/svgComponents/manager'
import { ManagementRightIcon } from '@/assets/svgComponents/manager'
import { patchClientStaffProfile } from '@/lib/member/client/staff'
import { useMemberTableStore } from '@/store/manager/useMemberTableStore'
import { useMemberApprovalStore } from '@/store/manager/useMemberApprovalStore'
import { patchClientStaffApprovalStatusBatch } from '@/lib/member/client/staff'
import ManagerModal from '../common/ManagerModal'

export default function MemberHeader(memberLength?: number) {
  const { isEditMode, toggleEditMode, isApprovalView, setApprovalView } = useMemberStore()
  const [pendingApprovals, setPendingApprovals] = useState<number>(2)
  const {
    members,
    editBuffer,
    clearEditBuffer,
  } = useMemberTableStore()
  const { selections, clearSelections, approvalMembers } = useMemberApprovalStore()
  const [loadingApproval, setLoadingApproval] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [approvalModalOpen, setApprovalModalOpen] = useState(false)
  const [approvalFeedback, setApprovalFeedback] = useState<string | null>(null)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  // 항상 페이지 진입 시 학회원관리 탭이 보이도록
  useEffect(() => {
    setApprovalView(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 프로필 저장 핸들러 (학회원관리)
  const handleSaveProfiles = async () => {
    setLoadingProfile(true)
    const requiredFields = ['name', 'school', 'major', 'part', 'phoneNumber']
    const requests = Object.entries(editBuffer)
      .filter(([_, patch]) => Object.keys(patch).length > 0)
      .map(([idx, patch]) => {
        const member = members[Number(idx)]
        if (!member) return null
        // 모든 필수 필드를 patch에 없으면 member에서 채워서 보냄
        const fullPatch = { ...patch } as Record<string, any>
        requiredFields.forEach(field => {
          if (fullPatch[field] === undefined || fullPatch[field] === '') {
            fullPatch[field] = (member as Record<string, any>)[field]
          }
        })
        // 필수 필드가 모두 채워졌는지 확인
        const hasAllFields = requiredFields.every(
          field => fullPatch[field] !== undefined && String(fullPatch[field]).trim() !== ''
        )
        if (!hasAllFields) return null
        return patchClientStaffProfile(member.memberId, fullPatch)
      })
      .filter(Boolean)
    if (requests.length > 0) await Promise.all(requests)
  clearEditBuffer()
  setLoadingProfile(false)
  toggleEditMode() // 저장 후 수정모드 해제
  }

  // 승인/거절 저장 핸들러 (회원가입 승인)
  const handleSaveApprovals = async () => {
    setLoadingApproval(true)
    let feedbackMsg = ''
    try {
      const payload = Object.entries(selections)
        .filter(([_, status]) => status === 'APPROVED' || status === 'REJECTED')
        .map(([idx, status]) => {
          const member = approvalMembers?.[Number(idx)]
          if (!member) {
            console.error(`approvalMembers[${idx}] is undefined`)
            return null
          }
          const memberId = member.memberId ?? member.id
          if (!memberId) {
            console.error(`Member at index ${idx} has no memberId or id`, member)
            return null
          }
          return { memberId, status }
        })
        .filter(Boolean)

      if (payload.length > 0) {
        await patchClientStaffApprovalStatusBatch(payload)
        feedbackMsg = '성공적으로 저장되었습니다.'
      } else {
        feedbackMsg = '변경사항이 없습니다.'
      }
    } catch (e) {
      feedbackMsg = '저장에 실패했습니다.'
    }
    setApprovalFeedback(feedbackMsg)
    setShowFeedbackModal(true)
    clearSelections()
    setLoadingApproval(false)
  }

  // 저장하기 버튼 클릭 시 모달 오픈
  const handleApprovalSaveClick = () => {
    setApprovalModalOpen(true)
  }

  // 피드백 모달 닫기
  const handleApprovalFeedbackClose = () => {
    setShowFeedbackModal(false)
    setApprovalFeedback(null)
  }

  // 모달에서 확인 시 모달 닫기 + 기존 저장 로직 호출
  const handleApprovalModalConfirm = async () => {
    setApprovalModalOpen(false)
    await handleSaveApprovals()
  }

  // 모달에서 취소 시 모달 닫기
  const handleApprovalModalCancel = () => {
    setApprovalModalOpen(false)
  }

  return (
    <div className="flex flex-row items-center justify-between px-6 pt-[32px]">
      <div className="pl-2">
        {isApprovalView ? (
          <div className="flex items-center gap-[8px]">
            <p className="heading-lg-medium text-gray-500 ">학회원 관리</p>
            <ManagementRightIcon width={24} height={24} />
            <p className="heading-lg-medium">회원가입 승인</p>
          </div>
        ) : (
          <p className="heading-lg-medium ">학회원 관리</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          {isApprovalView ? (
            <button
              className={`border- border-primary-500 body-sm-medium text-primary-500 flex cursor-pointer items-center rounded-[4px] bg-white px-3 py-2`}
              onClick={() => setApprovalView(false)}
            >
              학회원 관리
            </button>
          ) : (
            <button
              className={`border- border-primary-500  body-sm-medium text-primary-500 flex cursor-pointer items-center rounded-[4px] bg-white px-3 py-2`}
              onClick={() => setApprovalView(true)}
            >
              승인요청{memberLength}
            </button>
          )}
          <button className="sr-only" onClick={() => setPendingApprovals((n) => n + 1)} aria-hidden />
          {!isApprovalView && pendingApprovals > 0 && (
            <span className="absolute -top-1 -right-1">
              <NewIcon width={14} height={14} />
            </span>
          )}
        </div>
        {isApprovalView ? (
          <ManagerButton
            onClick={handleApprovalSaveClick}
            styleSize="sm"
            disabled={loadingApproval}
          >
            {loadingApproval ? '저장 중...' : '저장하기'}
          </ManagerButton>
        ) : (
          <ManagerButton
            onClick={isEditMode ? handleSaveProfiles : toggleEditMode}
            styleSize="sm"
            disabled={loadingProfile}
          >
            {loadingProfile ? '저장 중...' : isEditMode ? '저장하기' : '수정하기'}
          </ManagerButton>
        )}
      </div>
      {/* 저장 확인 모달 */}
      <ManagerModal
        open={approvalModalOpen}
        message="변경사항을 저장할까요?"
        onConfirm={handleApprovalModalConfirm}
        onCancel={handleApprovalModalCancel}
        confirmLabel="저장하기"
        cancelLabel="취소"
      />
      {showFeedbackModal && approvalFeedback && (
        <ManagerModal
          open={true}
          transientMessage={approvalFeedback}
          transientDuration={1200}
          onTransientClose={handleApprovalFeedbackClose}
          onCancel={handleApprovalFeedbackClose}
          onConfirm={handleApprovalFeedbackClose}
        />
      )}
    </div>
  )
}
