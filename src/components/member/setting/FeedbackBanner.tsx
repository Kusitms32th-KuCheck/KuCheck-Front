import { ChevronRightPrimary500Icon, FeedbackBannerProfileIcon } from '@/assets/svgComponents/member'
import Link from 'next/link'

interface FeedbackBannerProps {
  href: string
}

export default function FeedbackBanner({href}: FeedbackBannerProps) {
  return (
    <Link href={href} className="mx-[20px] items-center mt-[6px] flex justify-between rounded-[14px] bg-primary-50 pl-[25px] pr-[16px] pt-[15px] pb-[19px]">
      <div className="flex flex-col">
        <div className="flex items-center">
          <p className="body-lg-semibold text-primary-500">사용중 불편한 점이 있었나요?</p>
          <ChevronRightPrimary500Icon width={32} height={32} />
        </div>
        <p className="body-sm-regular text-gray-600">개선 사항 혹은 광고 문의는 이곳으로!</p>
      </div>

      <FeedbackBannerProfileIcon width={58} height={45} />
    </Link>
  )
}
