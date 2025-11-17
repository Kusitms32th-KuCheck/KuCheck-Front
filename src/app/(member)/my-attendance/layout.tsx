import MemberHeader from '@/components/member/common/MemberHeader'
import { ReactNode } from 'react'

export default function MyAttendanceLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] bg-background1 relative flex min-h-screen w-full flex-col overflow-y-scroll">
        <MemberHeader headerType="dynamic" title={'상벌점 확인'} headerColor={'bg-background1'} backPath={'/home'} />
        <div className="h-[116px]" />
        {children}
      </div>
    </main>
  )
}
