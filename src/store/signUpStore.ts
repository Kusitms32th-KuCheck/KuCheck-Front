import { create } from 'zustand'
import { SignUpDataType } from '@/types/sign-up'
import { FileInfoType } from '@/types/common'

interface SetSignUpStoreType {
  signUpData?: SignUpDataType | undefined
  file?: FileInfoType | undefined
}

interface SignUpStoreType {
  signUpData: SignUpDataType | undefined
  file: FileInfoType | undefined
  setState: (params: SetSignUpStoreType) => void
}

export const useSignUpStore = create<SignUpStoreType>((set) => ({
  signUpData: undefined,
  file: undefined,
  setState: (params: SetSignUpStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
