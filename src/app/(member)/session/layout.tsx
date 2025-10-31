import MemberHeader from '@/components/member/common/MemberHeader'

export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] bg-background1 min-h-screen w-full">
        <MemberHeader headerType="dynamic" title={'전체 세션 일정'} headerColor={'bg-background1'} />
        <div className="h-[116px]" />
        {children}
      </div>
    </div>
  )
}
