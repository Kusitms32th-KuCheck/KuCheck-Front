'use client'

import { useRouter } from 'next/navigation'

import MemberTag from '@/components/member/common/MemberTag'
import Image from 'next/image'
import { NoticeCategoryColorType, NoticeType } from '@/types/member/notice'
export default function NoticeCard({ id, title, content, categories, createdAt, imageUrls }: NoticeType) {
  const router = useRouter()

  const getCategoryColor = (color: NoticeCategoryColorType) => {
    switch (color) {
      case 'BLUE':
        return 'bg-[#E5F3FE] text-[#467BE3]'
      case 'RED':
        return 'bg-[#FDEFEC] text-[#B4493E]'
      case 'GREEN':
        return 'bg-[#E2F9E7] text-[#14712B]'
      case 'PURPLE':
        return 'bg-[#EFEAFF] text-[#6B42E0]'
      case 'BROWN':
        return 'bg-[#FFF4EE] text-[#9F5816]'
      case 'YELLOW':
        return 'bg-[#FCF5D8] text-[#995629]'
      case 'TEAL':
        return 'bg-[#E5FEFC] text-[#00B9B0]'
      case 'PINK':
        return 'bg-[#FEE5FE] text-[#F45AD5]'
      case 'ORANGE':
        return 'bg-[#FFF4EE] text-[#FF9C49]'
    }
  }

  return (
    <div
      onClick={() => {
        router.push(`/notice/${id}`)
      }}
      className="flex w-full cursor-pointer items-end gap-x-[15px] border-b border-gray-200 py-[20px]"
    >
      <section className="flex flex-col">
        <div className="flex flex-col gap-y-[18px]">
          <div className="flex flex-col gap-y-[10px]">
            <section className="flex gap-x-2">
              {categories.map((category) => {
                return (
                  <div key={category.color}>
                    <MemberTag customClassName={getCategoryColor(category.color)} status={'default'} type={'category'}>
                      {category.name}
                    </MemberTag>
                  </div>
                )
              })}
            </section>

            <div className="flex flex-col gap-y-[6px]">
              <p className="body-lg-medium">{title}</p>
              <p className="body-sm-regular line-clamp-2">{content}</p>
            </div>
          </div>

          <p className="caption-sm-medium text-gray-400">{createdAt}</p>
        </div>
      </section>
      {imageUrls && imageUrls.length > 0 ? (
        <div className="relative flex h-[95px] w-[95px] shrink-0 rounded-[6px] border border-gray-200 whitespace-nowrap">
          <Image fill src={imageUrls[0].url} alt="이미지" className="rounded-[6px] object-cover"></Image>
          <>
            <div className="absolute right-[7px] bottom-1 z-10 flex h-[14px] w-[14px] items-center justify-center rounded-[3px] bg-[#3A4047] text-white">
              <p className="font-pretendard text-[8px] font-medium text-white">{imageUrls.length}</p>
            </div>
            <div className="absolute right-1 bottom-[7px] h-[14px] w-[14px] rounded-[3px] bg-[#BDBDBD]" />
          </>
        </div>
      ) : null}
    </div>
  )
}
