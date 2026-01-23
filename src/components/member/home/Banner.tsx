import Image from 'next/image'

export default function Banner() {
  return (
    <div className="relative h-[80px] w-full">
      <Image src="/banner.png" alt="프로모션 배너" priority fill quality={80} className="rounded-[16px] object-cover" />
    </div>
  )
}
