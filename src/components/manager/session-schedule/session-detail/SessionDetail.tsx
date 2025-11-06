'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SessionDetailResponse } from '@/types/manager/session/type'
import { postClientSessionDetail } from '@/lib/manager/client/session'
import { useSessionEdit } from '../session-table/SessionEditContext'
import AddHeader from '../add-post/AddHeader'
import AddBody from '../add-post/AddBody'
import Image from 'next/image'

export default function SessionDetail({
  sessionDetail,
  date,
}: {
  sessionDetail: SessionDetailResponse
  date?: string | null
}) {
  const router = useRouter()
  const { isEditing, registerSaveHandler } = useSessionEdit()
  const {
    place: initialPlace,
    startTime: initialStartTime,
    endTime: initialEndTime,
    content: initialContent,
    sessionImages,
  } = sessionDetail

  // 수정 모드를 위한 상태
  const [place, setPlace] = useState(initialPlace || '')
  const [startTime, setStartTime] = useState(initialStartTime || '')
  const [endTime, setEndTime] = useState(initialEndTime || '')
  const [content, setContent] = useState(initialContent || '')

  const handleSave = async () => {
    if (!place || !startTime || !endTime || !content) {
      console.log('모든 항목을 입력해주세요.')
      return false
    }

    const detailData = {
      sessionId: sessionDetail.sessionDetailId, // 임시로 sessionDetailId 사용
      place,
      startTime,
      endTime,
      content,
    }

    console.log('세션 상세 수정 요청:', detailData)

    try {
      const result = await postClientSessionDetail(detailData)
      console.log('세션 상세 수정 응답:', result)

      if (result.success) {
        console.log('세션 상세 수정 성공!')
        // 페이지 새로고침하여 수정된 내용 반영
        router.refresh()
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
    if (isEditing) {
      const unregister = registerSaveHandler(handleSave)
      return () => {
        if (typeof unregister === 'function') unregister()
      }
    }
  }, [isEditing, registerSaveHandler, place, startTime, endTime, content])

  // 수정 모드일 때는 편집 가능한 폼을 보여줌
  if (isEditing) {
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

  // 읽기 모드일 때는 기존 UI를 보여줌
  return (
    <div className="flex w-full justify-center py-8">
      <div className="shadow-middlemodal w-[854px] rounded-[12px] bg-white px-8 py-7">
        <div className="mb-5 flex flex-col gap-1">
          <p className="heading-sm-semibold">☕ 아이디어 발표 & 커피챗 세션 ☕</p>
          <p className="body-sm-medium text-gray-400">09/22 19:23</p>
        </div>
        <div className="mb-6 space-y-2">
          <div className="bg-primary-50 flex items-start gap-[10px] rounded-[8px] px-4 py-3">
            <span className="body-sm-medium text-primary-500">장소</span>
            <span className="body-sm-medium text-gray-900">{initialPlace}</span>
          </div>
          <div className="bg-primary-50 flex items-start gap-[10px] rounded-[8px] px-4 py-3">
            <span className="body-sm-medium text-primary-500">일시</span>
            <span className="body-sm-medium text-gray-800">
              {date} (토) {initialStartTime?.slice(0, 5)} ~ {initialEndTime?.slice(0, 5)}
            </span>
          </div>
        </div>
        <div
          className="prose prose-gray max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: initialContent }}
        />
        {sessionImages && sessionImages.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            {sessionImages.map((img, idx) => (
              <div key={idx} className="relative aspect-square w-full overflow-hidden rounded-[10px] bg-gray-100">
                <Image src={img.url} alt={`세션 이미지 ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
