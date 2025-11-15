'use client'

import React, { useEffect, useRef } from 'react'
import PointTableRow from './point-row/PointTableRow'
import BottomToast, { DEFAULT_SHIFT_WHEEL_MESSAGE } from '@/components/manager/common/BottomToast'
import ManagerModal from '@/components/manager/common/ManagerModal'
import { usePointTableStore } from '@/store/manager/usePointTableStore'
import { useSessionScheduleStore } from '@/store/manager/useSessionScheduleStore'
import usePointStatusHandlers from '@/hooks/manager/point/usePointStatusHandlers'
import { usePointStore } from '@/store/manager/usePointStore'
import { computeGridTemplate, computeMinWidth } from '@/utils/manager/computePointTable'
import type { PointMemberStatus, MonthlyAttendanceResult } from '@/types/manager/point/types'
import usePointTableActions from '@/hooks/manager/point/usePointTableActions'
import { getOptimalVisibleDates } from '@/utils/manager/sessionDataConverter'

type Props = {
  containerRef?: React.RefObject<HTMLDivElement | null>
  isHorizScrolled?: boolean
  monthlyData: Record<number, MonthlyAttendanceResult>
}

export default function PointTableBody({ containerRef, isHorizScrolled, monthlyData }: Props) {
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

  const { sessions } = useSessionScheduleStore()

  console.log('모든 월별 데이터:', Object.keys(monthlyData).length, '개월')
  console.log('바디에서 받은 세션 데이터:', sessions?.length || 0, '개')

  const { isEditMode, setEditMode } = usePointStore()
  const originalMembersRef = useRef<PointMemberStatus[] | null>(null)

  const visibleDates = getOptimalVisibleDates(sessions, monthlyData, collapsedMonths)

  const gridTemplate = computeGridTemplate(visibleDates)
  const contentMinWidth = computeMinWidth(gridTemplate)

  console.log('바디에서 사용할 데이터 타입:', sessions && sessions.length > 0 ? '세션 데이터' : '월별 데이터')

  const handlers = usePointStatusHandlers({
    members,
    setMembers,
    modifiedCells,
    setModifiedCells,
    setIsManagerModalOpen,
  })

  const {
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
              monthlyData={monthlyData}
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
