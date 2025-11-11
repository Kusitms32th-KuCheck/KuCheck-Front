import { ReactNode } from 'react'

export default function ReasonForAbsenceSubmitLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>
}
