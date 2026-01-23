import { create } from 'zustand'
import type { PointMemberStatus, PendingAttendanceChange } from '@/types/manager/point/types'
import type { Dispatch, SetStateAction } from 'react'

type PointTableState = {
  members: PointMemberStatus[]
  setMembers: Dispatch<SetStateAction<PointMemberStatus[]>>
  modifiedCells: Record<string, boolean>
  setModifiedCells: Dispatch<SetStateAction<Record<string, boolean>>>
  originalMembers: PointMemberStatus[] // 초기화를 위한 원본 데이터
  setOriginalMembers: (members: PointMemberStatus[]) => void
  resetToOriginal: () => void // 초기화 함수

  // 월별 출석 변경사항 관리
  pendingAttendanceChanges: Record<string, PendingAttendanceChange> // key: `${attendanceId}`
  setPendingAttendanceChange: (key: string, change: PendingAttendanceChange) => void
  removePendingAttendanceChange: (key: string) => void
  clearPendingAttendanceChanges: () => void

  collapsedMonths: Set<string>
  toggleCollapsedMonth: (month: string) => void

  isManagerModalOpen: boolean
  setIsManagerModalOpen: (open: boolean) => void

  showToastOnce: boolean
  setShowToastOnce: (v: boolean) => void

  feedbackMessage: null | string | import('react').ReactNode
  setFeedbackMessage: (v: null | string | import('react').ReactNode) => void
}

export const usePointTableStore = create<PointTableState>((set) => ({
  members: [] as PointMemberStatus[],
  setMembers: (m) =>
    set((s) => ({
      members: typeof m === 'function' ? (m as (prev: PointMemberStatus[]) => PointMemberStatus[])(s.members) : m,
    })),
  modifiedCells: {},
  setModifiedCells: (v) =>
    set((s) => ({
      modifiedCells:
        typeof v === 'function'
          ? (v as (prev: Record<string, boolean>) => Record<string, boolean>)(s.modifiedCells)
          : v,
    })),
  originalMembers: [] as PointMemberStatus[],
  setOriginalMembers: (members) => set({ originalMembers: [...members] }),
  resetToOriginal: () =>
    set((s) => ({
      members: [...s.originalMembers],
      modifiedCells: {},
      pendingAttendanceChanges: {},
    })),

  // 월별 출석 변경사항 관리
  pendingAttendanceChanges: {},
  setPendingAttendanceChange: (key: string, change: PendingAttendanceChange) =>
    set((s) => ({
      pendingAttendanceChanges: { ...s.pendingAttendanceChanges, [key]: change },
    })),
  removePendingAttendanceChange: (key: string) =>
    set((s) => {
      const next = { ...s.pendingAttendanceChanges }
      delete next[key]
      return { pendingAttendanceChanges: next }
    }),
  clearPendingAttendanceChanges: () => set({ pendingAttendanceChanges: {} }),

  collapsedMonths: new Set<string>(['8월', '9월', '10월', '11월', '12월']),
  toggleCollapsedMonth: (month: string) =>
    set((s) => {
      const next = new Set(s.collapsedMonths)
      if (next.has(month)) next.delete(month)
      else next.add(month)
      return { collapsedMonths: next }
    }),

  isManagerModalOpen: false,
  setIsManagerModalOpen: (open) => set({ isManagerModalOpen: open }),

  showToastOnce: true,
  setShowToastOnce: (v) => set({ showToastOnce: v }),

  feedbackMessage: null,
  setFeedbackMessage: (v) => set({ feedbackMessage: v }),
}))
