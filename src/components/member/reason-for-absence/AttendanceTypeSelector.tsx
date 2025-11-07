'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import MemberButton from '@/components/member/common/MemberButton'

import { AbsenceType } from '@/types/member/absence'

import { useAbsenceStore } from '@/store/member/absenceStore'
import { convertISODateTimeToTime, convertTimeToISODateTime } from '@/utils/common'
import { DrawerContent, DrawerHeader, DrawerTitle, Drawer, DrawerClose } from '@/components/ui/drawer'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

const attendanceTypeList: { title: string; enum: AbsenceType }[] = [
  { title: '불참', enum: 'ABSENT' },
  { title: '지각', enum: 'LATE' },
  { title: '조퇴', enum: 'EARLY_LEAVE' },
]

export default function AttendanceTypeSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // post data
  const setAbsenceState = useAbsenceStore((state) => state.setState)
  const absenceData = useAbsenceStore((state) => state.absenceData)

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  const handleAttendanceTypeClick = (attendanceType: AbsenceType) => {
    setAbsenceState({
      ...absenceData,
      absenceData: {
        ...absenceData,
        submitType: attendanceType,
        lateDateTime: undefined,
        leaveDateTime: undefined,
      },
    })
  }

  const handleDrawerOpen = (attendanceType: AbsenceType) => {
    if (attendanceType === absenceData?.submitType) {
      setIsDrawerOpen(true)
      return
    }

    if (attendanceType !== 'ABSENT') {
      setIsDrawerOpen(true)
    }
  }

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

  const handleDrawerClose = () => {
    const hasTimeSelected =
      absenceData?.submitType === 'LATE'
        ? absenceData?.lateDateTime
        : absenceData?.submitType === 'EARLY_LEAVE'
          ? absenceData?.leaveDateTime
          : true

    if (!hasTimeSelected) {
      setAbsenceState({
        ...absenceData,
        absenceData: {
          ...absenceData,
          submitType: undefined,
        },
      })
    }

    setIsDrawerOpen(false)
  }

  // 버튼 활성화 조건
  const isButtonEnabled =
    absenceData?.submitType === 'ABSENT'
      ? !!absenceData?.submitType
      : absenceData?.submitType === 'LATE'
        ? !!(absenceData?.submitType && absenceData?.lateDateTime)
        : absenceData?.submitType === 'EARLY_LEAVE'
          ? !!(absenceData?.submitType && absenceData?.leaveDateTime)
          : false

  return (
    <div>
      {/* content */}
      <section className="flex flex-col gap-y-[32px] px-5 pt-[32px]">
        <div className="flex gap-x-4">
          {attendanceTypeList.map((attendanceType) => (
            <button
              key={attendanceType.enum}
              onClick={() => handleAttendanceTypeClick(attendanceType.enum)}
              className={`${
                attendanceType.enum === absenceData?.submitType
                  ? 'bg-primary-50 border-primary-500 border'
                  : 'bg-background1 border border-gray-200'
              } rounded-[8px] border px-6 py-3 transition-colors`}
              type="button"
            >
              {attendanceType.title}
            </button>
          ))}
        </div>
        {absenceData?.submitType === 'LATE' ? (
          <div className="flex flex-col gap-y-1">
            <h1 className="body-2xl-semibold">지각 시간</h1>
            <div className="flex items-center justify-between">
              {absenceData.lateDateTime ? (
                <p>{convertISODateTimeToTime(absenceData?.lateDateTime)}</p>
              ) : (
                <p className="body-lg-medium text-gray-400">시간을 선택해주세요</p>
              )}
              <button
                onClick={() => handleDrawerOpen('LATE')}
                className="bg-primary-50 text-primary-500 caption-sm-medium w-[48px] rounded-[8px] py-[8px]"
              >
                선택
              </button>
            </div>
          </div>
        ) : absenceData?.submitType === 'EARLY_LEAVE' ? (
          <div className="flex flex-col gap-y-1">
            <h1 className="body-2xl-semibold">조퇴 시간</h1>
            <div className="flex items-center justify-between">
              {absenceData.leaveDateTime ? (
                <p>{convertISODateTimeToTime(absenceData?.leaveDateTime)}</p>
              ) : (
                <p className="body-lg-medium text-gray-400">시간을 선택해주세요</p>
              )}
              <button
                onClick={() => handleDrawerOpen('EARLY_LEAVE')}
                className="bg-primary-50 text-primary-500 caption-sm-medium w-[48px] rounded-[8px] py-[8px]"
              >
                선택
              </button>
            </div>
          </div>
        ) : null}
      </section>

      {/* Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="desktop:mx-auto desktop:max-w-[375px] desktop:rounded-t-2xl">
          <DrawerHeader className="">
            <DrawerTitle className="desktop:text-lg">
              {absenceData?.submitType === 'LATE' ? '지각 시간' : '조퇴 시간'}
            </DrawerTitle>
          </DrawerHeader>

          <div className="desktop:w-[375px] desktop:px-5 px-4 pb-8">
            {absenceData?.submitType === 'LATE' && (
              <LateDateTimeSelector onChangeValue={onChangeValue} onClose={handleDrawerClose} />
            )}
            {absenceData?.submitType === 'EARLY_LEAVE' && (
              <LeaveDateTimeSelector onChangeValue={onChangeValue} onClose={handleDrawerClose} />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* bottom button */}
      <section className="desktop:w-[375px] fixed bottom-0 w-full bg-white px-5 pb-[60px]">
        <MemberButton
          disabled={!isButtonEnabled}
          styleType="primary"
          styleSize="lg"
          styleStatus={isButtonEnabled ? 'default' : 'disabled'}
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

// 지각
function LateDateTimeSelector({
  onChangeValue,
  onClose,
}: {
  onChangeValue: (key: 'leaveDateTime' | 'lateDateTime', value: string) => void
  onClose: () => void
}) {
  return (
    <div className="flex flex-col gap-y-4 gap-y-[100px]">
      <input
        defaultValue="13:00"
        onChange={(e) => onChangeValue('lateDateTime', e.target.value)}
        placeholder="시간을 선택해 주세요"
        className="body-2xl-medium text-primary-500 w-full rounded-[8px] border border-gray-200 px-3 py-[10px] placeholder:text-gray-400"
        type="time"
      />
      <DrawerClose asChild>
        <button
          className="bg-primary-500 mb-[60px] w-full rounded-[8px] px-6 py-3 font-semibold text-white"
          type="button"
          onClick={onClose}
        >
          완료
        </button>
      </DrawerClose>
    </div>
  )
}

// 조퇴
function LeaveDateTimeSelector({
  onChangeValue,
  onClose,
}: {
  onChangeValue: (key: 'leaveDateTime' | 'lateDateTime', value: string) => void
  onClose: () => void
}) {
  return (
    <div className="flex flex-col gap-y-4 gap-y-[100px]">
      <input
        defaultValue="13:00"
        onChange={(e) => onChangeValue('leaveDateTime', e.target.value)}
        placeholder="시간을 선택해 주세요"
        className="body-2xl-medium text-primary-500 w-full rounded-[8px] border border-gray-200 px-3 py-[10px] placeholder:text-gray-400"
        type="time"
      />
      <DrawerClose asChild>
        <button
          className="bg-primary-500 mb-[60px] w-full rounded-[8px] px-6 py-3 font-semibold text-white"
          type="button"
          onClick={onClose}
        >
          완료
        </button>
      </DrawerClose>
    </div>
  )
}
