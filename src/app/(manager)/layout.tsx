'use client'

import { usePathname } from 'next/navigation'
import ManagerHeader from '@/components/manager/common/ManagerHeader'
import ManagerSidebar from '@/components/manager/common/ManagerSidebar'

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="bg-background2 flex h-screen flex-col">
      <ManagerHeader />
      <div className="flex flex-1 overflow-hidden">
        <ManagerSidebar currentPath={pathname} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
