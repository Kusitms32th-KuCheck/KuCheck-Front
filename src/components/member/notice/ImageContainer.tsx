'use client'

import Image from 'next/image'
import { NoticeType } from '@/types/member/notice'
import { useState } from 'react'
import ImageModal from '@/components/member/common/ImageModal'

interface ImageContainerProps { noticeData: NoticeType; }

export default function ImageContainer({noticeData}: ImageContainerProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>()

  return (
    <>
      {isImageModalOpen ? (
        <ImageModal
          ImageUrl={selectedImageUrl}
          setSelectedImageUrl={setSelectedImageUrl}
          setIsImageModalOpen={setIsImageModalOpen}
        />
      ) : null}
      {noticeData.imageUrls && noticeData.imageUrls.length > 0 && (
        <section className="flex flex-col gap-y-2 my-[23px]">
          {noticeData.imageUrls.map((image) => (
            <div onClick={() =>{
              setIsImageModalOpen(true)
              setSelectedImageUrl(image.url)
            } } className="relative w-full h-[335]" key={image.id}>
              <Image src={image.url} alt={'이미지'} fill className="object-cover rounded-[12px]"/>
            </div>
          ))}
        </section>
      )}
    </>
  )
}
