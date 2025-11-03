'use client'

import { useRouter } from 'next/navigation'
import ManagerButton from '../common/ManagerButton'
import { ArrowLeftIcon } from '@/assets/svgComponents/manager'

export default function WriteHeader() {
  const router = useRouter()
  const isEditMode = false
  return (
    <div className="align-center flex h-[110px] flex-col gap-4 bg-white px-[30px] pt-[12px]">
      <button
        className="flex w-full cursor-pointer items-center justify-start gap-1"
        type="button"
        onClick={() => router.back()}
        aria-label="뒤로가기"
      >
        <ArrowLeftIcon width={16} />
        <span className="body-lg-medium text-gray-600">세션 일정</span>
      </button>
      <div className="flex w-full flex-row items-center justify-between">
        <p className="heading-lg-medium">2주차 집중 협업세션</p>
        <ManagerButton onClick={() => {}} styleSize="sm">
          {isEditMode ? '저장하기' : '수정하기'}
        </ManagerButton>
      </div>
    </div>
  )
}
