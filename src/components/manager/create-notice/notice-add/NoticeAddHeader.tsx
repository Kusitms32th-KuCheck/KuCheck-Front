'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import ManagerButton from '../../common/ManagerButton'
import { ArrowLeftIcon } from '@/assets/svgComponents/manager'
import { useSessionScheduleStore } from '@/store/manager/useSessionScheduleStore'
import ManagerModal from '../../common/ManagerModal'

interface NoticeAddHeaderProps {
  handleSubmit: () => Promise<void>
}

export default function NoticeAddHeader({ handleSubmit }: NoticeAddHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isEditing, setEditing] = useState(false)
  const selectedSessionName = useSessionScheduleStore((state) => state.selectedSessionName)
  const [saving, setSaving] = useState(false)

  const isDetailAddPage = pathname?.includes('/detail-add')
  const isEditMode = isDetailAddPage || isEditing

  const handleButtonClick = async () => {
    if (!isEditMode) {
      setEditing(true)
      return
    }

    setSaving(true)
    try {
      const ok = await handleSubmit()
      if (ok) {
        console.log('WriteHeader: 저장 성공!')
        if (!isDetailAddPage) {
          setEditing(false)
        }
      } else {
        console.log('WriteHeader: 저장 실패')
      }
    } finally {
      setSaving(false)
    }
  }

  const [showModal, setShowModal] = useState(false)
  const handleBackClick = () => {
    if (isEditMode) {
      setShowModal(true)
    } else {
      router.push('/create-notice')
    }
  }

  const handleModalCancel = () => {
    setShowModal(false)
  }
  const handleModalConfirm = () => {
    setEditing(false)
    setShowModal(false)
    router.push('/create-notice')
  }

  return (
    <>
      <div className="sticky top-0 z-10 flex h-[110px] w-full flex-col gap-4 bg-white px-[30px] py-3">
        <button
          className="flex w-full cursor-pointer items-center justify-start gap-1"
          type="button"
          onClick={handleBackClick}
        >
          <ArrowLeftIcon width={16} />
          <span className="body-lg-medium text-gray-600">공지 등록</span>
        </button>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="heading-lg-medium">공지 작성</p>
          <div className="flex gap-[22px]">
            <ManagerButton onClick={() => {}} styleSize="sm" styleType="white">
              취소
            </ManagerButton>
            <ManagerButton onClick={() => {}} styleSize="sm" styleType="gray">
              예약
            </ManagerButton>
            <ManagerButton onClick={handleButtonClick} styleSize="sm">
              {saving ? '저장중...' : '등록'}
            </ManagerButton>
          </div>
        </div>
      </div>
      {showModal && (
        <ManagerModal
          open={showModal}
          message={
            <div>
              <div className="heading-md-semibold mb-2 text-center">작성중인 글을 취소하겠습니까?</div>
              <div className="body-md-regular text-center text-gray-400">
                작성 취소 선택 시, 작성된 글은 저장되지 않습니다.
              </div>
            </div>
          }
          confirmLabel="작성 취소"
          onConfirm={handleModalConfirm}
          cancelLabel="계속 작성하기"
          onCancel={handleModalCancel}
        />
      )}
    </>
  )
}
