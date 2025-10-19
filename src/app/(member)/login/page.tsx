import { AppleLogoIcon, HomeLogo, KakaoLogoIcon } from '@/assets/svgComponents/member'
import Link from 'next/link'

export default function LoginPage() {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`

  return (
    <div className="relative flex flex-col items-center justify-center px-5">
      <div className="flex min-h-screen flex-col items-center justify-center gap-y-[28px]">
        <HomeLogo width={117} height={97} />
        <p className="heading-sm-semibold text-center text-white">
          큐시즘 출석 서비스 <br />
          KU-CHECK
        </p>
      </div>
      <div className="fixed bottom-[55px] flex w-[375px] flex-col items-center justify-center gap-y-[36px] px-5">
        <div className="flex w-full flex-col gap-y-2">
          <Link
            href={kakaoAuthUrl}
            className="body-md-semibold flex h-[44px] w-full items-center justify-center gap-x-2 rounded-[8px] bg-[#FEE500]"
          >
            <KakaoLogoIcon width={18} height={18} />
            카카오 로그인
          </Link>
          <Link
            className="body-md-semibold flex h-[44px] items-center justify-center rounded-[8px] bg-black text-white"
            href={''}
          >
            <AppleLogoIcon width={24} height={24} />
            Apple로 계속하기
          </Link>
        </div>
        <p className="caption-md-regular text-primary-100">큐시즘 학회원들을 위한 서비스 입니다.</p>
      </div>
    </div>
  )
}
