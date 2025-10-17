import { create } from 'zustand'
import type { PointMemberStatus } from '@/types/manager/point/types'
import type { Dispatch, SetStateAction } from 'react'

type PointTableState = {
  members: PointMemberStatus[]
  setMembers: Dispatch<SetStateAction<PointMemberStatus[]>>
  modifiedCells: Record<string, boolean>
  setModifiedCells: Dispatch<SetStateAction<Record<string, boolean>>>

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
  // start empty to avoid SSR vs client random-data mismatch
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

  collapsedMonths: new Set<string>(),
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
