'use client'

import React, { useEffect, useState } from 'react'
import MemberTableRow from './member-row/MemberTableRow'
import { generateMockMembers } from '@/types/manager/member/mockData'
import { useMemberStore } from '@/store/manager/useMemberStore'
import { useMemberTableStore } from '@/store/manager/useMemberTableStore'
import useScrollSync from '@/utils/manager/useScrollSync'
import ManagerModal from '@/components/manager/common/ManagerModal'

export default function MemberTable() {
  const { isEditMode } = useMemberStore()
  const {
    members,
    setMembers,
    editBuffer,
    updateEditBufferEntry,
    clearEditBuffer,
    applyEditBuffer,
    isManagerModalOpen,
    setIsManagerModalOpen,
  } = useMemberTableStore()
  const initialMembers = generateMockMembers()
  const [prevEdit, setPrevEdit] = useState<boolean>(isEditMode)
  const [revertToken, setRevertToken] = useState<number>(0)
  const { containerRef, headerScrollRef, isScrolled } = useScrollSync()
  const feedbackTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const { feedbackMessage, setFeedbackMessage } = useMemberTableStore()

  const gridTemplate = '120px 171px 143px 181px 423px 173px 409px'

  useEffect(() => {
    if (!members || members.length === 0) setMembers(initialMembers)
  }, [setMembers])

  useEffect(() => {
    if (prevEdit && !isEditMode) {
      setIsManagerModalOpen(true)
    }
    setPrevEdit(isEditMode)
  }, [isEditMode, prevEdit, setIsManagerModalOpen])

  return (
    <div className="mx-6 mt-7 mb-6 flex min-h-0 min-h-[calc(100vh-176px)] flex-1 flex-col">
      <div
        className={`rounded-t-[12px] border-b border-gray-100 bg-white ${isScrolled ? 'z-1000 shadow-[0_6px_20px_rgba(0,0,0,0.13)]' : ''}`}
      >
        <div ref={headerScrollRef} className="scrollbar-hide overflow-x-auto">
          <div className="grid items-center py-[14px]" style={{ gridTemplateColumns: gridTemplate }}>
            <p className="body-lg-medium pl-[30px] text-start text-gray-500">이름</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">사진</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">파트</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">학교</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">학과</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">전화번호</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">로그인한 소셜 계정</p>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="scrollbar-custom h-full overflow-auto rounded-b-[12px] bg-white">
        <div>
          {members.map((m, i) => (
            <MemberTableRow
              key={i}
              member={m}
              index={i}
              isEditMode={isEditMode}
              gridTemplate={gridTemplate}
              revertToken={revertToken}
              onEdit={(patch) => updateEditBufferEntry(i, patch)}
              editedValues={editBuffer[i]}
            />
          ))}
        </div>
      </div>
      <ManagerModal
        open={isManagerModalOpen}
        onCancel={() => {
          setRevertToken((t) => t + 1)
          clearEditBuffer()
          setIsManagerModalOpen(false)
          setFeedbackMessage(<span>저장이 취소되었어요. 다시 시도해주세요</span>)
          if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
          feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1200)
        }}
        onConfirm={() => {
          applyEditBuffer()
          setIsManagerModalOpen(false)
          setFeedbackMessage(<span className="text-primary-500">성공적으로 저장되었어요</span>)
          if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
          feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1200)
        }}
      />
      {feedbackMessage && (
        <ManagerModal
          open={true}
          transientMessage={feedbackMessage}
          onTransientClose={() => {}}
          onCancel={() => {}}
          onConfirm={() => {}}
        />
      )}
    </div>
  )
}
