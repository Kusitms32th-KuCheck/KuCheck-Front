'use client'

import { PointMemberStatus, VisibleDate } from '@/types/manager/point/types'
import CheckboxCell from './CheckboxCell'
import EditableTextCell from './EditableTextCell'
import SessionCell from './SessionCell'

interface PointTableRowProps {
  member: PointMemberStatus
  memberIndex: number
  visibleDates: VisibleDate[]
  isEditMode: boolean
  onStudyChange: (memberIndex: number, value: string) => void
  onQportersChange: (memberIndex: number, value: string) => void
  onSessionChange: (memberIndex: number, date: string, value: string) => void
  modifiedCells: Record<string, boolean>
  onTfChange?: (memberIndex: number, checked: boolean) => void
  onQpickChange?: (memberIndex: number, monthKey: 'september' | 'october' | 'november', checked: boolean) => void
  gridTemplate: string
  collapsedMonths: Set<string>
}

export default function PointTableRow({
  member,
  memberIndex,
  visibleDates,
  isEditMode,
  onStudyChange,
  onQportersChange,
  onSessionChange,
  modifiedCells,
  onTfChange,
  onQpickChange,
  gridTemplate,
  collapsedMonths,
}: PointTableRowProps) {
  const baseBg = memberIndex % 2 === 0 ? 'bg-white' : 'bg-background1'
  const isStudyModified = Boolean(modifiedCells && modifiedCells[`${memberIndex}-study`])
  const isQportersModified = Boolean(modifiedCells && modifiedCells[`${memberIndex}-qporters`])
  return (
    <div className={`group grid cursor-default items-center gap-0`} style={{ gridTemplateColumns: gridTemplate }}>
      <p
        className={`body-lg-medium flex h-[52px] items-center border-r border-gray-200 px-[30px] text-start text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {member.name}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {member.point}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {member.part}
      </p>

      {visibleDates.map((item, dateIndex) => {
        if (item.month) {
          let monthScore = 0
          if (item.month === '8월') monthScore = member.score.august
          else if (item.month === '9월') monthScore = member.score.september
          else if (item.month === '10월') monthScore = member.score.october
          else if (item.month === '11월') monthScore = member.score.november
          else if (item.month === '12월') monthScore = member.score.december

          const isCollapsed = collapsedMonths.has(item.month)
          return (
            <div key={dateIndex}>
              <p
                className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-gray-900 ${baseBg} group-hover:bg-gray-100`}
              >
                {isCollapsed ? monthScore : ''}
              </p>
            </div>
          )
        }

        const date = item.date
        const value = member.sessions[date]

        const keyId = `${memberIndex}-${date}`
        const isModified = Boolean((modifiedCells && modifiedCells[keyId]) || false)

        return (
          <div key={dateIndex} className="flex justify-end">
            <SessionCell
              isEditMode={isEditMode}
              value={value}
              isModified={isModified}
              onChange={(v) => onSessionChange(memberIndex, date, v)}
              className={`w-full border-r border-gray-200 group-hover:bg-gray-100 ${baseBg} px-[1px]`}
            />
          </div>
        )
      })}

      {(
        [
          { key: 'qpick_september', value: member.qpick_september, type: 'qpick', month: 'september' },
          { key: 'qpick_october', value: member.qpick_october, type: 'qpick', month: 'october' },
          { key: 'qpick_november', value: member.qpick_november, type: 'qpick', month: 'november' },
          { key: 'tf', value: member.tf, type: 'tf' },
        ] as const
      ).map((col) => (
        <CheckboxCell
          key={col.key}
          isEditMode={isEditMode}
          checked={col.type === 'qpick' ? col.value === '참여' : col.value === '2'}
          onChange={(checked) =>
            col.type === 'qpick'
              ? onQpickChange && onQpickChange(memberIndex, col.month as 'september' | 'october' | 'november', checked)
              : onTfChange && onTfChange(memberIndex, checked)
          }
          display={col.value}
          className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
        />
      ))}
      {(
        [
          {
            key: 'study',
            value: member.study,
            isModified: isStudyModified,
            onChange: (v: string) => onStudyChange(memberIndex, v),
          },
          {
            key: 'qporters',
            value: member.qporters,
            isModified: isQportersModified,
            onChange: (v: string) => onQportersChange(memberIndex, v),
          },
        ] as const
      ).map((col) => (
        <EditableTextCell
          key={col.key}
          isEditMode={isEditMode}
          value={col.value}
          isModified={col.isModified}
          onChange={(v) => col.onChange(v)}
          className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} focus-within:border-primary-500 group-hover:bg-gray-100 focus-within:border-2`}
        />
      ))}
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {member.is_manager ? '운영진(1)' : '학회원'}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {member.phone}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {member.school}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {member.major}
      </p>
    </div>
  )
}
