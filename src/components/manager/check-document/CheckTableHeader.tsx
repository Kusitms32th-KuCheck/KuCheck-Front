const headers = ['이름', '파트', '제출일시', '신청 사진', '시청 사진', '확인']

interface CheckTableHeaderProps {
  gridTemplate: string
}

export default function CheckTableHeader({ gridTemplate }: CheckTableHeaderProps) {
  return (
    <div className="grid items-center " style={{ gridTemplateColumns: gridTemplate }}>
      {headers.map((header, index) => (
        <p
          key={index}
          className={`border-b pb-2 border-gray-100 body-lg-semibold text-gray-500${index === 0 ? ' pl-6' : ''}`}
        >
          {header}
        </p>
      ))}
    </div>
  )
}
