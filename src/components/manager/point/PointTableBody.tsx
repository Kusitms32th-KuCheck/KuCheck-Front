import React, { useEffect, useRef } from 'react'
import PointTableRow from './point-row/PointTableRow'
import BottomToast, { DEFAULT_SHIFT_WHEEL_MESSAGE } from '@/components/manager/common/BottomToast'
import ManagerModal from '@/components/manager/common/ManagerModal'
import { usePointTableStore } from '@/store/manager/usePointTableStore'
import usePointStatusHandlers from '@/hooks/manager/usePointStatusHandlers'
import { usePointStore } from '@/store/manager/usePointStore'
import { computeVisibleDates, computeGridTemplate, computeMinWidth } from '@/utils/manager/computePointTable'
import type { PointMemberStatus } from '@/types/manager/point/types'

type Props = {
  containerRef?: React.RefObject<HTMLDivElement | null>
}

export default function PointTableBody({ containerRef }: Props) {
  const {
    members,
    setMembers,
    modifiedCells,
    setModifiedCells,
    collapsedMonths,
    isManagerModalOpen,
    setIsManagerModalOpen,
    showToastOnce,
    setShowToastOnce,
    feedbackMessage,
    setFeedbackMessage,
  } = usePointTableStore()

  const { isEditMode, setEditMode } = usePointStore()
  const originalMembersRef = useRef<PointMemberStatus[] | null>(null)

  const visibleDates = computeVisibleDates(collapsedMonths)
  const gridTemplate = computeGridTemplate(visibleDates)
  const contentMinWidth = computeMinWidth(gridTemplate)

  const handlers = usePointStatusHandlers({
    members,
    setMembers,
    modifiedCells,
    setModifiedCells,
    setIsManagerModalOpen,
  })

  const {
    handleStudyChange,
    handleQportersChange,
    handleTfChange,
    handleQpickChange,
    handleSessionChange,
    handleSave,
  } = handlers

  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevEditRef = useRef<boolean>(isEditMode)

  useEffect(() => {
    if (!prevEditRef.current && isEditMode) {
      originalMembersRef.current = members.map((m) => ({ ...m, sessions: { ...m.sessions } }))
    }

    if (prevEditRef.current && !isEditMode) {
      handleSave()
    }
    prevEditRef.current = isEditMode
  }, [isEditMode, handleSave])

  useEffect(() => {
    if (!showToastOnce) return
    const t = setTimeout(() => setShowToastOnce(false), 3400)
    return () => clearTimeout(t)
  }, [showToastOnce, setShowToastOnce])

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
    }
  }, [])

  const confirmSave = () => {
    setEditMode(false)
    setModifiedCells({})
    setIsManagerModalOpen(false)
    originalMembersRef.current = null
    setFeedbackMessage(<span className="text-primary-500">성공적으로 저장되었어요</span>)
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
    feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1000)
  }

  const cancelSave = () => {
    setIsManagerModalOpen(false)
    setEditMode(false)
    if (originalMembersRef.current) {
      setMembers(originalMembersRef.current)
      originalMembersRef.current = null
    }
    setModifiedCells({})
    setFeedbackMessage(<span>저장이 취소되었어요. 다시 시도해주세요</span>)
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
    feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1000)
  }

  return (
    <div className="mx-[38px] mb-6 min-h-0 flex-1">
      {showToastOnce && <BottomToast message={DEFAULT_SHIFT_WHEEL_MESSAGE} duration={3000} />}
      <div ref={containerRef} className="scrollbar-custom h-full overflow-auto rounded-b-[12px] bg-white">
        <div style={{ minWidth: contentMinWidth }}>
          {members.map((member, memberIndex) => (
            <PointTableRow
              key={memberIndex}
              member={member}
              memberIndex={memberIndex}
              visibleDates={visibleDates}
              isEditMode={isEditMode}
              onStudyChange={handleStudyChange}
              onQportersChange={handleQportersChange}
              onSessionChange={handleSessionChange(isEditMode)}
              onTfChange={handleTfChange}
              onQpickChange={handleQpickChange}
              modifiedCells={modifiedCells}
              gridTemplate={gridTemplate}
              collapsedMonths={collapsedMonths}
            />
          ))}
        </div>
      </div>
      <ManagerModal open={isManagerModalOpen} onCancel={cancelSave} onConfirm={confirmSave} />
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
