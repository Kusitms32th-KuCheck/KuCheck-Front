import SessionHeader from '@/components/manager/session-schedule/SessionHeader'
export default function SessionScheduleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionHeader />
      {children}
    </>
  )
}
