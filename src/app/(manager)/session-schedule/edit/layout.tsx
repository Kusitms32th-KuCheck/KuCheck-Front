import SessionHeader from '@/components/manager/session-schedule/SessionHeader'

export default function SessionEditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionHeader />
      {children}
    </>
  )
}
