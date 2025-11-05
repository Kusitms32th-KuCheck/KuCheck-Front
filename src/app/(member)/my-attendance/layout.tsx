import MemberHeader from '@/components/member/common/MemberHeader'

export default function MyAttendanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] bg-background1 relative flex min-h-screen w-full flex-col overflow-y-scroll">
        <MemberHeader headerType="dynamic" title={'나의 출석'} headerColor={'bg-background1'} />
        <div className="h-[116px]" />
        {children}
      </div>
    </main>
  )
}
