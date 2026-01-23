import SessionHeader from '@/components/manager/session-schedule/session-table/SessionHeader'

export default function SessionAddLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionHeader saveOnly />
      {children}
    </>
  )
}
