'use client'

import { NoticeManageResponse } from '@/types/manager/notice/type'
import { COLOR_OPTIONS } from '@/utils/manager/notice'
import NoticeDetailHeader from './NoticeDetailHeader'

export default function SessionDetailPublishing(notice: NoticeManageResponse) {
  console.log('notice:', notice)

  const imageUrls = notice.imageUrls || []
  const fileUrls = notice.fileUrls || []

  // 카테고리 컬러 Tailwind 클래스 반환 함수
  const getCategoryClass = (color: string) => {
    const option = COLOR_OPTIONS.find((opt) => opt.value === color)
    return option?.tailwind || 'bg-amber-100 text-amber-700'
  }

  // 읽기 모드일 때
  return (
    <div>
      <NoticeDetailHeader title={notice.title} handleSubmit={() => {}} />
      <div className="flex w-full justify-center py-8">
        <div className="shadow-middlemodal w-[854px] rounded-[12px] bg-white px-8 py-7">
          <div className="mb-5 flex flex-col gap-[20px]">
            <div className="flex gap-2">
              {notice.categories.map((cat) => (
                <span
                  key={cat.color}
                  className={`w-fit rounded-[4px] px-2 py-1 text-sm font-bold ${getCategoryClass(cat.color)}`}
                >
                  {cat.name}
                </span>
              ))}
            </div>
            <div>
              <p className="heading-sm-semibold">{notice.title}</p>
              <p className="body-sm-medium text-gray-400">{notice.createdAt}</p>
            </div>
          </div>

          <div
            className="prose prose-gray max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />

          {fileUrls.length > 0 && (
            <div className="my-10 mb-6 flex flex-col gap-3">
              {fileUrls.map((file) => (
                <div key={file.id} className="flex items-center rounded-[6px] bg-gray-100 px-[10px] py-3">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    download="공지사항 첨부파일.pdf"
                  >
                    공지사항 첨부파일.pdf
                  </a>
                  <span className="body-sm-regular ml-1 text-gray-500">
                    ({file.size ? `${file.size}mb` : '크기 정보 없음'})
                  </span>
                </div>
              ))}
            </div>
          )}

          {imageUrls.length > 0 && (
            <div className="mt-8 space-y-2">
              <div className="grid grid-cols-3 gap-4">
                {imageUrls.map((img, idx) => (
                  <div
                    key={img.id}
                    className="relative flex aspect-square w-full overflow-hidden rounded-[10px] bg-gray-100"
                  >
                    <img src={img.url} alt={`이미지 ${idx + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
