'use client'

import { useState } from 'react'
import Image from 'next/image'

// 세션 이미지 아이템 컴포넌트
function SessionImageItem({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
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
      />
    </div>
  )
}

export default function SessionDetailPublishing() {
  // 더미 데이터
  const date = '09/22'
  const content = `
    <p>이번 세션에서는 서비스 아이디어를 발표하고 피드백을 주고받는 시간을 가졌습니다.</p>
    <p>참여자 전원이 활발하게 의견을 주고받으며 좋은 아이디어가 많이 나왔어요 ☕</p>
  `
  const sessionImages = [
    { id: 1, url: '/images/sample1.jpg' },
    { id: 2, url: '/images/sample2.jpg' },
    { id: 3, url: '/images/sample3.jpg' },
  ]

  // 읽기 모드일 때
  return (
    <div className="flex w-full justify-center py-8">
      <div className="shadow-middlemodal w-[854px] rounded-[12px] bg-white px-8 py-7">
        <div className="mb-5 flex flex-col gap-1">
          <p className="">
            <span className="rounded-[4px] bg-amber-100 px-2 py-1 text-sm text-amber-700">홍보</span>
          </p>
          <p className="heading-sm-semibold">☕ 아이디어 발표 & 커피챗 세션 ☕</p>
          <p className="body-sm-medium text-gray-400">{date} 19:23</p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: content }} />

        {sessionImages.length > 0 && (
          <div className="mt-8 space-y-2">
            <div className="grid grid-cols-3 gap-4">
              {sessionImages.map((img, idx) => (
                <SessionImageItem key={img.id} imageUrl={img.url} alt={`세션 이미지 ${idx + 1}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
