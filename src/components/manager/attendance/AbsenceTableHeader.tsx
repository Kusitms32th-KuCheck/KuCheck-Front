const headers = ['이름', '파트', '제출일시', '불참여부', '시간', '사유', '증빙서류', '벌점']
const gridTemplate =
  'minmax(80px,0.59fr) minmax(80px,0.59fr) minmax(100px,0.59fr) minmax(80px,0.59fr) minmax(80px,0.59fr) minmax(160px,3fr) minmax(80px,1fr) minmax(90px,1.28fr)'

export default function AbsenceTableHeader() {
  return (
    <div
      className="grid items-center gap-[50px] border-b border-gray-100 px-6 py-[22px]"
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

export { gridTemplate }
