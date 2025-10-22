import { create } from 'zustand'
import { AbsenceDataType } from '@/types/member/absence'

interface SetAbsenceStoreType {
  absenceData?: AbsenceDataType | undefined
}

interface AbsenceStoreType {
  absenceData: AbsenceDataType | undefined
  setState: (params: SetAbsenceStoreType) => void
}

export const useAbsenceStore = create<AbsenceStoreType>((set) => ({
  absenceData: undefined,
  setState: (params: SetAbsenceStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
