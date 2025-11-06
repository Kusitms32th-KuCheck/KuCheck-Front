import MemberHeader from '@/components/member/common/MemberHeader'
import { CalendarIcon } from '@/assets/svgComponents'
import Link from 'next/link'
import { PaperclipIcon } from '@/assets/svgComponents/member'
import { getSessionNoticeDetail } from '@/lib/member/server/session'
import { formatMonthDay, formatTimeToHHMM, formatToKoreanDate } from '@/utils/common'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params
  const response = await getSessionNoticeDetail(id)
  console.log('response', response)

  const sessionData = response.data

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] bg-background1 min-h-screen w-full">
        <MemberHeader
          headerType="dynamic"
          title={'세션 공지'}
          headerColor={'bg-background1'}
          isBottomBorder={true}
          rightElement={
            <Link href={'/session'} className="absolute right-5">
              <CalendarIcon width={20} height={22} />
            </Link>
          }
        />
        <div className="h-[116px]" />
        <div className="mt-[23px] px-5 pb-[145px]">
          <section className="flex flex-col gap-y-[3px] pt-[10px] pb-[8px]">
            <p className="heading-sm-semibold">{sessionData?.title}</p>
            <p className="body-sm-regular text-gray-400">9월 22일 19:00</p>
          </section>

          <section className="my-[23px] flex flex-col gap-y-[6px]">
            <div className="bg- bg-primary-50 flex h-[48px] items-center gap-x-[10px] rounded-[12px] pr-[10px] pl-4">
              <p className="body-sm-medium text-primary-500">장소</p>
              <p className="body-sm-medium">{sessionData?.place}</p>
            </div>
            <div className="bg- bg-primary-50 flex h-[48px] items-center gap-x-[10px] rounded-[12px] pr-[10px] pl-4">
              <p className="body-sm-medium text-primary-500">일시</p>
              <p className="body-sm-medium">
                {formatToKoreanDate(sessionData?.startDate)} {formatTimeToHHMM(sessionData?.startTime)} -{' '}
                {formatTimeToHHMM(sessionData?.endTime)}
              </p>
            </div>
          </section>

          <p className="body-sm-regular mt-[31px] text-gray-800">{sessionData?.content}</p>

          {sessionData?.images ? (
            <section className="flex flex-col gap-y-2">
              {sessionData.images.map((image) => (
                <div key={image} className="h-[335px] w-full rounded-[16px] bg-gray-100"></div>
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  )
}
