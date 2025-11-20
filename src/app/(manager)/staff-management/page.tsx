'use client'
import TeamTable from '@/components/manager/staff-management/TeamTable'
import StaffHeader from '@/components/manager/staff-management/StaffHeader'
import { useState } from 'react'
export default function StaffManagementPage() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [handleSaveRoles, setHandleSaveRoles] = useState<(() => void) | null>(null)

  return (
    <main className="flex h-full flex-col overflow-visible">
      <StaffHeader isEditMode={isEditMode} setIsEditMode={setIsEditMode} onSaveRoles={handleSaveRoles ?? undefined} />
      <div className="px-6 pt-6 flex flex-1">
        <TeamTable isEditMode={isEditMode} setHandleSaveRoles={setHandleSaveRoles} />
      </div>
    </main>
  )
}
