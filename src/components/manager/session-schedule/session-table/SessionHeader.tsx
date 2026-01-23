'use client'

import React, { useEffect, useState, useRef } from 'react'
import ManagerButton from '../../common/ManagerButton'
import { useSessionEdit } from './SessionEditContext'
import ManagerModal from '@/components/manager/common/ManagerModal'
import { useRouter } from 'next/navigation'
import { HeaderArrowRight } from '@/assets/svgComponents/manager'

export default function SessionHeader({ saveOnly = false, editNone = false }: { saveOnly?: boolean, editNone?: boolean }) {
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [saving, setSaving] = useState(false)

  const { isEditing, toggleEdit, runSaveHandlers, resetToOriginal } = useSessionEdit()
  const [feedbackMessage, setFeedbackMessage] = useState<React.ReactNode | null>(null)
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  // 세션 추가 폼/테이블의 입력 상태를 window에서 가져옴
  const [isAllFilled, setIsAllFilled] = useState(false)
  useEffect(() => {
    const checkFilled = () => {
      // window.__sessionAddAllFilled은 SessionAddTable에서 관리
      setIsAllFilled(Boolean(window.__sessionAddAllFilled))
    }
    window.addEventListener('sessionAddFilledChange', checkFilled)
    checkFilled()
    return () => {
      window.removeEventListener('sessionAddFilledChange', checkFilled)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector('main')
      if (!mainContent) return

      const currentScroll = mainContent.scrollTop
      setShowStickyHeader(currentScroll > 0)
    }

    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll)
      return () => mainContent.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
    }
  }, [])

  const handleReset = () => {
    if (resetToOriginal && typeof resetToOriginal.current === 'function') {
      resetToOriginal.current()
    }
  }

  const handleHeaderButton = async () => {
    setSaving(true)
    try {
      const ok = await runSaveHandlers()
      if (ok) {
        setFeedbackMessage(<span className="text-primary-500">성공적으로 저장되었어요</span>)
        if (isEditing) toggleEdit()
        if (saveOnly && router) router.push('/session-schedule/edit')
      } else {
        setFeedbackMessage(<span>저장에 실패했어요. 다시 시도해주세요</span>)
      }
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
      feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1000)
    } finally {
      setSaving(false)
    }
  }

  const HeaderContent = () => {
    if (saveOnly) {
      // 세션 추가 페이지
      return (
        <>
          <p className="heading-lg-medium">세션 일정</p>
          <ManagerButton onClick={handleHeaderButton} styleSize="sm" disabled={saving || !isAllFilled}>
            {saving ? '저장중...' : '저장하기'}
          </ManagerButton>
        </>
      )
    }
    // 세션 수정 페이지: PointHeader 스타일
    return isEditing ? (
      <>
        {/* 수정 모드 - 브레드크럼 */}
        <div className="flex items-center gap-2">
          <span className="heading-lg-medium text-gray-600">세션 일정</span>
          <HeaderArrowRight width={24} height={24} />
          <span className="heading-lg-medium">수정하기</span>
        </div>
        {/* 수정 모드 - 초기화/저장하기 버튼 */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="body-lg-medium body-sm-medium h-[36px] w-[73px] rounded-[4px] bg-white text-gray-900"
          >
            초기화
          </button>
          <ManagerButton onClick={handleHeaderButton} styleSize="sm" disabled={saving}>
            {saving ? '저장중...' : '저장하기'}
          </ManagerButton>
        </div>
      </>
    ) : (
      <>
        {/* 일반 모드 */}
        <p className="heading-lg-medium">세션 일정</p>
      {editNone === false &&  <ManagerButton onClick={toggleEdit} styleSize="sm" disabled={false}>
          수정하기
        </ManagerButton>}
      </>
    )
  }

  return (
    <>
      {showStickyHeader && (
        <div
          className="fixed top-[68px] right-0 left-[240px] z-50 flex h-[110px] items-center justify-between bg-white px-[30px] py-[18px]"
          style={{ boxShadow: '4px 4px 13px -6px rgba(0, 0, 0, 0.1)' }}
        >
          <HeaderContent />
        </div>
      )}

      <div className="flex flex-row items-center justify-between px-8 pt-8">
        <HeaderContent />
      </div>

      {feedbackMessage && (
        <ManagerModal
          open={true}
          transientMessage={feedbackMessage}
          onTransientClose={() => {}}
          onCancel={() => {}}
          onConfirm={() => {}}
        />
      )}
    </>
  )
}
