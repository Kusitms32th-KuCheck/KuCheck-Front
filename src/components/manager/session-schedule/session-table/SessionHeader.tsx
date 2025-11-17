'use client'

import React, { useEffect, useState, useRef } from 'react'
import ManagerButton from '../../common/ManagerButton'
import { useSessionEdit } from './SessionEditContext'
import ManagerModal from '@/components/manager/common/ManagerModal'
import { useRouter } from 'next/navigation'

export default function SessionHeader({ saveOnly = false }: { saveOnly?: boolean }) {
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [saving, setSaving] = useState(false)

  const { isEditing, toggleEdit, runSaveHandlers } = useSessionEdit()
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

  const handleHeaderButton = async () => {
    if (saveOnly) {
      setSaving(true)
      try {
        const ok = await runSaveHandlers()
        if (ok) {
          setFeedbackMessage(<span className="text-primary-500">성공적으로 저장되었어요</span>)
        } else {
          setFeedbackMessage(<span>저장에 실패했어요. 다시 시도해주세요</span>)
        }
        if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
        feedbackTimerRef.current = setTimeout(() => {
          setFeedbackMessage(null)
          if (ok) {
            router.push('/session-schedule/edit')
          }
        }, 1000)
      } finally {
        setSaving(false)
      }
      return
    }

    if (!isEditing) {
      toggleEdit()
      return
    }

    setSaving(true)
    try {
      const ok = await runSaveHandlers()
      if (ok) {
        toggleEdit()
        setFeedbackMessage(<span className="text-primary-500">성공적으로 저장되었어요</span>)
      } else {
        setFeedbackMessage(<span>저장에 실패했어요. 다시 시도해주세요</span>)
      }
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
      feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1000)
    } finally {
      setSaving(false)
    }
  }

  const HeaderContent = () => (
    <>
      <p className="heading-lg-medium">세션 일정</p>
      <ManagerButton
        onClick={handleHeaderButton}
        styleSize="sm"
        disabled={saving || !isAllFilled}
        className={saving || !isAllFilled ? 'bg-gray-500 text-white' : ''}
      >
        {saving ? '저장중...' : saveOnly ? '저장하기' : isEditing ? '저장하기' : '수정하기'}
      </ManagerButton>
    </>
  )

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

      <div className="flex flex-row items-center justify-between px-6 pt-8">
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
