import SessionHeader from '@/components/manager/session-schedule/SessionHeader'
import { SessionEditProvider } from '@/components/manager/session-schedule/SessionEditContext'
export default function SessionScheduleLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionEditProvider>
      <SessionHeader />
      {children}
    </SessionEditProvider>
  )
}
