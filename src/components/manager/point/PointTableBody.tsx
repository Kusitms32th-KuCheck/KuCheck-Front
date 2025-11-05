'use client'

import React, { useEffect, useRef } from 'react'
import PointTableRow from './point-row/PointTableRow'
import BottomToast, { DEFAULT_SHIFT_WHEEL_MESSAGE } from '@/components/manager/common/BottomToast'
import ManagerModal from '@/components/manager/common/ManagerModal'
import { usePointTableStore } from '@/store/manager/usePointTableStore'
import usePointStatusHandlers from '@/hooks/manager/point/usePointStatusHandlers'
import { usePointStore } from '@/store/manager/usePointStore'
import { computeVisibleDates, computeGridTemplate, computeMinWidth } from '@/utils/manager/computePointTable'
import type { PointMemberStatus } from '@/types/manager/point/types'
import usePointTableActions from '@/hooks/manager/point/usePointTableActions'

type Props = {
  containerRef?: React.RefObject<HTMLDivElement | null>
  isHorizScrolled?: boolean
}

export default function PointTableBody({ containerRef, isHorizScrolled }: Props) {
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
    handleNoteChange,
    handleStaffChange,
    handleSave,
  } = handlers

  const prevEditRef = useRef<boolean>(isEditMode)

  useEffect(() => {
    if (!prevEditRef.current && isEditMode) {
      originalMembersRef.current = members.map((m) => ({ ...m }))
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
  const { confirmSave, cancelSave } = usePointTableActions({
    members,
    originalMembersRef,
    setMembers,
    setModifiedCells,
    setEditMode,
    setIsManagerModalOpen,
    setFeedbackMessage,
  })

  return (
    <div className="mx-[24px] mb-6 min-h-0 flex-1">
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
              onStaffChange={handleStaffChange}
              onQpickChange={handleQpickChange}
              onNoteChange={handleNoteChange}
              modifiedCells={modifiedCells}
              gridTemplate={gridTemplate}
              collapsedMonths={collapsedMonths}
              isHorizScrolled={isHorizScrolled}
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
