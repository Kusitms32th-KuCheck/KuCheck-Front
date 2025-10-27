'use client'

import { usePathname, useRouter } from 'next/navigation'

import MemberButton from '@/components/member/common/MemberButton'

import { AbsenceType } from '@/types/member/absence'

import { useAbsenceStore } from '@/store/member/absenceStore'
import { convertTimeToISODateTime } from '@/utils/common'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

const attendanceTypeList: { title: string; enum: AbsenceType }[] = [
  { title: '불참', enum: 'ABSENT' },
  { title: '지각', enum: 'LATE' },
  { title: '조퇴', enum: 'EARLY_LEAVE' },
]

export default function AttendanceTypeSelector() {
  const router = useRouter()
  const pathname = usePathname()

  // post data
  const setAbsenceState = useAbsenceStore((state) => state.setState)
  const absenceData = useAbsenceStore((state) => state.absenceData)

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * 참석 유형 제어 핸들러
   * @param attendanceType  'ABSENT': 결석 | 'LATE': 지각 | 'EARLY_LEAVE': 조퇴
   */
  const handleAttendanceTypeClick = (attendanceType: AbsenceType) => {
    setAbsenceState({
      ...absenceData,
      absenceData: {
        ...absenceData,
        absenceType: attendanceType === absenceData?.absenceType ? undefined : attendanceType,
        lateDateTime: undefined,
        leaveDateTime: undefined,
      },
    })
  }

  /**
   * absenceData 의 leaveDateTime 과 lateDateTime 를 변경하는 함수
   * @param key 'leaveDateTime': '조퇴', 'lateDateTime': '지각'
   * @param value input 입력값
   */
  const onChangeValue = (key: 'leaveDateTime' | 'lateDateTime', value: string) => {
    const isoDateTime = convertTimeToISODateTime(value)

    setAbsenceState({
      ...absenceData,
      absenceData: {
        ...absenceData,
        [key]: isoDateTime,
      },
    })
  }

  /**
   * AbsenceType 에 따라서 시간을 선택하는 UI 컴포넌트 제어
   */
  const handleAbsenceUISwitcher = (absenceType: AbsenceType | undefined) => {
    switch (absenceType) {
      case 'LATE':
        return <LateDateTimeSelector onChangeValue={onChangeValue} />
      case 'EARLY_LEAVE':
        return <LeaveDateTimeSelector onChangeValue={onChangeValue} />
      default:
        return <div></div>
    }
  }

  return (
    <div>
      {/* content */}
      <section className="flex flex-col gap-y-[32px] px-5 pt-[32px]">
        <div className="flex gap-x-4">
          {attendanceTypeList.map((attendanceType) => (
            <button
              key={attendanceType.enum}
              className={`${attendanceType.enum === absenceData?.absenceType ? 'bg-primary-50 border-primary-500 border' : 'bg-background1 border border-gray-200'} rounded-[8px] border px-6 py-3`}
              type={'button'}
              onClick={() => handleAttendanceTypeClick(attendanceType.enum)}
            >
              {attendanceType.title}
            </button>
          ))}
        </div>
        {handleAbsenceUISwitcher(absenceData?.absenceType)}
      </section>

      {/* bottom button */}
      <section className="fixed bottom-0 w-full bg-white px-5 pb-[24px]">
        <MemberButton
          disabled={!absenceData?.absenceType}
          styleType={'primary'}
          styleSize={'lg'}
          styleStatus={absenceData?.absenceType ? 'default' : 'disabled'}
          onClick={() => {
            handleStepClick('3')
          }}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}

//지각
function LateDateTimeSelector({
  onChangeValue,
}: {
  onChangeValue: (key: 'leaveDateTime' | 'lateDateTime', value: string) => void
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="body-2xl-semibold">지각 시간</h1>
      <section className="flex items-center justify-between">
        <input
          onChange={(e) => onChangeValue('lateDateTime', e.target.value)}
          placeholder={'시간을 선택해 주세요'}
          className="body-lg-medium placeholder:text-gray-400"
          type={'time'}
        />
        {/*<button className="bg-primary-50 caption-sm-medium text-primary-500 w-[48px] rounded-[8px] py-[8px]">*/}
        {/*  선택*/}
        {/*</button>*/}
      </section>
    </div>
  )
}

//조퇴
function LeaveDateTimeSelector({
  onChangeValue,
}: {
  onChangeValue: (key: 'leaveDateTime' | 'lateDateTime', value: string) => void
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="body-2xl-semibold">조퇴 시간</h1>
      <section className="flex items-center justify-between">
        <input
          onChange={(e) => onChangeValue('leaveDateTime', e.target.value)}
          placeholder={'시간을 선택해 주세요'}
          className="body-lg-medium placeholder:text-gray-400"
          type={'time'}
        />
        {/*<button className="bg-primary-50 caption-sm-medium text-primary-500 w-[48px] rounded-[8px] py-[8px]">*/}
        {/*  선택*/}
        {/*</button>*/}
      </section>
    </div>
  )
}
