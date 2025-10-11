'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import ManagerHeader from '@/components/manager/common/ManagerHeader'
import ManagerSidebar from '@/components/manager/common/ManagerSidebar'

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <ManagerHeader />
      <div className="flex flex-1">
        <ManagerSidebar currentPath={pathname} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
