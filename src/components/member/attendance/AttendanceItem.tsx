import { AttendanceCheckRecordType, AttendanceEnumType } from '@/types/member/attendance'
import { switchAttendanceTypeToKor } from '@/utils/member/attendance'

interface AttendanceItemProps {
  record: AttendanceCheckRecordType
}

// 포인트 매핑 객체
const POINTS_MAP: Record<AttendanceEnumType, number> = {
  KUPICK: 1,
  TF: 2,
  STAFF: 1,
  STUDY: 1,
  KUPORTERS: 1,
  PRESENT_HOLIDAY: 1,
  PRESENT: 0,
  EXCUSED: 0,
  ABSENT: -3,
  ABSENT_WITH_DOC: -2,
  LATE: -1,
  EARLY_LEAVE: -1,
}

export default function AttendanceItem({ record }: AttendanceItemProps) {
  // 포인트 계산
  const calculatePoints = (attendanceEnumType: AttendanceEnumType): string => {
    const points = POINTS_MAP[attendanceEnumType]
    if (points === undefined) return '0'
    return points >= 0 ? `+${points}` : `${points}`
  }

  // 포인트에 따른 색상 반환
  const getPointsColor = (attendanceEnumType: AttendanceEnumType): string => {
    const points = POINTS_MAP[attendanceEnumType]
    if (points === undefined || points === 0) return 'text-gray-700'
    if (points > 0) return 'text-primary-500'
    return 'text-sub-red'
  }

  return (
    <section className="flex w-full justify-between">
      <div className="flex gap-x-[21px]">
        <p className="body-sm-medium text-gray-500">{record.date}</p>
        <div className="flex flex-col">
          <p className="body-sm-semibold text-gray-700">{switchAttendanceTypeToKor(record.type)}</p>
          {record.week ? (
            <div className="flex gap-x-[6px]">
              {record.week ? <p className="caption-sm-medium text-gray-500">{record.week}주차</p> : null}
              <p className="caption-sm-medium text-gray-500">{record.attendanceTime}</p>
            </div>
          ) : (
            <div className="h-[10px]"></div>
          )}
        </div>
      </div>
      <p className={`${getPointsColor(record.type)} body-sm-semibold text-gray-700`}>{calculatePoints(record.type)}</p>
    </section>
  )
}
