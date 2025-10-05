import { create } from 'zustand'

interface SetModalStoreType {
  isOpen: boolean
}

interface ModalStoreType {
  setState: (params: SetModalStoreType) => void
}

export const useModalStore = create<ModalStoreType>((set) => ({
  setState: (params: SetModalStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
