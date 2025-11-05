import MemberHeader from '@/components/member/common/MemberHeader'

export default function ReasonForAbsenceGuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="desktop:w-[375px] flex min-h-screen flex-1 flex-col bg-white">
      <MemberHeader headerType={'dynamic'} title={''} headerColor={'bg-white'} />
      <div className="h-[116px]" />
      {children}
    </div>
  )
}
