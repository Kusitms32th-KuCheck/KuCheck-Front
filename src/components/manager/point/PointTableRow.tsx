'use client'

import { UpIcon, DownIcon } from '@/assets/svgComponents/manager'
import Dropdown from '../common/ManagerdropDown'
import { PointMemberStatus, VisibleDate } from '@/types/manager/point/types'
import { ATTENDANCE_OPTIONS } from '@/types/manager/point/constants'

interface PointTableRowProps {
  member: PointMemberStatus
  memberIndex: number
  visibleDates: VisibleDate[]
  isEditMode: boolean
  onSessionChange: (memberIndex: number, date: string, value: string) => void
  gridTemplate: string
  collapsedMonths: Set<string>
}

export default function PointTableRow({
  member,
  memberIndex,
  visibleDates,
  isEditMode,
  onSessionChange,
  gridTemplate,
  collapsedMonths,
}: PointTableRowProps) {
  const baseBg = memberIndex % 2 === 0 ? 'bg-white' : 'bg-background1'

  return (
    <div className={`group grid cursor-default items-center gap-0`} style={{ gridTemplateColumns: gridTemplate }}>
      <p
        className={`body-lg-medium flex h-[52px] items-center border-r border-gray-200 px-[30px] text-start text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.name}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.point}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-gray-900 ${baseBg} group-hover:bg-primary-100`}
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
                className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-gray-900 ${baseBg} group-hover:bg-primary-100`}
              >
                {isCollapsed ? monthScore : ''}
              </p>
            </div>
          )
        }

        const date = item.date
        const value = member.sessions[date]

        return (
          <div key={dateIndex} className="flex justify-end">
            {isEditMode ? (
              <div className={`${baseBg} group-hover:bg-gray-100`}>
                <Dropdown
                  size="sm"
                  options={ATTENDANCE_OPTIONS}
                  selected={value}
                  onChange={(newValue) => onSessionChange(memberIndex, date, newValue)}
                  rightIcon={<DownIcon width={12} height={12} />}
                  rightIconActive={<UpIcon width={12} height={12} />}
                />
              </div>
            ) : (
              <p
                className={`body-lg-medium flex h-[52px] w-full items-center justify-end border-r border-gray-200 px-[13px] text-gray-900 ${baseBg} group-hover:bg-primary-100`}
              >
                {value || ''}
              </p>
            )}
          </div>
        )
      })}

      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.qpick_september}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.qpick_october}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.qpick_november}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.tf}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.study}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.qporters}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.is_manager ? '운영진(1)' : '학회원'}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.phone}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.school}
      </p>
      <p
        className={`body-lg-medium flex h-[52px] items-center justify-end px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-primary-100`}
      >
        {member.major}
      </p>
    </div>
  )
}
