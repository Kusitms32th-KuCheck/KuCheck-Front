import { AttendanceCheckRecordType } from '@/types/member/attendance'
import { switchAttendanceTypeToKor } from '@/utils/member/attendance'

interface AttendanceItemProps {
  record: AttendanceCheckRecordType
}

export default function AttendanceItem({ record }: AttendanceItemProps) {
  // 포인트에 따른 색상 반환
  const getPointsColor = (points: number): string => {
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
      <p className={`${getPointsColor(record.points)} body-sm-semibold text-gray-700`}>{record.points}</p>
    </section>
  )
}
