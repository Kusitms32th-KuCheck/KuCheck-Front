import { AbsenceReportApprovalType, AbsenceType, SubmitAbsenceType } from '@/types/member/absence'
import { formatMonthDay, formatToMonthDay } from '@/utils/common'

interface ReasonForAbsenceItemProps extends SubmitAbsenceType {
  isLastIndex?: boolean
}
export default function ReasonForAbsenceItem({
  isLastIndex = false,
  absenceReportApproval,
  absenceType,
  submitDateTime,
  sessionStartDate,
  sessionTitle,
}: ReasonForAbsenceItemProps) {
  const switchReportApproval = (absenceReportApproval: AbsenceReportApprovalType) => {
    switch (absenceReportApproval) {
      case 'APPROVED':
        return '확인 완료'
      default:
        return '제출 완료'
    }
  }

  const switchAbsenceTypeToContent = (absenceType: AbsenceType) => {
    switch (absenceType) {
      case 'LATE':
        return '지각'
      case 'EARLY_LEAVE':
        return '조퇴'
      default:
        return '불참'
    }
  }

  return (
    <div className={`${isLastIndex ? '' : 'border-b border-gray-100'} flex justify-between py-4`}>
      <section className="flex gap-x-[20px]">
        <p className="body-sm-medium text-gray-500">{formatMonthDay(submitDateTime)}</p>
        <div className="flex flex-col gap-y-1">
          <p className="body-sm-semibold">
            {sessionTitle} ({formatToMonthDay(sessionStartDate)})
          </p>
          <p className="caption-sm-medium text-gray-500">{switchAbsenceTypeToContent(absenceType)}</p>
        </div>
      </section>
      <div
        className={`${absenceReportApproval === 'APPROVED' ? 'text-primary-400' : 'text-gray-600'} caption-md-semibold px-[7px] py-2`}
      >
        {switchReportApproval(absenceReportApproval)}
      </div>
    </div>
  )
}
