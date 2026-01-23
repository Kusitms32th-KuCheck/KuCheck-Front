import { create } from 'zustand'
import type { MemberApprovedResponse } from '@/types/manager/member/types'
import type { Dispatch, SetStateAction } from 'react'

type MemberTableState = {
  members: MemberApprovedResponse[]
  setMembers: Dispatch<SetStateAction<MemberApprovedResponse[]>>
  modifiedCells: Record<string, boolean>
  setModifiedCells: Dispatch<SetStateAction<Record<string, boolean>>>
  editBuffer: Record<number, Partial<MemberApprovedResponse>>
  setEditBuffer: Dispatch<SetStateAction<Record<number, Partial<MemberApprovedResponse>>>>
  updateEditBufferEntry: (index: number, patch: Partial<MemberApprovedResponse>) => void
  clearEditBuffer: () => void
  applyEditBuffer: () => void
  isManagerModalOpen: boolean
  setIsManagerModalOpen: (open: boolean) => void
  pendingDeleteIndex: number | null
  setPendingDeleteIndex: (idx: number | null) => void
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (open: boolean) => void
  feedbackMessage: React.ReactNode | null
  setFeedbackMessage: (v: React.ReactNode | null) => void
}

export const useMemberTableStore = create<MemberTableState>((set) => ({
  members: [] as MemberApprovedResponse[],
  setMembers: (m) =>
    set((s) => ({
      members:
        typeof m === 'function'
          ? (m as (prev: MemberApprovedResponse[]) => MemberApprovedResponse[])(s.members)
          : m,
    })),
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
          ? (b as (prev: Record<number, Partial<MemberApprovedResponse>>) => Record<number, Partial<MemberApprovedResponse>>)(s.editBuffer)
          : b,
    })),
  updateEditBufferEntry: (index: number, patch: Partial<MemberApprovedResponse>) =>
    set((s) => {
      const next = { ...(s.editBuffer || {}) }
      next[index] = { ...(next[index] || {}), ...patch }
      return { editBuffer: next }
    }),
  clearEditBuffer: () => set({ editBuffer: {} }),
  applyEditBuffer: () =>
    set((s) => {
      const newMembers = s.members.map((m, i) =>
        s.editBuffer && s.editBuffer[i] ? { ...m, ...(s.editBuffer[i] as Partial<MemberApprovedResponse>) } : m
      )
      return { members: newMembers, editBuffer: {} }
    }),

  isManagerModalOpen: false,
  //학회원 관리에서 저장 확인 모달 두 번 뜨길래 일단 set함수 비워놈
  setIsManagerModalOpen: (open) => set({}),
  pendingDeleteIndex: null,
  setPendingDeleteIndex: (idx) => set({ pendingDeleteIndex: idx }),
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open) => set({ isDeleteModalOpen: open }),
  feedbackMessage: null,
  setFeedbackMessage: (v) => set({ feedbackMessage: v }),
}))
