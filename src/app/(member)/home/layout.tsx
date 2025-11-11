import MemberHeader from '@/components/member/common/MemberHeader'
import { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="desktop:w-[375px] bg-background2 flex min-h-screen flex-col">
      <MemberHeader />
      <div className="h-[100px]" />
      {children}
    </div>
  )
}
