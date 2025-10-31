import { getKuPickMy } from '@/lib/member/server/ku-pick'

import MemberHeader from '@/components/member/common/MemberHeader'
import ApplicationImageUploader from '@/components/member/ku-pick/ApplicationImageUploader'

export default async function KuPickApplicationPage() {
  const myKuPickResponseData = await getKuPickMy()
  const myKuPickData = myKuPickResponseData?.data

  return (
    <main>
      <MemberHeader headerType={'dynamic'} title={'신청 사진 업로드'} />
      <div className="h-[116px]" />
      <div className="flex flex-col gap-y-[32px]">
        <div className="">
          <p className="body-lg-semibold text-primary-500">STEP 1</p>
          <div>
            <h1 className="heading-sm-semibold">신청 사진을 업로드해주세요</h1>
          </div>

          <p className="body-sm-regular mt-3 text-gray-500">
            각 큐픽 링크로 개별 지원 후,<br></br>
            신청 페이지를 캡처해 업로드해 주세요
          </p>
        </div>
        <ApplicationImageUploader myKuPickData={myKuPickData} />
      </div>
    </main>
  )
}
