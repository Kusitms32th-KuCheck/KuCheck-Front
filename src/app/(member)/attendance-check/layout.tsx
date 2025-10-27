import MemberHeader from '@/components/member/common/MemberHeader'

export default function AttendanceCheckLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] bg-background1 relative min-h-screen w-full">
        <MemberHeader headerType="dynamic" title={'출석체크'} headerColor={'bg-background1'} />
        <div className="h-[116px]" />
        {children}
      </div>
    </main>
  )
}
