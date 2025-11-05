import { SessionEditProvider } from '@/components/manager/session-schedule/SessionEditContext'

export default function SessionScheduleLayout({ children }: { children: React.ReactNode }) {
  return <SessionEditProvider>{children}</SessionEditProvider>
}
