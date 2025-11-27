'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AddHeader from '../add-post/AddHeader'
import AddBody from '../add-post/AddBody'
import { SessionDetailResponse } from '@/types/manager/session/type'
import { postClientSessionDetail } from '@/lib/manager/client/session'
import { useSessionEdit } from '../session-table/SessionEditContext'
import { SessionImage } from '@/types/manager/session/type'

type SessionDetailEditProps = {
  sessionDetail: SessionDetailResponse
  sessionDetailId: number
  sessionId: number
  date?: string | null
}

export default function SessionDetailEdit({ sessionDetail, sessionDetailId, sessionId, date }: SessionDetailEditProps) {
  const router = useRouter()
  const { registerSaveHandler } = useSessionEdit()

  // 기존 데이터로 초기값 설정
  const [place, setPlace] = useState(sessionDetail.place || '')
  const [startTime, setStartTime] = useState(sessionDetail.startTime || '')
  const [endTime, setEndTime] = useState(sessionDetail.endTime || '')
  const [content, setContent] = useState(sessionDetail.content || '')
  const [editImage, setEditImage] = useState<SessionImage[]>(sessionDetail.sessionImages || [])
  const handleSave = async () => {
    if (!place || !startTime || !endTime || !content) {
      console.log('모든 항목을 입력해주세요.')
      return false
    }

    const detailData = {
      sessionId,
      place,
      startTime,
      endTime,
      content,
    }

    console.log('세션 상세 수정 요청:', detailData)

    try {
      const result = await postClientSessionDetail(detailData)
      console.log('세션 상세 수정 응답:', result)

      if (result.success && result.data?.sessionDetailId) {
        console.log('세션 상세 수정 성공! 새로운 sessionDetailId:', result.data.sessionDetailId)
        const newSessionDetailId = result.data.sessionDetailId
        const currentUrl = new URL(window.location.href)
        const sessionIdParam = currentUrl.searchParams.get('sessionId')
        let targetUrl = `/session-schedule/detail/${newSessionDetailId}`
        const queryParams = new URLSearchParams()
        if (date) {
          queryParams.set('date', date)
        }
        if (sessionIdParam) {
          queryParams.set('sessionId', sessionIdParam)
        }
        if (queryParams.toString()) {
          targetUrl += `?${queryParams.toString()}`
        }
        console.log('세션 상세 수정 후 이동할 URL:', {
          oldSessionDetailId: sessionDetailId,
          newSessionDetailId: newSessionDetailId,
          targetUrl: targetUrl,
        })
        router.push(targetUrl)
        return true
      } else {
        console.log('세션 상세 수정 실패:', result.error)
        return false
      }
    } catch (error) {
      console.log('세션 상세 수정 에러:', error)
      return false
    }
  }

  useEffect(() => {
    console.log('SessionDetailEdit - sessionDetailId:', sessionDetailId, 'date:', date)
    const unregister = registerSaveHandler(handleSave)
    return () => {
      if (typeof unregister === 'function') unregister()
    }
  }, [registerSaveHandler, sessionDetailId, place, startTime, endTime, content])

  return (
    <div className="mt-6 mb-6 w-[854px] space-y-6">
      <AddHeader
        editImage={editImage}
        setEditImage={setEditImage}
        place={place}
        setPlace={setPlace}
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        date={date}
      />
      <AddBody content={content} setContent={setContent} />
    </div>
  )
}
