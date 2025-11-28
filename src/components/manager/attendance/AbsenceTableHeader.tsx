const headers = ['이름', '파트', '제출일시', '불참여부', '시간', '사유', '증빙서류', '벌점']

interface AbsenceTableHeaderProps {
  gridTemplate: string
}

export default function AbsenceTableHeader({ gridTemplate }: AbsenceTableHeaderProps) {
  return (
    <div
      className="grid items-center"
      style={{ gridTemplateColumns: gridTemplate }}
    >
      {headers.map((header, index) => (
        <p
          key={index}
          className={`py-[22px] border-b border-gray-100 body-lg-semibold pb-2 text-gray-500${index === 0 ? ' pl-6' : ''}`}
        >
          {header}
        </p>
      ))}
    </div>
  )
}
