import { create } from 'zustand'

interface SetNoticeStoreType {
  selectedCategoryId: number | undefined
}

interface NoticeStoreType {
  selectedCategoryId: number | undefined
  setState: (params: SetNoticeStoreType) => void
}

export const useNoticeStore = create<NoticeStoreType>((set) => ({
  selectedCategoryId: 0,
  file: undefined,
  setState: (params: SetNoticeStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
