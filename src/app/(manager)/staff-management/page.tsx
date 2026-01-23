'use client'
import TeamTable from '@/components/manager/staff-management/TeamTable'
import StaffHeader from '@/components/manager/staff-management/StaffHeader'
import { useState, useRef } from 'react'

export default function StaffManagementPage() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [handleSaveRoles, setHandleSaveRoles] = useState<(() => void) | null>(null)
  const teamTableRef = useRef<{ refreshData: () => void }>(null)

  const handleStaffUpdated = () => {
    teamTableRef.current?.refreshData()
  }

  return (
    <main className="flex h-full flex-col overflow-visible">
      <StaffHeader 
        isEditMode={isEditMode} 
        setIsEditMode={setIsEditMode} 
        onSaveRoles={handleSaveRoles ?? undefined}
        onStaffUpdated={handleStaffUpdated}
      />
      <div className="px-6 pt-6 flex flex-1">
        <TeamTable 
          ref={teamTableRef}
          isEditMode={isEditMode} 
          setHandleSaveRoles={setHandleSaveRoles} 
        />
      </div>
    </main>
  )
}
