import Link from 'next/link'
import { Error404Icon } from '@/assets/svgComponents/member'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-[25px] border bg-white">
      <div className="flex flex-col items-center justify-center">
        <Error404Icon width={68} height={68} />
        <h2 className="body-lg-medium text-gray-500">페이지를 찾을 수 없어요</h2>
      </div>
      <Link href="/">
        <span className="caption-sm-semibold rounded-full border border-gray-300 px-3 py-2 text-gray-400">
          홈으로 돌아가기
        </span>
      </Link>
    </div>
  )
}
