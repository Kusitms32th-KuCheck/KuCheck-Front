const headers = ['이름', '파트', '제출일시', '불참여부', '시간', '사유', '증빙서류', '벌점']

interface AbsenceTableHeaderProps {
  gridTemplate: string
}

export default function AbsenceTableHeader({ gridTemplate }: AbsenceTableHeaderProps) {
  return (
    <div
      className="grid items-center border-b border-gray-100 px-6 py-[22px]"
      style={{ gridTemplateColumns: gridTemplate }}
    >
      {headers.map((header, index) => (
        <p key={index} className="body-lg-semibold m-0 p-0 text-gray-500">
          {header}
        </p>
      ))}
    </div>
  )
}
