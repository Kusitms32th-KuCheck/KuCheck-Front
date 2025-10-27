const headers = ['이름', '파트', '제출일시', '신청 사진', '시청 사진', '확인']

interface CheckTableHeaderProps {
  gridTemplate: string
}

export default function CheckTableHeader({ gridTemplate }: CheckTableHeaderProps) {
  return (
    <div className="grid items-center border-b border-gray-100 px-6 py-2" style={{ gridTemplateColumns: gridTemplate }}>
      {headers.map((header, index) => (
        <p key={index} className="body-lg-semibold text-gray-500">
          {header}
        </p>
      ))}
    </div>
  )
}
