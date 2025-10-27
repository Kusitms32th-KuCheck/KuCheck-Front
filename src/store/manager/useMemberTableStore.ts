import { create } from 'zustand'
import type { Member } from '@/types/manager/member/mockData'
import type { Dispatch, SetStateAction } from 'react'

type MemberTableState = {
  members: Member[]
  setMembers: Dispatch<SetStateAction<Member[]>>
  modifiedCells: Record<string, boolean>
  setModifiedCells: Dispatch<SetStateAction<Record<string, boolean>>>
  editBuffer: Record<number, Partial<Member>>
  setEditBuffer: Dispatch<SetStateAction<Record<number, Partial<Member>>>>
  updateEditBufferEntry: (index: number, patch: Partial<Member>) => void
  clearEditBuffer: () => void
  applyEditBuffer: () => void
  isManagerModalOpen: boolean
  setIsManagerModalOpen: (open: boolean) => void
  feedbackMessage: React.ReactNode | null
  setFeedbackMessage: (v: React.ReactNode | null) => void
}

export const useMemberTableStore = create<MemberTableState>((set) => ({
  members: [] as Member[],
  setMembers: (m) =>
    set((s) => ({ members: typeof m === 'function' ? (m as (prev: Member[]) => Member[])(s.members) : m })),
  modifiedCells: {},
  setModifiedCells: (v) =>
    set((s) => ({
      modifiedCells:
        typeof v === 'function'
          ? (v as (prev: Record<string, boolean>) => Record<string, boolean>)(s.modifiedCells)
          : v,
    })),

  editBuffer: {},
  setEditBuffer: (b) =>
    set((s) => ({
      editBuffer:
        typeof b === 'function'
          ? (b as (prev: Record<number, Partial<Member>>) => Record<number, Partial<Member>>)(s.editBuffer)
          : b,
    })),
  updateEditBufferEntry: (index: number, patch: Partial<Member>) =>
    set((s) => {
      const next = { ...(s.editBuffer || {}) }
      next[index] = { ...(next[index] || {}), ...patch }
      return { editBuffer: next }
    }),
  clearEditBuffer: () => set({ editBuffer: {} }),
  applyEditBuffer: () =>
    set((s) => {
      const newMembers = s.members.map((m, i) =>
        s.editBuffer && s.editBuffer[i] ? { ...m, ...(s.editBuffer[i] as Partial<Member>) } : m
      )
      return { members: newMembers, editBuffer: {} }
    }),

  isManagerModalOpen: false,
  setIsManagerModalOpen: (open) => set({ isManagerModalOpen: open }),
  feedbackMessage: null,
  setFeedbackMessage: (v) => set({ feedbackMessage: v }),
}))
