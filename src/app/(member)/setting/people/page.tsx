import MemberHeader from '@/components/member/common/MemberHeader'
import Image from 'next/image'

export default function People() {
  return (
    <div className="desktop:w-[375px] min-h-screen bg-white">
      <MemberHeader headerType="dynamic" title={'만든 사람들'} />
      <div className="h-[116px]" />
      <div className="flex flex-col">
        <section className="flex flex-col gap-y-[28px] border-b border-gray-100 px-5 py-[32px]">
          <div className="flex items-center gap-x-5">
            <div className="relative h-[84px] w-[84px]">
              <Image src={'/people/inwoo.png'} fill alt="인우 사진" className="rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="body-lg-semibold text-primary-500">한인우 / lnwoo</p>
              <p className="body-sm-medium text-gray-500">Plan / PM</p>
              <p className="body-sm-medium">PM,이 팀 전원을 소유한 자</p>
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="relative h-[84px] w-[84px]">
              <Image src={'/people/hyunjin.jpg'} fill alt="현진 사진" className="rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="body-lg-semibold text-primary-500">이현진 / Hyunjin</p>
              <p className="body-sm-medium text-gray-500">Plan</p>
              <p className="body-sm-medium">빤히...</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-y-[28px] border-b border-gray-100 px-5 py-[32px]">
          <div className="flex items-center gap-x-5">
            <div className="relative h-[84px] w-[84px]">
              <Image src={'/people/jueon.svg'} fill alt="주언 사진" className="rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="body-lg-semibold text-primary-500">강주언 / Jueon</p>
              <p className="body-sm-medium text-gray-500">Design</p>
              <p className="body-sm-medium">별일 없이 산다</p>
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="relative h-[84px] w-[84px]">
              <Image src={'/people/sojeong.png'} fill alt="소정 사진" className="rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="body-lg-semibold text-primary-500">박소정 / Sojeong</p>
              <p className="body-sm-medium text-gray-500">Design</p>
              <p className="body-sm-medium">디자이너 (였던 것)</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-y-[28px] border-b border-gray-100 px-5 py-[32px]">
          <div className="flex items-center gap-x-5">
            <div className="relative h-[84px] w-[84px]">
              <Image src={'/people/yulim.png'} fill alt="유림 사진" className="rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="body-lg-semibold text-primary-500">황유림 / yulim</p>
              <p className="body-sm-medium text-gray-500">Frontend</p>
              <p className="body-sm-medium">일에 미친자</p>
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="relative h-[84px] w-[84px]">
              <Image src={'/people/chaejeong.png'} fill alt="채정 사진" className="rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="body-lg-semibold text-primary-500">진채정 / Chaejeong</p>
              <p className="body-sm-medium text-gray-500">Frontend</p>
              <p className="body-sm-medium">실질적 막내..그냥 귀여워</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-y-[28px] border-b border-gray-100 px-5 py-[32px]">
          <div className="flex items-center gap-x-5">
            <div className="relative h-[84px] w-[84px]">
              <Image src={'/people/minji.png'} fill alt="민지 사진" className="rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="body-lg-semibold text-primary-500">김민지 / Minji</p>
              <p className="body-sm-medium text-gray-500">Backend</p>
              <p className="body-sm-medium">그냥 백엔드 개발자</p>
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="relative h-[84px] w-[84px]">
              <Image src={'/people/yeongrok.png'} fill alt="민지 사진" className="rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="body-lg-semibold text-primary-500">김영록 / Yeongrok</p>
              <p className="body-sm-medium text-gray-500">Backend</p>
              <p className="body-sm-medium">
                <span className="text-primary-500">Genius</span>하고 <span className="text-[#00C400]">Fancy</span>한{' '}
                <br />
                백엔드 개발자 김영록입니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
