import Link from 'next/link'

import ReasonForAbsenceItem from '@/components/member/reason-for-absence/ReasonForAbsenceItem'
import MemberButton from '@/components/member/common/MemberButton'
import MemberHeader from '@/components/member/common/MemberHeader'

import { HelpCircleIcon } from '@/assets/svgComponents/member'
import { getAbsence } from '@/lib/member/server/reason-for-absence'

export default async function ReasonForAbsencePage() {
  const result = await getAbsence(1, 30)
  const reasonForAbsenceList = result.data?.data

  return (
    <main>
      <MemberHeader
        headerType={'dynamic'}
        title={'불참 사유서'}
        rightElement={
          <Link href={'/reason-for-absence/guide'}>
            <HelpCircleIcon className="absolute right-5" width={20} height={20}></HelpCircleIcon>
          </Link>
        }
      />
      {/* 헤더의 높이만큼 공간 확보 */}
      <div className="h-[117px]" />

      {/* 불참사유서 제출 기록 */}
      <section className="px-5">
        {reasonForAbsenceList?.map((reasonForAbsence, index) => (
          <ReasonForAbsenceItem
            key={reasonForAbsence.absenceReportId}
            {...reasonForAbsence}
            isLastIndex={reasonForAbsenceList?.length - 1 === index}
          />
        ))}
      </section>

      {/* bottom button */}
      <section className="fixed bottom-0 w-full bg-white px-5 pb-[24px]">
        <MemberButton styleType={'primary'} buttonType={'button'} styleSize={'lg'} styleStatus={'default'}>
          <Link href={'/reason-for-absence/submit'}>불참 사유서 제출하기</Link>
        </MemberButton>
      </section>
    </main>
  )
}
