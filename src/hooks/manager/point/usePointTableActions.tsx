'use client'

import { useRef, useEffect } from 'react'
import type { PointMemberStatus } from '@/types/manager/point/types'
import type { Dispatch, SetStateAction } from 'react'
import {
  updateMemoClient,
  updateKuportersPointsClient,
  updateKupickParticipationClient,
  updateIsTfClient,
  updateIsStaffClient,
} from '@/lib/manager/client/points'

type Args = {
  members: PointMemberStatus[]
  originalMembersRef: React.RefObject<PointMemberStatus[] | null>
  setMembers: Dispatch<SetStateAction<PointMemberStatus[]>>
  setModifiedCells: Dispatch<SetStateAction<Record<string, boolean>>>
  setEditMode: (v: boolean) => void
  setIsManagerModalOpen: (v: boolean) => void
  setFeedbackMessage: (v: null | string | import('react').ReactNode) => void
}

export default function usePointTableActions({
  members,
  originalMembersRef,
  setMembers,
  setModifiedCells,
  setEditMode,
  setIsManagerModalOpen,
  setFeedbackMessage,
}: Args) {
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

    members.forEach((member, idx) => {
      const orig = origMembers[idx]
      if (!orig) return

      const memberCallFns: Array<() => Promise<unknown>> = []

      if ((member.kuportersPoints ?? 0) !== (orig.kuportersPoints ?? 0)) {
        memberCallFns.push(() =>
          updateKuportersPointsClient({ memberId: member.memberId, kuportersPoints: member.kuportersPoints })
        )
      }

      // 메모 변경 감지 - 빈 문자열과 null을 구분해서 처리
      const origMemo = orig.memo || ''
      const newMemo = member.memo || ''
      if (origMemo !== newMemo) {
        // 빈 문자열인 경우 명시적으로 null로 전송
        const memoToSend = newMemo.trim() === '' ? null : newMemo
        memberCallFns.push(() => updateMemoClient({ memberId: member.memberId, memo: memoToSend }))
      }

      if ((member.isTf ?? false) !== (orig.isTf ?? false)) {
        const currentDate = new Date()
        const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
        memberCallFns.push(() => updateIsTfClient({ memberId: member.memberId, yearMonth }))
      }

      if ((member.isStaff ?? false) !== (orig.isStaff ?? false)) {
        const currentDate = new Date()
        const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
        memberCallFns.push(() => updateIsStaffClient({ memberId: member.memberId, yearMonth }))
      }

      const monthCandidates = [9, 10, 11] // 9월, 10월, 11월 큐픽만 처리
      monthCandidates.forEach((m) => {
        const prev = (orig.kupickParticipation as Record<number, boolean> | undefined)?.[m]
        const next = (member.kupickParticipation as Record<number, boolean> | undefined)?.[m]
        if ((prev ?? false) !== (next ?? false)) {
          const currentDate = new Date()
          const yearMonth = `${currentDate.getFullYear()}-${String(m).padStart(2, '0')}`
          memberCallFns.push(() => updateKupickParticipationClient({ memberId: member.memberId, yearMonth }))
        }
      })

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

    if (promises.length === 0) {
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
      setFeedbackMessage(<span className="text-primary-500">성공적으로 저장되었어요</span>)
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

  return { confirmSave, cancelSave }
}
