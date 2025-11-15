import type { Dispatch, SetStateAction } from 'react'
import { PointMemberStatus } from '@/types/manager/point/types'

type HandlersParams = {
  members: PointMemberStatus[]
  setMembers: Dispatch<SetStateAction<PointMemberStatus[]>>
  modifiedCells: Record<string, boolean>
  setModifiedCells: Dispatch<SetStateAction<Record<string, boolean>>>
  setIsManagerModalOpen: (open: boolean) => void
}

export default function usePointStatusHandlers({
  members,
  setMembers,
  setModifiedCells,
  setIsManagerModalOpen,
}: HandlersParams) {
  const updateMember = (memberIndex: number, updates: Partial<PointMemberStatus>, cellKey: string) => {
    setMembers((prev) => {
      const next = [...prev]
      next[memberIndex] = { ...next[memberIndex], ...updates }
      return next
    })
    setModifiedCells((prev) => ({ ...prev, [cellKey]: true }))
  }

  const handleQportersChange = (memberIndex: number, value: string) => {
    const num = value === '' ? 0 : Number(value) || 0
    updateMember(memberIndex, { kuportersPoints: num }, `${memberIndex}-qporters`)
  }

  const handleNoteChange = (memberIndex: number, value: string) => {
    updateMember(memberIndex, { memo: value }, `${memberIndex}-note`)
  }

  const handleTfChange = (memberIndex: number, checked: boolean) => {
    updateMember(memberIndex, { isTf: checked }, `${memberIndex}-tf`)
  }

  const handleStaffChange = (memberIndex: number, checked: boolean) => {
    console.log(' handleStaffChange:', {
      memberIndex,
      checked,
      currentMember: members[memberIndex],
    })
    updateMember(memberIndex, { isStaff: checked }, `${memberIndex}-staff`)
  }

  const handleQpickChange = (memberIndex: number, monthKey: 'september' | 'october' | 'november', checked: boolean) => {
    const monthMap: Record<string, number> = { september: 9, october: 10, november: 11 }
    const monthNum = monthMap[monthKey]
    const prev = members[memberIndex].kupickParticipation || { 8: false, 9: false, 10: false, 11: false, 12: false }
    const nextKupick = { ...prev, [monthNum]: checked }

    updateMember(memberIndex, { kupickParticipation: nextKupick }, `${memberIndex}-qpick-${monthKey}`)
  }

  const handleSessionChange = (isEditMode: boolean) => (memberIndex: number, date: string, value: string) => {
    if (!isEditMode) return
    setMembers((prev) => {
      const next = [...prev]
      const prevSessions = next[memberIndex].sessions ?? {}
      next[memberIndex] = {
        ...next[memberIndex],
        sessions: {
          ...prevSessions,
          [date]: value,
        },
      }
      return next
    })
    setModifiedCells((prev) => ({ ...prev, [`${memberIndex}-${date}`]: true }))
  }

  const handleSave = () => setIsManagerModalOpen(true)

  return {
    handleQportersChange,
    handleNoteChange,
    handleTfChange,
    handleStaffChange,
    handleQpickChange,
    handleSessionChange,
    handleSave,
  }
}
