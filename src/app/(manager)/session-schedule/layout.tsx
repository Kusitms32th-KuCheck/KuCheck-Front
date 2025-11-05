import { SessionEditProvider } from '@/components/manager/session-schedule/session-table/SessionEditContext'

export default function SessionScheduleLayout({ children }: { children: React.ReactNode }) {
  return <SessionEditProvider>{children}</SessionEditProvider>
}
