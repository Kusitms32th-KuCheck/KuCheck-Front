'use client'

import Image from 'next/image'
import { SessionDetailType } from '@/types/member/session'
import ImageModal from '@/components/member/common/ImageModal'
import { useState } from 'react'

interface ImageContainerProps {
  sessionData: SessionDetailType | undefined
}

export default function ImageContainer({sessionData}: ImageContainerProps) {
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
      {sessionData?.images && sessionData.images.length > 0 && (
      <section className="flex flex-col gap-y-2">
        {sessionData.images.map((image) => (
          <div className="relative w-full h-[335px]" key={image}>
            <Image src={image} fill alt="그림" className="object-cover" />
          </div>
        ))}
      </section>
    )}
    </>

  )
}
