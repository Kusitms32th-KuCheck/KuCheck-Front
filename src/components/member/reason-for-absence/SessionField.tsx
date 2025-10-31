'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import MemberButton from '@/components/member/common/MemberButton'
import MemberDropDown from '@/components/member/common/MemberDropDown'

import { useAbsenceStore } from '@/store/member/absenceStore'

import { AbsenceSessionDataType } from '@/types/member/session'
import { formatToMonthDay } from '@/utils/common'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

interface SessionFieldProps {
  sessionList: AbsenceSessionDataType[] | undefined
}

export default function SessionField({ sessionList }: SessionFieldProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
  const setAbsenceState = useAbsenceStore((state) => state.setState)
  const absenceData = useAbsenceStore((state) => state.absenceData)
  const selectedSessionContent = useAbsenceStore((state) => state.selectedSessionContent)

  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * session 선택 제어 헨들러
   * @param title 주차 + 세션 제목
   * @param sessionId 세션 Id
   */
  const handleSelectedSession = (title: string, sessionId: number) => {
    setAbsenceState({
      ...absenceData,
      absenceData: { ...absenceData, sessionId: sessionId },
      selectedSessionContent: title,
    })
    handleDropDownOpen()
  }

  /**
   * dropDown 핸들러
   */
  const handleDropDownOpen = useCallback(() => {
    setIsDropDownOpen(!isDropDownOpen)
  }, [isDropDownOpen])

  return (
    <div>
      {/* content */}
      <section className="flex flex-col gap-y-2 px-5 pt-[32px]">
        <h2 className="body-lg-semibold">세션 일시</h2>
        <MemberDropDown
          isDropDownOpen={isDropDownOpen}
          setIsDropDownOpen={handleDropDownOpen}
          placeHolder={'선택'}
          selectedContent={selectedSessionContent}
        >
          <MemberDropDownContent sessionList={sessionList} onClick={handleSelectedSession} />
        </MemberDropDown>
      </section>

      {/* bottom button */}
      <section className="fixed bottom-0 w-full bg-white px-5 pb-[24px]">
        <MemberButton
          disabled={!absenceData?.sessionId}
          styleType={'primary'}
          styleSize={'lg'}
          styleStatus={absenceData?.sessionId ? 'default' : 'disabled'}
          onClick={() => {
            handleStepClick('2')
          }}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}

function MemberDropDownContent({
  sessionList,
  onClick,
}: {
  sessionList: AbsenceSessionDataType[] | undefined
  onClick: (content: string, sessionId: number) => void
}) {
  console.log('드롭다운', sessionList)
  return (
    <>
      {sessionList?.map((session) => (
        <button
          type={'button'}
          disabled={!session.active}
          onClick={() => onClick(`${session.week}주차 ${session.title}`, session.sessionId)}
          key={session.sessionId}
          className={`${!session.active ? 'cursor-not-allowed text-gray-300' : 'text-black'} flex items-center gap-x-1 px-[10px] py-[16px]`}
        >
          <p className="body-lg-regular">
            {formatToMonthDay(session.startDate)} {session.week}주차 {session.title}
          </p>
        </button>
      ))}
    </>
  )
}
