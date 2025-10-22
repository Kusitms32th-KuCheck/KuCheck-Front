import ReasonForAbsenceItem from '@/components/member/reason-for-absence/ReasonForAbsenceItem'
import MemberButton from '@/components/member/common/MemberButton'
import Link from 'next/link'

export default async function ReasonForAbsencePage() {
  return (
    <main>
      {/* 불참사유서 제출 기록 */}
      <section className="px-5">
        <ReasonForAbsenceItem />
        <ReasonForAbsenceItem />
        <ReasonForAbsenceItem />
        <ReasonForAbsenceItem isLastIndex={true} />
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
