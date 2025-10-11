import MemberHeader from '@/components/member/common/MemberHeader'

export default function People() {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] min-h-screen bg-white">
        <MemberHeader headerType="dynamic" title={'만든 사람들'} />
        <div className="h-[116px]" />
        <div className="flex flex-col">
          <section className="flex flex-col gap-y-[28px] border-b border-gray-100 px-5 py-[32px]">
            <div className="flex items-center gap-x-5">
              <div className="h-[84px] w-[84px] rounded-full bg-gray-100" />
              <div className="flex flex-col">
                <p className="body-lg-semibold text-primary-500">한인우 / lnwoo</p>
                <p className="body-sm-medium text-gray-500">Plan / PM</p>
                <p className="body-sm-medium">랄라라</p>
              </div>
            </div>
            <div className="flex items-center gap-x-5">
              <div className="h-[84px] w-[84px] rounded-full bg-gray-100" />
              <div className="flex flex-col">
                <p className="body-lg-semibold text-primary-500">이현진 / Inu</p>
                <p className="body-sm-medium text-gray-500">Plan</p>
                <p className="body-sm-medium">PM의 애착인형</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-y-[28px] border-b border-gray-100 px-5 py-[32px]">
            <div className="flex items-center gap-x-5">
              <div className="h-[84px] w-[84px] rounded-full bg-gray-100" />
              <div className="flex flex-col">
                <p className="body-lg-semibold text-primary-500">강주언 / jueonii</p>
                <p className="body-sm-medium text-gray-500">Design</p>
                <p className="body-sm-medium">PM의 인 마이 포켓 Girl~</p>
              </div>
            </div>
            <div className="flex items-center gap-x-5">
              <div className="h-[84px] w-[84px] rounded-full bg-gray-100" />
              <div className="flex flex-col">
                <p className="body-lg-semibold text-primary-500">박소정 / Sojeong</p>
                <p className="body-sm-medium text-gray-500">Design</p>
                <p className="body-sm-medium">40%인우꺼, 10%주언이꺼, 50%유림이꺼</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-y-[28px] border-b border-gray-100 px-5 py-[32px]">
            <div className="flex items-center gap-x-5">
              <div className="h-[84px] w-[84px] rounded-full bg-gray-100" />
              <div className="flex flex-col">
                <p className="body-lg-semibold text-primary-500">황유림 / yulim</p>
                <p className="body-sm-medium text-gray-500">Frontend</p>
                <p className="body-sm-medium">PM의 걱정인형 잘먹고 잘 자자</p>
              </div>
            </div>
            <div className="flex items-center gap-x-5">
              <div className="h-[84px] w-[84px] rounded-full bg-gray-100" />
              <div className="flex flex-col">
                <p className="body-lg-semibold text-primary-500">진채정 / Inu</p>
                <p className="body-sm-medium text-gray-500">Frontend</p>
                <p className="body-sm-medium">랄랄라</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-y-[28px] border-b border-gray-100 px-5 py-[32px]">
            <div className="flex items-center gap-x-5">
              <div className="h-[84px] w-[84px] rounded-full bg-gray-100" />
              <div className="flex flex-col">
                <p className="body-lg-semibold text-primary-500">김민지 / Minji</p>
                <p className="body-sm-medium text-gray-500">Backend</p>
                <p className="body-sm-medium">랄랄라</p>
              </div>
            </div>
            <div className="flex items-center gap-x-5">
              <div className="h-[84px] w-[84px] rounded-full bg-gray-100" />
              <div className="flex flex-col">
                <p className="body-lg-semibold text-primary-500">김영록 / Inu</p>
                <p className="body-sm-medium text-gray-500">Backend</p>
                <p className="body-sm-medium">PM의 걱정인형 잘먹고 잘 자자</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
