import { create } from 'zustand'

type ApprovalSelectionsState = {
  selections: Record<number, 'APPROVED' | 'REJECTED' | ''>
  setSelection: (memberIdx: number, value: 'APPROVED' | 'REJECTED' | '') => void
  clearSelections: () => void
  approvalMembers: any[]
  setApprovalMembers: (members: any[]) => void
}

export const useMemberApprovalStore = create<ApprovalSelectionsState>((set) => ({
  selections: {},
  setSelection: (memberIdx, value) =>
    set((state) => ({
      selections: { ...state.selections, [memberIdx]: value },
    })),
  clearSelections: () => set({ selections: {} }),
  approvalMembers: [],
  setApprovalMembers: (members) => set({ approvalMembers: members }),
}))
