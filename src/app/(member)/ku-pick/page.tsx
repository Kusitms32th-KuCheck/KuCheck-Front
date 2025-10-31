import MemberHeader from '@/components/member/common/MemberHeader'
import SubmitCard from '@/components/member/ku-pick/SubmitCard'
import { getKuPickMy } from '@/lib/member/server/ku-pick'
export const dynamic = 'force-dynamic'
export default async function QPickPage() {
  const myKuPickResponseData = await getKuPickMy()
  const myKuPickData = myKuPickResponseData?.data

  return (
    <main>
      <MemberHeader headerType={'dynamic'} title={'큐픽 제출하기'} />
      <div className="h-[116px]" />
      <div className="mt-[20px] flex flex-col gap-y-4 px-5">
        <SubmitCard
          isSubmit={!!myKuPickData?.applicationUrl}
          href={'/ku-pick/application'}
          title={'신청 사진 업로드'}
          step={1}
          description={
            <div className="body-sm-medium text-gray-500">
              각 큐픽 링크로 개별 지원 후,
              <br></br>
              신청 페이지를 캡처해 업로드해 주세요
            </div>
          }
        />
        <SubmitCard
          isSubmit={!!myKuPickData?.viewUrl}
          href={'/ku-pick/view'}
          title={'시청 인증 사진 업로드 '}
          step={2}
          description={
            <div className="body-sm-medium text-gray-500">
              말 일까지 시청 중인 화면을 캡처하거나
              <br />
              찍어서 인증해 주세요
            </div>
          }
        />
      </div>
    </main>
  )
}
