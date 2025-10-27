import { create } from 'zustand'

type MemberState = {
  isEditMode: boolean
  toggleEditMode: () => void
  setEditMode: (value: boolean) => void
}

export const useMemberStore = create<MemberState>((set) => ({
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setEditMode: (value: boolean) => set({ isEditMode: value }),
}))
