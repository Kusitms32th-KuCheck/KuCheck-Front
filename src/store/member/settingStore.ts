import { create } from 'zustand'
import { FileInfoType } from '@/types/common'

interface SetSettingStoreType {
  file?: FileInfoType | undefined
}

interface SettingStoreType {
  file: FileInfoType | undefined
  setState: (params: SetSettingStoreType) => void
}

export const useSettingStore = create<SettingStoreType>((set) => ({
  file: undefined,
  setState: (params: SetSettingStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
