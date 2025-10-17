import { create } from 'zustand'

type PointState = {
  isEditMode: boolean
  toggleEditMode: () => void
  setEditMode: (value: boolean) => void
}

export const usePointStore = create<PointState>((set) => ({
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setEditMode: (value: boolean) => set({ isEditMode: value }),
}))
