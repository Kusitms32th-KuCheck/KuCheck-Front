import { create } from 'zustand'
import { AbsenceDataType } from '@/types/member/absence'
import { FileInfoType } from '@/types/common'

interface SetAbsenceStoreType {
  absenceData?: AbsenceDataType | undefined
  file?: FileInfoType | undefined
  selectedSessionContent?: string | undefined
}

interface AbsenceStoreType {
  absenceData: AbsenceDataType | undefined
  file: FileInfoType | undefined
  selectedSessionContent: string | undefined
  setState: (params: SetAbsenceStoreType) => void
}

export const useAbsenceStore = create<AbsenceStoreType>((set) => ({
  absenceData: { sessionId: 4 },
  file: undefined,
  selectedSessionContent: undefined,
  setState: (params: SetAbsenceStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
