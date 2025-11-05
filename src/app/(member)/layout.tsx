import ToastContainer from '@/components/member/common/toast/ToastContainer'
import { ToastProvider } from '@/components/member/common/toast/ToastContext'

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="desktop:flex desktop:flex-col desktop:items-center desktop:justify-center flex w-full flex-col">
      <ToastProvider>
        {children}
        <ToastContainer />
      </ToastProvider>
    </div>
  )
}
