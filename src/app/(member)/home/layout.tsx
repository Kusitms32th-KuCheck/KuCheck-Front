import MemberHeader from '@/components/member/common/MemberHeader'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center">
      <div className="desktop:w-[375px] bg-background2 min-h-screen">
        <MemberHeader />
        <div className="h-[100px]" />
        {children}
      </div>
    </main>
  )
}
