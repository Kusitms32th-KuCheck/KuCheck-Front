import { AttendanceCheckRecordType } from '@/types/member/attendance'
import { calculatePoints, switchAttendanceTypeToKor } from '@/utils/member/attendance'

interface AttendanceItemProps {
  record: AttendanceCheckRecordType
}
export default function AttendanceItem({ record }: AttendanceItemProps) {
  return (
    <section className="flex justify-between">
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
      <p className="body-sm-semibold text-gray-700">{calculatePoints(record.type)}</p>
    </section>
  )
}
