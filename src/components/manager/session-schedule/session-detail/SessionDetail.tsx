'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SessionDetailResponse } from '@/types/manager/session/type'
import { postClientSessionDetail } from '@/lib/manager/client/session'
import { useSessionEdit } from '../session-table/SessionEditContext'
import { useSessionScheduleStore } from '@/store/manager/useSessionScheduleStore'
import AddHeader from '../add-post/AddHeader'
import AddBody from '../add-post/AddBody'
import Image from 'next/image'

// 세션 이미지 아이템 컴포넌트
function SessionImageItem({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageError = () => {
    console.error('이미지 로드 실패:', {
      url: imageUrl,
      timestamp: new Date().toISOString(),
      possibleCause: 'presigned URL 만료 또는 권한 부족',
    })
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    console.log('이미지 로드 성공:', imageUrl)
    setIsLoading(false)
  }

  if (imageError) {
    return (
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[10px] bg-gray-100">
        <div className="p-4 text-center">
          <div className="mb-2 text-sm text-gray-400">📷</div>
          <div className="text-xs text-gray-500">이미지를 불러올 수 없습니다</div>
          <button
            onClick={() => {
              setImageError(false)
              setIsLoading(true)
            }}
            className="mt-1 text-xs text-blue-500 hover:underline"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[10px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm text-gray-400">로딩 중...</div>
        </div>
      )}
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover"
        onError={handleImageError}
        onLoad={handleImageLoad}
        onLoadStart={() => setIsLoading(true)}
      />
    </div>
  )
}

export default function SessionDetail({
  sessionDetail,
  date,
  sessionId,
  sessionDetailId: initialSessionDetailId,
}: {
  sessionDetail: SessionDetailResponse
  date?: string | null
  sessionId?: number
  sessionDetailId: number
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

  // 세션 디테일 ID 상태 관리 (현재 URL의 sessionDetailId 추적용)
  const [, setCurrentSessionDetailId] = useState(initialSessionDetailId)

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
      sessionId: sessionId || sessionDetail.sessionDetailId, // sessionId 우선, 없으면 sessionDetailId 사용
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

        // 새로운 sessionDetailId로 상태 업데이트
        const newSessionDetailId = result.data.sessionDetailId
        setCurrentSessionDetailId(newSessionDetailId)

        const currentUrl = new URL(window.location.href)
        const newPath = currentUrl.pathname.replace(/\/\d+/, `/${newSessionDetailId}`)
        const newUrl = `${newPath}${currentUrl.search}`

        console.log('새로운 sessionDetailId로 페이지 이동:', {
          oldUrl: window.location.href,
          newUrl: newUrl,
          newSessionDetailId,
        })

        // router.push를 사용하여 완전히 새로운 페이지로 이동
        router.push(newUrl)
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
      <div className="mx-auto mt-6 mb-6 w-[854px] space-y-6">
        <AddHeader
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

  const selectedSessionName = useSessionScheduleStore(
    (state: import('@/store/manager/useSessionScheduleStore').SessionScheduleStore) => state.selectedSessionName
  )
  // 읽기 모드일 때는 기존 UI를 보여줌
  return (
    <div className="flex w-full justify-center py-8">
      <div className="shadow-middlemodal w-[854px] rounded-[12px] bg-white px-8 py-7">
        <div className="mb-5 flex flex-col gap-1">
          <p className="heading-sm-semibold">{selectedSessionName || '세션이름없음'}</p>
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
          <div className="mt-8 space-y-2">
            <div className="grid grid-cols-3 gap-4">
              {sessionImages.map((img, idx) => (
                <SessionImageItem
                  key={img.sessionImageId || idx}
                  imageUrl={img.sessionImagePreSignedUrl}
                  alt={`세션 이미지 ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
