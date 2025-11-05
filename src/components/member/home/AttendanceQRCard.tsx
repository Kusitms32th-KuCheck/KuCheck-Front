'use client'

import { QrIcon } from '@/assets/svgComponents'
import { useToast } from '@/components/member/common/toast/ToastContext'
import { useRouter } from 'next/navigation'
import { getAvailability } from '@/lib/member/client/attendance'
import { AttendanceAvailabilityReasonType } from '@/types/member/attendance'

export default function AttendanceQRCard() {
  const { info } = useToast()
  const router = useRouter()

  const handleClick = async () => {
    const result = await getAvailability()
    if (result.data?.data?.available) {
      router.push('/attendance-check')
    } else {
      info(switchReasonEnumToContext(result.data?.data?.reason))
    }
  }

  const switchReasonEnumToContext = (context: AttendanceAvailabilityReasonType | undefined): string => {
    switch (context) {
      case 'ALREADY_RECORDED':
        return '이미 오늘 출석이 완료되었어요'
      case 'NO_OPEN_SESSION':
        return '아직 출석시간이 아니에요'
      default:
        return '출석을 할 수 없어요'
    }
  }

  return (
    <div
      onClick={handleClick}
      className="bg-primary-500 relative h-[143px] w-[133px] flex-shrink-0 rounded-[16px] pt-[17px] pr-[15px] pb-[16px] pl-[18px]"
    >
      <p className="body-lg-semibold text-white">출석하기 QR</p>
      <QrIcon className="absolute right-[15px] bottom-[16px]" width={54} height={54} />
    </div>
  )
}
