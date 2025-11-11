import { ReactNode } from 'react'

export default function ReasonForAbsenceLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col">{children}</div>
}
