'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import ManagerButton from '../../common/ManagerButton'
import { ArrowLeftIcon } from '@/assets/svgComponents/manager'
import ManagerModal from '../../common/ManagerModal'

interface NoticeAddHeaderProps {
  title: string
  handleSubmit: () => Promise<void>
}

export default function NoticeDetailHeader({ title, handleSubmit }: NoticeAddHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isEditing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isDetailAddPage = pathname?.includes('/detail-add')
  const isEditMode = isDetailAddPage || isEditing

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleButtonClick = async () => {
    if (!isEditMode) {
      setEditing(true)
      return
    }

    setSaving(true)
    try {
      await handleSubmit()
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

  const handleModalCancel = () => setShowModal(false)
  const handleModalConfirm = () => {
    setEditing(false)
    setShowModal(false)
    router.push('/create-notice')
  }

  return (
    <>
      <div
        className={`sticky top-0 z-10 flex h-[110px] w-full flex-col gap-4 bg-white px-[30px] py-3 transition-shadow duration-200 ${isScrolled ? 'shadow-[0_2px_8px_rgba(0,0,0,0.12)]' : ''} `}
      >
        <button
          className="flex w-full cursor-pointer items-center justify-start gap-1"
          type="button"
          onClick={handleBackClick}
        >
          <ArrowLeftIcon width={16} />
          <span className="body-lg-medium text-gray-600">공지 등록</span>
        </button>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="heading-lg-medium">{title}</p>
          <div className="flex gap-[22px]">
            <ManagerButton onClick={handleButtonClick} styleSize="sm">
              {saving ? '저장중...' : '수정하기'}
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
