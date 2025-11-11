import { create } from 'zustand'
import { SignUpDataType } from '@/types/sign-up'
import { FileInfoType } from '@/types/common'

interface SignUpStoreType {
  signUpData: SignUpDataType | undefined
  file: FileInfoType | undefined

  // ✅ 메서드 추가
  updateSignUpData: (data: Partial<SignUpDataType>) => void
  setFile: (file: FileInfoType | undefined) => void
  reset: () => void
}

export const useSignUpStore = create<SignUpStoreType>((set) => ({
  signUpData: undefined,
  file: undefined,

  /**
   * signUpData의 일부 필드만 업데이트
   * ✅ 이미 있는 데이터와 병합됨
   */
  updateSignUpData: (data: Partial<SignUpDataType>) => {
    set((state) => ({
      signUpData: state.signUpData ? { ...state.signUpData, ...data } : (data as SignUpDataType),
    }))
  },

  /**
   * 파일 업데이트
   */
  setFile: (file: FileInfoType | undefined) => {
    set({ file })
  },

  /**
   * 전체 초기화 (회원가입 완료 후)
   */
  reset: () => {
    set({ signUpData: undefined, file: undefined })
  },
}))
