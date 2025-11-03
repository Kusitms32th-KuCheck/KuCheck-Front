import SessionHeader from '@/components/manager/session-schedule/SessionHeader'
import type { ReactNode } from 'react'

export default function SessionScheduleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-visible">
      <SessionHeader />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
