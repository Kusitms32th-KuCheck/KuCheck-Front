import Link from 'next/link'

export default function TermsOfServiceContainer() {
  return (
    <section className="flex flex-col gap-y-[18px] border-b border-gray-100 px-5 py-[18px]">
      <p className="caption-sm-semibold">서비스 안내</p>
      <div className="flex flex-col gap-y-[18px]">
        <Link href={'/setting/privacy-policy'} className="body-lg-regular flex cursor-pointer items-start">
          개인정보 처리 방침
        </Link>
        <Link href={'/setting/service-term'} className="body-lg-regular flex cursor-pointer items-start">
          서비스 이용 약관
        </Link>
      </div>
    </section>
  )
}
