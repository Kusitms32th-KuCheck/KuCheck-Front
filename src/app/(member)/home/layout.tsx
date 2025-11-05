import MemberHeader from '@/components/member/common/MemberHeader'
import { ToastProvider } from '@/components/member/common/toast/ToastContext'
import ToastContainer from '@/components/member/common/toast/ToastContainer'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="desktop:w-[375px] bg-background2 flex min-h-screen flex-col">
      <MemberHeader />
      <div className="h-[100px]" />
      <ToastProvider>
        {children}
        <ToastContainer />
      </ToastProvider>
    </div>
  )
}
