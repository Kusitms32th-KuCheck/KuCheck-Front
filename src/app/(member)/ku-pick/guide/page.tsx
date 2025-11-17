import MemberHeader from '@/components/member/common/MemberHeader'

export default function KuPickGuidePage() {
  return (
    <main>
      <MemberHeader headerType={'dynamic'} title={''} backPath={'/ku-pick'} />
      <div className="h-[116px]" />
      <div className="mt-[20px] flex flex-col gap-y-[56px] px-5">
        <div className="flex flex-col gap-y-3">
          <h2 className="body-lg-semibold">큐픽이란?</h2>
          <p className="body-sm-regular text-gray-600">
            한 달에 한 번씩 열리는 온라인 세미나 강의로,
            <br />
            수강하시면 상점 1점이 부여됩니다!
            <br />
            큐픽으로 한 달에 얻을 수 있는 최대 상점은 1점입니다.
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          <h2 className="body-lg-semibold">이달의 큐픽 신청 방법</h2>
          <div className="body-sm-regular flex gap-x-1 text-gray-600">
            <p>1.</p>
            <p>
              각 큐픽에 해당하는 사이트 링크를 통해 개별적으로 지원해 주세요. (단체를 쓰라고 하는 항목이 나온다면
              ‘한국대학생IT경영학회‘를 쓰시면 됩니다.)
            </p>
          </div>
          <div className="body-sm-regular flex gap-x-1 text-gray-600">
            <p>2.</p>
            <p>개별 지원 후 신청 페이지 캡처</p>
          </div>
          <div className="body-sm-regular flex gap-x-1 text-gray-600">
            <p>3.</p>
            <p>당일에 시청하고 있는 화면을 캡쳐 혹은 사진으로 인증</p>
          </div>
        </div>
      </div>
    </main>
  )
}
