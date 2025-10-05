interface TagProps {
  tagColor: string
  tagContent: string
  tagNumber?: number
}
export default function Tag({ tagNumber, tagColor, tagContent }: TagProps) {
  return (
    <div
      className={`${tagColor} text button-sm px-3xs flex h-[24px] items-center justify-center gap-x-1 rounded-[12px] text-white`}
    >
      {tagNumber && <p>{tagNumber}</p>}
      <p>{tagContent}</p>
    </div>
  )
}
