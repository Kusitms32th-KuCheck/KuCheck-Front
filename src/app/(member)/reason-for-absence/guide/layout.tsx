import MemberHeader from '@/components/member/common/MemberHeader'

export default function ReasonForAbsenceGuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <MemberHeader headerType={'dynamic'} title={''} />
      <div className="h-[116px]" />
      {children}
    </div>
  )
}
