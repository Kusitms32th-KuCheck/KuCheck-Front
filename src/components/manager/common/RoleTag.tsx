interface RoleTagProps {
  label: string
}

const colorMap: Record<string, string> = {
  기획: 'w-[84px] bg-[#FFE69C] text-[#8B5F00]',
  디자인: 'bg-[#BCFAD1] text-[#14712B] w-[84px]',
  프론트엔드: 'bg-[#FFDAEC] text-[#9F428C] w-[106px]',
  백엔드: 'bg-[#BBE1FF] text-[#3768C7] w-[84px]',
}

export default function RoleTag({ label }: RoleTagProps) {
  return <div className={`body-lg-semibold rounded-[8px] px-4 py-2 text-center ${colorMap[label]}`}>{label}</div>
}
