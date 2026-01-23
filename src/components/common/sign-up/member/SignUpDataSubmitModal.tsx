import { BlueHomeLogoIcon } from '@/assets/svgComponents/member'

export default function SignUpDataSubmitModal() {
  return (
    <main className="fixed inset-0 z-60 flex flex-1 flex-col items-center justify-center bg-white">
      <section className="flex flex-col items-center gap-y-[40px] px-5 pt-[32px]">
        <BlueHomeLogoIcon width={117} height={97} />
        <div className="flex flex-col items-center gap-y-2">
          <p className="heading-md-bold text-primary-500">승인 절차를 진행 중이에요</p>
          <p className="body-lg-regular text-gray-500">승인이 완료되면 바로 알려드릴게요!</p>
        </div>
      </section>

      <p className="body-sm-regular fixed bottom-[53px] text-center text-gray-500">
        일주일 이상 승인되지 않을 시,
        <br />
        경영총괄팀으로 문의해주세요
        <br />
        <br />
        kusitms.management@gmail.com
      </p>
    </main>
  )
}
