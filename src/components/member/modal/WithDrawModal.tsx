import MemberModal from '@/components/member/common/MemberModal'
import { Dispatch, SetStateAction } from 'react'

interface LogoutModalProps {
  setIsWithDrawModalOpen: Dispatch<SetStateAction<boolean>>
  onWithDrawClick: () => Promise<void>
}

export default function WithDrawModal({ setIsWithDrawModalOpen, onWithDrawClick }: LogoutModalProps) {
  return (
    <MemberModal>
      <MemberModal.Content>
        <div className="body-lg-regular flex w-full items-center justify-center text-gray-700">
          정말 회원 탈퇴하시겠어요?
        </div>
      </MemberModal.Content>
      <MemberModal.BottomButton>
        <div className="flex gap-x-2">
          <button
            onClick={onWithDrawClick}
            className="bg-sub-red body-lg-semibold h-[48px] w-full rounded-[14px] text-white"
          >
            탈퇴하기
          </button>
          <button
            onClick={() => {
              setIsWithDrawModalOpen(false)
            }}
            className="body-lg-semibold h-[48px] w-full rounded-[14px] bg-gray-100 text-gray-600"
          >
            취소
          </button>
        </div>
      </MemberModal.BottomButton>
    </MemberModal>
  )
}
