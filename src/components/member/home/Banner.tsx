import Image from 'next/image'

export default function Banner() {
  return (
    <div className="relative flex h-[80px] flex-col rounded-[16px] bg-white shadow-[0_2px_12.9px_0_rgba(0,0,0,0.05)]">
      <Image src={'/banner.png'} alt={'배너'} fill className="rounded-[16px] object-cover"></Image>
    </div>
  )
}
