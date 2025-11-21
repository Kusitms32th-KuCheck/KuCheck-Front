'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import ManagerButton from '../../common/ManagerButton'
import { ArrowLeftIcon } from '@/assets/svgComponents/manager'
import { useSessionEdit } from '@/components/manager/session-schedule/session-table/SessionEditContext'
import { useSessionScheduleStore } from '@/store/manager/useSessionScheduleStore'
import ManagerModal from '../../common/ManagerModal'

export default function WriteHeader() {
  const router = useRouter()
  const pathname = usePathname() || '' // pathname이 undefined일 경우 빈 문자열로 처리
  const { runSaveHandlers, isEditing, setEditing } = useSessionEdit()
  const selectedSessionName = useSessionScheduleStore((state) => state.selectedSessionName)
  const [saving, setSaving] = useState(false)

  // 항상 문자열에서 includes를 사용하도록 보장
  const isDetailAddPage = pathname.includes('/detail-add')
  const isEditMode = isDetailAddPage || isEditing

  const handleButtonClick = async () => {
    if (!isEditMode) {
      setEditing(true)
      return
    }

    setSaving(true)
    try {
      const ok = await runSaveHandlers()
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
      router.push('/session-schedule/edit')
    }
  }

  const handleModalCancel = () => {
    setShowModal(false)
  }
  const handleModalConfirm = () => {
    setEditing(false)
    setShowModal(false)
    router.push('/session-schedule/edit')
  }

  return (
    <>
      <div className="align-center sticky top-0 z-10 flex h-[110px] flex-col gap-4 bg-white px-[30px] pt-[12px]">
        <button
          className="flex w-full cursor-pointer items-center justify-start gap-1"
          type="button"
          onClick={handleBackClick}
          aria-label="세션일정으로 이동"
        >
          <ArrowLeftIcon width={16} />
          <span className="body-lg-medium text-gray-600">세션 일정</span>
        </button>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="heading-lg-medium">{selectedSessionName || '세션이름없음'}</p>
          <ManagerButton onClick={handleButtonClick} styleSize="sm">
            {saving ? '저장중...' : isEditMode ? '저장하기' : '수정하기'}
          </ManagerButton>
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
