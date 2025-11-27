import MemberHeader from '@/components/member/common/MemberHeader'
import { getSessionNoticeDetail } from '@/lib/member/server/session'
import { formatDateTime, formatTimeToHHMM, formatToKoreanDate } from '@/utils/common'
import SessionContent from '@/components/member/session/SessionContent'
import Image from 'next/image'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params
  const response = await getSessionNoticeDetail(id)
  const sessionData = response.data

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] bg-background1 relative min-h-screen w-full">
        {/* 헤더 */}
        <MemberHeader headerType="dynamic" title={'세션 공지'} headerColor={'bg-background1'} isBottomBorder={true} />

        {/* 헤더 높이 공간 */}
        {/*<div className="h-[116px]" />*/}
        <div className="h-[60px]" />

        {/* 콘텐츠 */}
        <div className="mt-[12px] px-5 pb-[145px]">
          {/* 제목 & 날짜 */}
          <section className="flex flex-col gap-y-[3px] pt-[10px] pb-[8px]">
            <p className="heading-sm-semibold">{sessionData?.title}</p>
            <p className="body-sm-regular text-gray-400">
              {sessionData?.updatedAt ? formatDateTime(sessionData.updatedAt) : formatDateTime(sessionData?.createdAt)}
            </p>
          </section>

          {/* 장소 & 일시 */}
          <section className="my-[23px] flex flex-col gap-y-[6px]">
            <div className="bg-primary-50 flex py-[14px] items-center gap-x-[10px] rounded-[12px] pr-[10px] pl-4">
              <p className="body-sm-medium text-primary-500 whitespace-nowrap">장소</p>
              <p className="body-sm-medium">{sessionData?.place}</p>
            </div>
            <div className="bg-primary-50 flex h-[48px] items-center gap-x-[10px] rounded-[12px] pr-[10px] pl-4">
              <p className="body-sm-medium text-primary-500">일시</p>
              <p className="body-sm-medium">
                {formatToKoreanDate(sessionData?.startDate)} {formatTimeToHHMM(sessionData?.startTime)} -{' '}
                {formatTimeToHHMM(sessionData?.endTime)}
              </p>
            </div>
          </section>

          {/* 본문 내용 */}
          <SessionContent content={sessionData?.content} />

          {/* 이미지 */}
          {sessionData?.images && sessionData.images.length > 0 && (
            <section className="flex flex-col gap-y-2">
              {sessionData.images.map((image) => (
                <div className="relative w-full h-[335px]" key={image}>
                  <Image src={image} fill alt="그림" className="object-cover" />
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
