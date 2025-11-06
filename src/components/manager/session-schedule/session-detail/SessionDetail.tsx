'use client'

import { SessionDetailResponse } from '@/types/manager/session/type'
import Image from 'next/image'

export default function SessionDetail({
  sessionDetail,
  date,
}: {
  sessionDetail: SessionDetailResponse
  date?: string | null
}) {
  const { place, startTime, endTime, content, sessionImages } = sessionDetail

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
            <span className="body-sm-medium text-gray-900">{place}</span>
          </div>
          <div className="bg-primary-50 flex items-start gap-[10px] rounded-[8px] px-4 py-3">
            <span className="body-sm-medium text-primary-500">일시</span>
            <span className="body-sm-medium text-gray-800">
              {date} (토) {startTime?.slice(0, 5)} ~ {endTime?.slice(0, 5)}
            </span>
          </div>
        </div>
        <div className="prose prose-gray max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: content }} />
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
