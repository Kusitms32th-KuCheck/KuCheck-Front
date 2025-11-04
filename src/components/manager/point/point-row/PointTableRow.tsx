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
  onNoteChange?: (memberIndex: number, value: string) => void
  gridTemplate: string
  collapsedMonths: Set<string>
  isHorizScrolled?: boolean
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
  onNoteChange,
  gridTemplate,
  collapsedMonths,
  isHorizScrolled,
}: PointTableRowProps) {
  const baseBg = memberIndex % 2 === 0 ? 'bg-white' : 'bg-background1'
  const isStudyModified = Boolean(modifiedCells && modifiedCells[`${memberIndex}-study`])
  const isQportersModified = Boolean(modifiedCells && modifiedCells[`${memberIndex}-qporters`])
  const isNoteModified = Boolean(modifiedCells && modifiedCells[`${memberIndex}-note`])
  return (
    <div className={`group grid cursor-default items-center gap-0`} style={{ gridTemplateColumns: gridTemplate }}>
      <div className={`relative sticky left-0 z-10 h-[52px]`}>
        <p
          className={`body-lg-medium flex h-[52px] items-center border-r border-gray-200 px-[30px] text-start text-gray-900 ${
            baseBg
          } group-hover:bg-gray-100 ${
            isHorizScrolled
              ? 'after:pointer-events-none after:absolute after:top-0 after:-right-[20px] after:bottom-0 after:w-[20px] after:bg-gradient-to-r after:from-black/10 after:to-transparent'
              : ''
          }`}
        >
          {member.name}
        </p>
      </div>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {(() => {
          const monthly = member.attendanceMonthlyTotals || ({} as Record<number, number>)
          const monthlySum = [8, 9, 10, 11, 12].reduce((s, m) => s + (monthly[m as keyof typeof monthly] || 0), 0)
          const study = member.studyPoints ?? 0
          const kuporters = member.kuportersPoints ?? 0
          return monthlySum + study + kuporters
        })()}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {member.part}
      </p>
      {visibleDates.map((item, dateIndex) => {
        if (item.month) {
          const monthMap: Record<string, 8 | 9 | 10 | 11 | 12> = {
            '8월': 8,
            '9월': 9,
            '10월': 10,
            '11월': 11,
            '12월': 12,
          }
          const monthKey = monthMap[item.month]
          const monthScore = monthKey ? (member.attendanceMonthlyTotals[monthKey] ?? 0) : 0

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
        const sessions = member.sessions
        const value = sessions?.[date] ?? ''

        const keyId = `${memberIndex}-${date}`
        const isModified = Boolean((modifiedCells && modifiedCells[keyId]) || false)

        return (
          <div key={dateIndex} className="flex justify-end">
            <SessionCell
              isEditMode={isEditMode}
              value={value}
              isModified={isModified}
              onChange={(v) => onSessionChange(memberIndex, date, v)}
              className={`w-full border-r border-gray-200 group-hover:bg-gray-100 ${baseBg} `}
            />
          </div>
        )
      })}
      {(
        [
          { key: 'qpick_september', value: member.kupickParticipation?.[9], type: 'qpick', month: 'september' },
          { key: 'qpick_october', value: member.kupickParticipation?.[10], type: 'qpick', month: 'october' },
          { key: 'qpick_november', value: member.kupickParticipation?.[11], type: 'qpick', month: 'november' },
          { key: 'tf', value: member.isTf, type: 'tf' },
        ] as const
      ).map((col) => (
        <CheckboxCell
          key={col.key}
          isEditMode={isEditMode}
          checked={Boolean(col.value)}
          onChange={(checked) =>
            col.type === 'qpick'
              ? onQpickChange && onQpickChange(memberIndex, col.month as 'september' | 'october' | 'november', checked)
              : onTfChange && onTfChange(memberIndex, checked)
          }
          display={col.type === 'qpick' ? (col.value ? '참여' : '미참여') : col.value ? 'TF' : ''}
          className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
        />
      ))}
      {(
        [
          {
            key: 'study',
            value: member.studyPoints ? String(member.studyPoints) : '',
            isModified: isStudyModified,
            onChange: (v: string) => onStudyChange(memberIndex, v),
          },
          {
            key: 'qporters',
            value: member.kuportersPoints ? String(member.kuportersPoints) : '',
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
        {member.isStaff ? '운영진(1)' : '학회원'}
      </p>
      <EditableTextCell
        key={`note-${memberIndex}`}
        isEditMode={isEditMode}
        value={member.memo ?? ''}
        isModified={isNoteModified}
        onChange={(v) => onNoteChange && onNoteChange(memberIndex, v)}
        className={`body-lg-medium flex h-[52px] w-[340px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      />
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {member.phoneNumber}
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
