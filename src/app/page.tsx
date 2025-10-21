import { AppleLogoIcon, HomeLogo, KakaoLogoIcon } from '@/assets/svgComponents/member'
import Link from 'next/link'
import { LogoIcon } from '@/assets/svgComponents/manager'

export default function Home() {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`

  return (
    <main className="flex items-center justify-center">
      <div className="desktop:bg-white laptop:bg-white tablet:bg-white bg-primary-500 desktop:flex laptop:flex tablet:flex desktop:items-center desktop:justify-center laptop:items-center laptop:justify-center tablet:items-center tablet:justify-center min-h-screen w-full">
        <div className="desktop:relative-none laptop:relative-none tablet:relative-none desktop:gap-y-[60px] laptop:gap-y-[60px] tablet:gap-y-[60px] relative flex flex-col items-center justify-center px-5">
          <section className="desktop:flex desktop:flex-col desktop:items-center desktop:justify-center desktop:gap-y-3 laptop:flex laptop:flex-col laptop:items-center laptop:justify-center laptop:gap-y-3 tablet:flex tablet:flex-col tablet:items-center tablet:justify-center tablet:gap-y-3 hidden">
            <LogoIcon width={315} height={50} />
            <p className="heading-sm-regular text-gray-500">KUSITMS 관리자 대시보드</p>
          </section>
          <section className="desktop:hidden laptop:hidden tablet:hidden flex min-h-screen flex-col items-center justify-center gap-y-[28px]">
            <HomeLogo width={117} height={97} />
            <p className="heading-sm-semibold text-center text-white">
              큐시즘 출석 서비스 <br />
              KU-CHECK
            </p>
          </section>
          <section className="desktop:w-[420px] desktop:static laptop:static tablet:static desktop:px-0 laptop:px-0 tablet:px-0 fixed bottom-[55px] flex w-[375px] flex-col items-center justify-center gap-y-[36px] px-5">
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
            <p className="desktop:hidden laptop:hidden tablet:hidden caption-md-regular text-primary-100">
              큐시즘 학회원들을 위한 서비스 입니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
