import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { WhiteXIcon } from '@/assets/svgComponents/member'

interface ImageModalProps {
  ImageUrl: string | undefined | null
  setSelectedImageUrl: Dispatch<SetStateAction<string | undefined | null>>
  setIsImageModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function ImageModal({ ImageUrl, setSelectedImageUrl, setIsImageModalOpen }: ImageModalProps) {
  const handleCloseModal = () => {
    setSelectedImageUrl(undefined)
    setIsImageModalOpen(false)
  }

  // 이미지 클릭 시 모달이 닫히지 않도록 이벤트 전파 중단
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      onClick={handleCloseModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,1)]"
    >
      <button
        onClick={handleCloseModal}
        className="absolute top-[32px] right-[28px] z-60 flex cursor-pointer items-center text-white transition-colors"
      >
        <WhiteXIcon width={32} height={32} />
      </button>
      <div className="bg-white relative" onClick={handleImageClick}>
        <Image
          src={ImageUrl || '/pizza.png'}
          alt="BottomModal Image"
          width={0}
          height={0}
          sizes="90vw"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
