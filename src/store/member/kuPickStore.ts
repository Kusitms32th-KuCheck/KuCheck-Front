import { create } from 'zustand'
import { FileInfoType } from '@/types/common'

interface SetKuPickStoreType {
  applicationFile?: FileInfoType | undefined
  viewFile?: FileInfoType | undefined
}

interface KuPickStoreType {
  applicationFile: FileInfoType | undefined
  viewFile?: FileInfoType | undefined
  setState: (params: SetKuPickStoreType) => void
}

export const useKuPickStore = create<KuPickStoreType>((set) => ({
  applicationFile: undefined,
  viewFile: undefined,
  setState: (params: SetKuPickStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
