import MemberHeader from '@/components/member/common/MemberHeader'
import SubmitCard from '@/components/member/ku-pick/SubmitCard'
import { getKuPickMy } from '@/lib/member/server/ku-pick'
import { HelpCircleIcon } from '@/assets/svgComponents/member'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export default async function QPickPage() {
  const myKuPickResponseData = await getKuPickMy()
  const myKuPickData = myKuPickResponseData?.data

  return (
    <main>
      <MemberHeader
        backPath={'/home'}
        headerColor={'bg-white'}
        headerType={'dynamic'}
        title={'큐픽 제출하기'}
        rightElement={
          <Link className="absolute right-5" href={'/ku-pick/guide'}>
            <HelpCircleIcon width={20} height={20} />
          </Link>
        }
      />
      <div className="h-[60px]" />
      {/*<div className="h-[116px] border" />*/}
      <div className="mt-[8px] flex flex-col gap-y-3 px-5">
        <h1 className="body-2xl-semibold ml-[6px]">11월 큐픽</h1>
        <SubmitCard
          colorGray={false}
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
          colorGray={!myKuPickData?.applicationUrl}
          isSubmit={!!myKuPickData?.viewUrl}
          href={'/ku-pick/view'}
          title={'시청 인증 사진 업로드'}
          step={2}
          description={
            <div className="body-sm-medium text-gray-500">
              말 일까지 시청 중인 화면을 캡처하거나
              <br />
              찍어서 인증해 주세요
            </div>
          }
        />
        {myKuPickData?.viewUrl && myKuPickData.applicationUrl && (
          <p className="caption-sm-medium text-primary-500">
            큐픽 제출이 완료되었어요
            <br />
            이달 말일까지는 이미지 수정이 가능해요
          </p>
        )}
      </div>
    </main>
  )
}
