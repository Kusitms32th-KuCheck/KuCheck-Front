import SessionHeader from '@/components/manager/session-schedule/SessionHeader'

export default function SessionAddLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionHeader />
      {children}
    </>
  )
}
