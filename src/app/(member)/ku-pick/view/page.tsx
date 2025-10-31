import { getKuPickMy } from '@/lib/member/server/ku-pick'

import MemberHeader from '@/components/member/common/MemberHeader'
import ViewImageUploader from '@/components/member/ku-pick/ViewImageUploader'

export default async function KuPickViewPage() {
  const myKuPickResponseData = await getKuPickMy()
  const myKuPickData = myKuPickResponseData?.data

  return (
    <main>
      <MemberHeader headerType={'dynamic'} title={'시청 인증 사진 업로드'} />
      <div className="h-[116px]" />
      <div className="flex flex-col gap-y-[32px]">
        <div className="px-5">
          <p className="body-lg-semibold text-primary-500">STEP 2</p>
          <div>
            <h1 className="heading-sm-semibold">시청 인증 사진을 업로드해 주세요</h1>
          </div>

          <p className="body-sm-regular mt-3 text-gray-500">
            말 일까지 시청 중인 화면을 캡처하거나
            <br />
            찍어서 인증해 주세요
          </p>
        </div>
        <ViewImageUploader myKuPickData={myKuPickData} />
      </div>
    </main>
  )
}
