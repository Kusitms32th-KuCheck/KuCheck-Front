import Link from 'next/link'

import { QrIcon } from '@/assets/svgComponents'

export default function AttendanceQRCard() {
  return (
    <Link
      href={'/attendance-check'}
      className="bg-primary-500 relative h-[143px] w-[133px] flex-shrink-0 rounded-[16px] pt-[17px] pr-[15px] pb-[16px] pl-[18px]"
    >
      <p className="body-lg-semibold text-white">출석하기 QR</p>
      <QrIcon className="absolute right-[15px] bottom-[16px]" width={54} height={54} />
    </Link>
  )
}
