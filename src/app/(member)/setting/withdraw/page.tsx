'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import MemberHeader from '@/components/member/common/MemberHeader'
import WithDrawModal from '@/components/member/modal/WithDrawModal'

import { handleWithDrawAction } from '@/lib/member/actions/auth'

export default function WithDrawPage() {
  const [isWithDrawModalOpen, setIsWithDrawModalOpen] = useState(false)
  const router = useRouter()

  const onWithdrawClick = async () => {
    try {
      await handleWithDrawAction()
      setIsWithDrawModalOpen(false)
    } catch (error) {
      console.error('탈퇴 중 오류:', error)
    }
  }

  return (
    <main>
      {isWithDrawModalOpen && (
        <WithDrawModal setIsWithDrawModalOpen={setIsWithDrawModalOpen} onWithDrawClick={onWithdrawClick} />
      )}
      <MemberHeader headerType="dynamic" title={'탈퇴하기'} />
      <div className="h-[116px]" />
      <ul className="mt-5 flex flex-col gap-y-[20px] px-5">
        <h1 className="heading-sm-semibold">탈퇴 전 꼭 확인해 주세요</h1>
        <ul className="flex flex-col gap-y-[20px]">
          <li className="body-md-regular mx-3 list-disc">
            탈퇴 시 앱 내 활동 기록 및 저장된 정보가 삭제되며, 동일 계정으로 재가입 시 일부 데이터는 복구되지 않을 수
            있습니다
          </li>
          <li className="body-md-regular mx-3 list-disc">
            학회 정관에 따라 필요한 정보는 일정 기간 보관 후 파기됩니다
          </li>
          <li className="body-md-regular mx-3 list-disc">
            탈퇴가 원활하지 않거나 별도 확인이 필요한 경우, 운영진(학회 이메일)으로 문의해주세요.
          </li>
        </ul>
      </ul>
      <div className="fixed bottom-[36px] flex w-full gap-x-[10px] bg-white px-5">
        <button
          onClick={() => {
            router.back()
          }}
          className="body-lg-semibold h-[48px] w-full rounded-[14px] bg-gray-100 text-gray-600"
        >
          취소
        </button>
        <button
          onClick={() => {
            setIsWithDrawModalOpen(true)
          }}
          className="bg-sub-red body-lg-semibold h-[48px] w-full rounded-[14px] text-white"
        >
          탈퇴하기
        </button>
      </div>
    </main>
  )
}
