interface ReasonForAbsenceItemProps {
  isLastIndex?: boolean
}
export default function ReasonForAbsenceItem({ isLastIndex = false }: ReasonForAbsenceItemProps) {
  return (
    <div className={`${isLastIndex ? '' : 'border-b border-gray-100'} flex justify-between py-4`}>
      <section className="flex gap-x-[20px]">
        <p className="body-sm-medium text-gray-500">9/16</p>
        <div className="flex flex-col gap-y-1">
          <p className="body-sm-semibold">5주차 집중협업세션 (09/22)</p>
          <p className="caption-sm-medium text-gray-500">불참</p>
        </div>
      </section>
      <div className="caption-md-semibold px-[7px] py-2 text-gray-600">제출 완료</div>
    </div>
  )
}
