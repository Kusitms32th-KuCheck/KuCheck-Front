import { create } from 'zustand'
import { SignUpDataType } from '@/types/sign-up'

interface SetSignUpStoreType {
  signUpData?: SignUpDataType | undefined
}

interface SignUpStoreType {
  signUpData: SignUpDataType | undefined
  setState: (params: SetSignUpStoreType) => void
}

export const useSignUpStore = create<SignUpStoreType>((set) => ({
  signUpData: undefined,
  setState: (params: SetSignUpStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
