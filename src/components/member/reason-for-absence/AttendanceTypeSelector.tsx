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
    // 새로운 타입 선택
    setAbsenceState({
      ...absenceData,
      absenceData: {
        ...absenceData,
        absenceType: attendanceType,
        lateDateTime: undefined,
        leaveDateTime: undefined,
      },
    })
  }

  const handleDrawerOpen = (attendanceType: AbsenceType) => {
    // 이미 선택된 타입을 다시 클릭하면 Drawer 열기
    if (attendanceType === absenceData?.absenceType) {
      setIsDrawerOpen(true)
      return
    }

    // 지각 또는 조퇴 선택 시 Drawer 열기
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
    // 시간이 선택되지 않았으면 타입 초기화
    const hasTimeSelected =
      absenceData?.absenceType === 'LATE'
        ? absenceData?.lateDateTime
        : absenceData?.absenceType === 'EARLY_LEAVE'
          ? absenceData?.leaveDateTime
          : true

    if (!hasTimeSelected) {
      setAbsenceState({
        ...absenceData,
        absenceData: {
          ...absenceData,
          absenceType: undefined,
        },
      })
    }

    setIsDrawerOpen(false)
  }

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
                attendanceType.enum === absenceData?.absenceType
                  ? 'bg-primary-50 border-primary-500 border'
                  : 'bg-background1 border border-gray-200'
              } rounded-[8px] border px-6 py-3 transition-colors`}
              type="button"
            >
              {attendanceType.title}
            </button>
          ))}
        </div>
        {absenceData?.absenceType === 'LATE' ? (
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
        ) : absenceData?.absenceType === 'EARLY_LEAVE' ? (
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
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{absenceData?.absenceType === 'LATE' ? '지각 시간' : '조퇴 시간'}</DrawerTitle>
          </DrawerHeader>

          <div className="px-4 pb-8">
            {absenceData?.absenceType === 'LATE' && (
              <LateDateTimeSelector onChangeValue={onChangeValue} onClose={handleDrawerClose} />
            )}
            {absenceData?.absenceType === 'EARLY_LEAVE' && (
              <LeaveDateTimeSelector onChangeValue={onChangeValue} onClose={handleDrawerClose} />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* bottom button */}
      <section className="fixed bottom-0 w-full bg-white px-5 pb-[36px]">
        <MemberButton
          disabled={!absenceData?.absenceType}
          styleType="primary"
          styleSize="lg"
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
        onChange={(e) => onChangeValue('lateDateTime', e.target.value)}
        placeholder="시간을 선택해 주세요"
        className="heading-md-medium rounded-[8px] border border-gray-200 px-4 py-4 placeholder:text-gray-400"
        type="time"
      />
      <DrawerClose asChild>
        <button
          className="bg-primary-500 w-full rounded-[8px] px-6 pt-3 pb-[36px] font-semibold text-white"
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
        onChange={(e) => onChangeValue('leaveDateTime', e.target.value)}
        placeholder="시간을 선택해 주세요"
        className="heading-md-medium rounded-[8px] border border-gray-200 px-4 py-4 placeholder:text-gray-400"
        type="time"
      />
      <DrawerClose asChild>
        <button
          className="bg-primary-500 rounded-[8px] px-6 pt-3 pb-[36px] font-semibold text-white"
          type="button"
          onClick={onClose}
        >
          완료
        </button>
      </DrawerClose>
    </div>
  )
}
