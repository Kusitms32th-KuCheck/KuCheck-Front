import Link from 'next/link'

export default function EtcContainer() {
  return (
    <section className="flex flex-col gap-y-[18px] px-5 py-[18px]">
      <p className="caption-sm-semibold">기타</p>
      <div className="flex flex-col gap-y-[18px]">
        <Link href={'/setting/people'} className="body-lg-regular flex cursor-pointer items-start">
          만든 사람들
        </Link>
        <button className="body-lg-regular flex cursor-pointer items-start justify-between">
          <p>버전 정보</p>
          <p className="body-lg-regular text-gray-300">1.0.0</p>
        </button>
      </div>
    </section>
  )
}
