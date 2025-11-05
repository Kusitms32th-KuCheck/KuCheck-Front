'use client'

import React, { useEffect, useRef } from 'react'
import PointTableRow from './point-row/PointTableRow'
import BottomToast, { DEFAULT_SHIFT_WHEEL_MESSAGE } from '@/components/manager/common/BottomToast'
import ManagerModal from '@/components/manager/common/ManagerModal'
import { usePointTableStore } from '@/store/manager/usePointTableStore'
import usePointStatusHandlers from '@/hooks/manager/usePointStatusHandlers'
import { usePointStore } from '@/store/manager/usePointStore'
import { computeVisibleDates, computeGridTemplate, computeMinWidth } from '@/utils/manager/computePointTable'
import type { PointMemberStatus } from '@/types/manager/point/types'
import {
  updateStudyPointsClient,
  updateMemoClient,
  updateKuportersPointsClient,
  updateKupickParticipationClient,
  updateIsTfClient,
  updateIsStaffClient,
} from '@/lib/manager/client/points'

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

  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
    }
  }, [])

  const confirmSave = () => {
    if (!originalMembersRef.current) {
      setEditMode(false)
      setIsManagerModalOpen(false)
      setFeedbackMessage(<span className="text-primary-500">변경사항이 없습니다</span>)
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
      feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1000)
      return
    }

    const origMembers = originalMembersRef.current
    const promises: Promise<unknown>[] = []
    const skippedKupick: Array<{ memberId: number; month: number }> = []

    members.forEach((member, idx) => {
      const orig = origMembers[idx]
      if (!orig) return

      const memberCallFns: Array<() => Promise<unknown>> = []

      // study points changed
      if ((member.studyPoints ?? 0) !== (orig.studyPoints ?? 0)) {
        memberCallFns.push(() =>
          updateStudyPointsClient({ memberId: member.memberId, studyPoints: member.studyPoints })
        )
      }

      if ((member.kuportersPoints ?? 0) !== (orig.kuportersPoints ?? 0)) {
        memberCallFns.push(() =>
          updateKuportersPointsClient({ memberId: member.memberId, kuportersPoints: member.kuportersPoints })
        )
      }

      if ((member.memo ?? null) !== (orig.memo ?? null)) {
        memberCallFns.push(() => updateMemoClient({ memberId: member.memberId, memo: member.memo }))
      }

      if ((member.isTf ?? false) !== (orig.isTf ?? false)) {
        memberCallFns.push(() => updateIsTfClient({ memberId: member.memberId }))
      }

      if ((member.isStaff ?? false) !== (orig.isStaff ?? false)) {
        memberCallFns.push(() => updateIsStaffClient({ memberId: member.memberId }))
      }

      const monthCandidates = [8, 9, 10, 11, 12]
      const currentMonth = new Date().getMonth() + 1
      let kupickCurrentChanged = false
      monthCandidates.forEach((m) => {
        const prev = (orig.kupickParticipation as Record<number, boolean> | undefined)?.[m]
        const next = (member.kupickParticipation as Record<number, boolean> | undefined)?.[m]
        if ((prev ?? false) !== (next ?? false)) {
          if (m === currentMonth) kupickCurrentChanged = true
          else skippedKupick.push({ memberId: member.memberId, month: m })
        }
      })
      if (kupickCurrentChanged) {
        memberCallFns.push(() => updateKupickParticipationClient({ memberId: member.memberId }))
      }

      if (memberCallFns.length > 0) {
        promises.push(
          (async () => {
            for (const fn of memberCallFns) {
              console.debug('Executing member API call for', member.memberId)
              await fn()
            }
          })()
        )
      }
    })

    if (promises.length === 0 && skippedKupick.length === 0) {
      setEditMode(false)
      setIsManagerModalOpen(false)
      setFeedbackMessage(<span className="text-primary-500">변경사항이 없습니다</span>)
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
      feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1000)
      return
    }

    Promise.allSettled(promises).then((results) => {
      const failed = results.filter((r) => {
        if (r.status === 'rejected') return true
        const v = (r as PromiseFulfilledResult<unknown>).value
        if (typeof v === 'object' && v !== null && 'success' in v) {
          return (v as { success?: boolean }).success === false
        }
        return false
      })
      if (failed.length > 0) {
        if (originalMembersRef.current) {
          const merged = originalMembersRef.current.map((orig, idx) => {
            const cur = members[idx]
            if (!cur) return orig
            return { ...orig, kupickParticipation: cur.kupickParticipation }
          })
          setMembers(merged)
        }
        setFeedbackMessage(<span>저장에 실패했어요. 다시 시도해주세요.</span>)
        setIsManagerModalOpen(false)
        setEditMode(true)
        if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
        feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 2000)
        return
      }

      setEditMode(false)
      setModifiedCells({})
      setIsManagerModalOpen(false)
      originalMembersRef.current = null
      if (skippedKupick.length > 0) {
        setFeedbackMessage(
          <span className="text-primary-500">
            성공적으로 저장되었어요. 단, 일부 큐픽 변경은 서버에 반영되지 않았습니다.
          </span>
        )
      } else {
        setFeedbackMessage(<span className="text-primary-500">성공적으로 저장되었어요</span>)
      }
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
      feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1000)
    })
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
