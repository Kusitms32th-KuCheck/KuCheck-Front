import { ReactNode } from 'react'

export default function AttendanceCheckLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] bg-background1 relative min-h-screen w-full">{children}</div>
    </main>
  )
}
