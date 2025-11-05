import SessionHeader from '@/components/manager/session-schedule/session-add/SessionHeader'

export default function SessionAddLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Use save-only header on add page (no edit toggle) */}
      <SessionHeader saveOnly />
      {children}
    </>
  )
}
