'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import AddHeader from '../add-post/AddHeader'
import AddBody from '../add-post/AddBody'
import { postClientSessionDetail } from '@/lib/manager/client/session'
import { useSessionEdit } from '../session-table/SessionEditContext'

export default function SessionDetailAdd() {
  const { sessionId } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const date = searchParams.get('date')
  const { registerSaveHandler } = useSessionEdit()
  const [place, setPlace] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [content, setContent] = useState('')

  const handleSave = async () => {
    if (!sessionId) {
      console.log('sessionId가 없습니다.')
      return false
    }
    if (!place || !startTime || !endTime || !content) {
      console.log('모든 항목을 입력해주세요.')
      return false
    }

    const detailData = {
      sessionId: Number(sessionId),
      place,
      startTime,
      endTime,
      content,
    }

    console.log('세션 상세 저장 요청:', detailData)

    try {
      const result = await postClientSessionDetail(detailData)
      console.log('세션 상세 저장 응답:', result)

      if (result.success) {
        console.log('세션 상세 저장 성공!')
        const sessionDetailId = result.data?.sessionDetailId
        const dateParam = date ? `?date=${encodeURIComponent(date)}` : ''
        const targetUrl = `/session-schedule/detail/${sessionDetailId}${dateParam}`
        console.log('세션 상세 저장 후 이동할 URL:', targetUrl, 'sessionDetailId:', sessionDetailId, 'date:', date)
        setTimeout(() => {
          router.push(targetUrl)
        }, 1000)
        return true
      } else {
        console.log('세션 상세 저장 실패:', result.error)
        return false
      }
    } catch (error) {
      console.log('세션 상세 저장 에러:', error)
      return false
    }
  }

  useEffect(() => {
    console.log('SessionDetailAdd - sessionId:', sessionId, 'date:', date)
    const unregister = registerSaveHandler(handleSave)
    return () => {
      if (typeof unregister === 'function') unregister()
    }
  }, [registerSaveHandler, sessionId, place, startTime, endTime, content])

  return (
    <div className="mt-6 mb-6 w-[854px] space-y-6">
      <AddHeader
        type="session"
        place={place}
        setPlace={setPlace}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        date={date}
      />
      <AddBody content={content} setContent={setContent} />
    </div>
  )
}
