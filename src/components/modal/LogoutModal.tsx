import Modal from '@/components/common/Modal'
import { Dispatch, SetStateAction } from 'react'

interface LogoutModalProps {
  setIsLogoutModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function LogoutModal({ setIsLogoutModalOpen }: LogoutModalProps) {
  return (
    <Modal>
      <Modal.Content>
        <div className="body-lg-regular flex w-full items-center justify-center text-gray-700">
          정말 로그아웃할까요?
        </div>
      </Modal.Content>
      <Modal.BottomButton>
        <div className="flex gap-x-2">
          <button
            onClick={() => {
              setIsLogoutModalOpen(false)
            }}
            className="bg-primary-500 body-sm-semibold h-[44px] w-full rounded-[10px] text-white"
          >
            로그아웃
          </button>
          <button
            onClick={() => {
              setIsLogoutModalOpen(false)
            }}
            className="body-sm-semibold h-[44px] w-full rounded-[10px] bg-gray-100 text-gray-600"
          >
            취소
          </button>
        </div>
      </Modal.BottomButton>
    </Modal>
  )
}
