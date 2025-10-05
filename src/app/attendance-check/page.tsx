import Header from '@/components/common/Header'
import { PenaltyPointIcon, RewardPointIcon } from '@/assets/svgComponents'

export default function AttendanceCheckPage() {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] bg-background1 relative min-h-screen w-full overflow-y-scroll">
        <Header headerType="dynamic" title={'나의 출석'} headerColor={'bg-background1'} />
        <div className="h-[116px]" />
        <section className="px-5">
          <section className="mt-[30px] flex flex-col items-center justify-center">
            <p className="body-lg-regular text-gray-500">이현진님의 현재 상벌점 </p>
            <p className="heading-3xl-semibold">-3</p>
            <div className="mt-[11px] flex h-[40px] gap-x-[14px] rounded-[20px] border border-gray-100 bg-white px-4 py-2">
              <div className="flex items-center">
                <RewardPointIcon width={20} height={20} />
                <p className="body-lg-regular pl-[5px] text-gray-500">상점</p>
                <p className="body-lg-bold pl-1">4</p>
              </div>
              <div className="border-l border-gray-200"></div>
              <div className="flex items-center">
                <PenaltyPointIcon width={20} height={20} />
                <p className="body-lg-regular pl-[5px] text-gray-500">벌점</p>
                <p className="body-lg-bold pl-1">-6</p>
              </div>
            </div>
          </section>
          <section className="mt-[44px] flex flex-col gap-y-[24px]">
            <section className="flex justify-between">
              <div className="flex gap-x-[21px]">
                <p className="body-sm-medium text-gray-500">08/23</p>
                <div className="flex flex-col">
                  <p className="body-sm-semibold text-gray-700">출석</p>
                  <div className="flex gap-x-[6px]">
                    <p className="caption-sm-medium text-gray-500">큐적큐적</p>
                    <p className="caption-sm-medium text-gray-500">12:52</p>
                  </div>
                </div>
              </div>
              <p className="body-sm-semibold text-gray-700">0</p>
            </section>
            <section className="flex justify-between">
              <div className="flex gap-x-[21px]">
                <p className="body-sm-medium text-gray-500">08/23</p>
                <div className="flex flex-col">
                  <p className="body-sm-semibold text-gray-700">출석</p>
                  <div className="flex gap-x-[6px]">
                    <p className="caption-sm-medium text-gray-500">큐적큐적</p>
                    <p className="caption-sm-medium text-gray-500">12:52</p>
                  </div>
                </div>
              </div>
              <p className="body-sm-semibold text-gray-700">0</p>
            </section>
            <section className="flex justify-between">
              <div className="flex gap-x-[21px]">
                <p className="body-sm-medium text-gray-500">08/23</p>
                <div className="flex flex-col">
                  <p className="body-sm-semibold text-gray-700">출석</p>
                  <div className="flex gap-x-[6px]">
                    <p className="caption-sm-medium text-gray-500">큐적큐적</p>
                    <p className="caption-sm-medium text-gray-500">12:52</p>
                  </div>
                </div>
              </div>
              <p className="body-sm-semibold text-gray-700">0</p>
            </section>
            <section className="flex justify-between">
              <div className="flex gap-x-[21px]">
                <p className="body-sm-medium text-gray-500">08/23</p>
                <div className="flex flex-col">
                  <p className="body-sm-semibold text-gray-700">출석</p>
                  <div className="flex gap-x-[6px]">
                    <p className="caption-sm-medium text-gray-500">큐적큐적</p>
                    <p className="caption-sm-medium text-gray-500">12:52</p>
                  </div>
                </div>
              </div>
              <p className="body-sm-semibold text-gray-700">0</p>
            </section>
            <section className="flex justify-between">
              <div className="flex gap-x-[21px]">
                <p className="body-sm-medium text-gray-500">08/23</p>
                <div className="flex flex-col">
                  <p className="body-sm-semibold text-gray-700">출석</p>
                  <div className="flex gap-x-[6px]">
                    <p className="caption-sm-medium text-gray-500">큐적큐적</p>
                    <p className="caption-sm-medium text-gray-500">12:52</p>
                  </div>
                </div>
              </div>
              <p className="body-sm-semibold text-gray-700">0</p>
            </section>

            <section className="flex justify-between">
              <div className="flex gap-x-[21px]">
                <p className="body-sm-medium text-gray-500">08/23</p>
                <div className="flex flex-col">
                  <p className="body-sm-semibold text-gray-700">출석</p>
                  <div className="flex gap-x-[6px]">
                    <p className="caption-sm-medium text-gray-500">큐적큐적</p>
                    <p className="caption-sm-medium text-gray-500">12:52</p>
                  </div>
                </div>
              </div>
              <p className="body-sm-semibold text-gray-700">0</p>
            </section>
            <section className="flex justify-between">
              <div className="flex gap-x-[21px]">
                <p className="body-sm-medium text-gray-500">08/23</p>
                <div className="flex flex-col">
                  <p className="body-sm-semibold text-gray-700">출석</p>
                  <div className="flex gap-x-[6px]">
                    <p className="caption-sm-medium text-gray-500">큐적큐적</p>
                    <p className="caption-sm-medium text-gray-500">12:52</p>
                  </div>
                </div>
              </div>
              <p className="body-sm-semibold text-gray-700">0</p>
            </section>
            <section className="flex justify-between">
              <div className="flex gap-x-[21px]">
                <p className="body-sm-medium text-gray-500">08/23</p>
                <div className="flex flex-col">
                  <p className="body-sm-semibold text-gray-700">출석</p>
                  <div className="flex gap-x-[6px]">
                    <p className="caption-sm-medium text-gray-500">큐적큐적</p>
                    <p className="caption-sm-medium text-gray-500">12:52</p>
                  </div>
                </div>
              </div>
              <p className="body-sm-semibold text-gray-700">0</p>
            </section>
          </section>
        </section>

        <section className="desktop:absolute ios:fixed android:fixed bottom-0 flex h-[100px] w-full items-center justify-center bg-white px-5">
          <button className="bg-primary-500 body-lg-semibold h-[48px] w-full rounded-[10px] text-white">
            큐픽 제출하기{' '}
          </button>
        </section>
      </div>
    </main>
  )
}
