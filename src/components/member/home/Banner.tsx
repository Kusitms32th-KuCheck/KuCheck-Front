import Image from 'next/image'

export default function Banner() {
  return (
    <div className="relative h-[80px] w-full overflow-hidden rounded-[16px] bg-white shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)]">
      <Image
        src="/banner.png"
        alt="프로모션 배너"
        fill
        priority
        quality={80}
        sizes="(max-width: 375px) 343px, (max-width: 768px) 704px, 1200px"
        className="rounded-[16px] object-cover"
      />
    </div>
  )
}
