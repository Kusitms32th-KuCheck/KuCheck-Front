import Link from 'next/link'

import ReasonForAbsenceItem from '@/components/member/reason-for-absence/ReasonForAbsenceItem'
import MemberHeader from '@/components/member/common/MemberHeader'

import { HelpCircleIcon } from '@/assets/svgComponents/member'
import { getAbsence } from '@/lib/member/server/reason-for-absence'
import { SubmitAbsenceType } from '@/types/member/absence'

export default async function ReasonForAbsencePage() {
  let reasonForAbsenceList: SubmitAbsenceType[] = []
  let isError = false

  try {
    const result = await getAbsence()
    // ✅ API 응답 구조 확인
    if (result.success && result.data) {
      reasonForAbsenceList = result.data
    } else {
      console.error('API Error:', result.error)
      isError = true
    }
  } catch (error) {
    console.error('불참 사유서 조회 중 에러:', error)
    isError = true
  }

  return (
    <main className="desktop:w-[375px] min-h-screen bg-white">
      <MemberHeader
        headerType={'dynamic'}
        title={'불참 사유서'}
        rightElement={
          <Link className="absolute right-5" href={'/reason-for-absence/guide'}>
            <HelpCircleIcon width={20} height={20} />
          </Link>
        }
      />
      {/* 헤더의 높이만큼 공간 확보 */}
      <div className="h-[117px]" />

      {/* 불참사유서 제출 기록 */}
      <section
        className={`${isError ? 'min-h-[calc(100vh-117px-120px)] items-center justify-center' : ''} flex flex-col px-5 pb-[120px]`}
      >
        {isError ? (
          <div className="py-10 text-center text-red-500">데이터를 불러올 수 없습니다.</div>
        ) : reasonForAbsenceList && reasonForAbsenceList.length > 0 ? (
          <div className="w-full">
            {reasonForAbsenceList.map((reasonForAbsence, index) => (
              <ReasonForAbsenceItem
                key={reasonForAbsence.absenceReportId}
                {...reasonForAbsence}
                isLastIndex={reasonForAbsenceList.length - 1 === index}
              />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-500">제출된 불참 사유서가 없습니다.</div>
        )}
      </section>

      {/* bottom button */}
      <section className="desktop:w-[375px] fixed bottom-0 w-full bg-white px-5 pb-[60px]">
        <Link
          className="bg-primary-500 body-lg-semibold flex h-[48px] w-full items-center justify-center rounded-[14px] text-white"
          href={'/reason-for-absence/submit'}
        >
          불참 사유서 제출하기
        </Link>
      </section>
    </main>
  )
}
