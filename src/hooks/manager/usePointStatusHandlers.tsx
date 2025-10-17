import type { Dispatch, SetStateAction } from 'react'
import { PointMemberStatus } from '@/types/manager/point/types'

type HandlersParams = {
  members: PointMemberStatus[]
  setMembers: (members: PointMemberStatus[]) => void
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
    const next = [...members]
    next[memberIndex] = { ...next[memberIndex], ...updates }
    setMembers(next)
    setModifiedCells((prev) => ({ ...prev, [cellKey]: true }))
  }

  const handleStudyChange = (memberIndex: number, value: string) => {
    updateMember(memberIndex, { study: value }, `${memberIndex}-study`)
  }

  const handleQportersChange = (memberIndex: number, value: string) => {
    updateMember(memberIndex, { qporters: value }, `${memberIndex}-qporters`)
  }

  const handleTfChange = (memberIndex: number, checked: boolean) => {
    updateMember(memberIndex, { tf: checked ? '2' : '-' }, `${memberIndex}-tf`)
  }

  const handleQpickChange = (memberIndex: number, monthKey: 'september' | 'october' | 'november', checked: boolean) => {
    const field = `qpick_${monthKey}` as 'qpick_september' | 'qpick_october' | 'qpick_november'
    updateMember(memberIndex, { [field]: checked ? '참여' : '-' }, `${memberIndex}-qpick-${monthKey}`)
  }

  const handleSessionChange = (isEditMode: boolean) => (memberIndex: number, date: string, value: string) => {
    if (!isEditMode) return
    const next = [...members]
    next[memberIndex] = {
      ...next[memberIndex],
      sessions: {
        ...next[memberIndex].sessions,
        [date]: value,
      },
    }
    setMembers(next)
    setModifiedCells((prev) => ({ ...prev, [`${memberIndex}-${date}`]: true }))
  }

  const handleSave = () => setIsManagerModalOpen(true)

  return {
    handleStudyChange,
    handleQportersChange,
    handleTfChange,
    handleQpickChange,
    handleSessionChange,
    handleSave,
  }
}
