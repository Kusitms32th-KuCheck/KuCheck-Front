'use client'

import { useState } from 'react'
import { ATTENDANCE_OPTIONS } from '@/constants/manager/point'
import { usePointTableStore } from '@/store/manager/usePointTableStore'
import { PointMemberStatus, VisibleDate, MonthlyAttendanceResult } from '@/types/manager/point/types'
import CheckboxCell from './CheckboxCell'
import EditableTextCell from './EditableTextCell'
import SessionCell from './SessionCell'
import { getPartName } from '@/utils/manager/attendance'
import RoleTag from '../../common/RoleTag'

interface PointTableRowProps {
  member: PointMemberStatus
  memberIndex: number
  visibleDates: VisibleDate[]
  isEditMode: boolean
  onQportersChange: (memberIndex: number, value: string) => void
  onSessionChange: (memberIndex: number, date: string, value: string) => void
  modifiedCells: Record<string, boolean>
  onTfChange?: (memberIndex: number, checked: boolean) => void
  onStaffChange?: (memberIndex: number, checked: boolean) => void
  onQpickChange?: (memberIndex: number, monthKey: 'september' | 'october' | 'november', checked: boolean) => void
  onNoteChange?: (memberIndex: number, value: string) => void
  onMonthlyAttendanceChange?: (memberIndex: number, attendanceId: number, newStatus: string, date: string) => void
  gridTemplate: string
  collapsedMonths: Set<string>
  isHorizScrolled?: boolean
  monthlyData: Record<number, MonthlyAttendanceResult>
}

export default function PointTableRow({
  member,
  memberIndex,
  visibleDates,
  isEditMode,
  onQportersChange,
  onSessionChange,
  modifiedCells,
  onTfChange,
  onQpickChange,
  onStaffChange,
  onNoteChange,
  onMonthlyAttendanceChange,
  gridTemplate,
  collapsedMonths,
  isHorizScrolled,
  monthlyData,
}: PointTableRowProps) {
  const pendingAttendanceChanges = usePointTableStore((s) => s.pendingAttendanceChanges)
  const [showMemoTooltip, setShowMemoTooltip] = useState(false)
  const baseBg = memberIndex % 2 === 0 ? 'bg-white' : 'bg-background1'
  const isQportersModified = Boolean(modifiedCells && modifiedCells[`${memberIndex}-qporters`])
  const isNoteModified = Boolean(modifiedCells && modifiedCells[`${memberIndex}-note`])

  // 월별 데이터에서 해당 회원의 출결 정보 추출
  // console.log('월별 데이터:', monthlyData)
  // console.log('현재 회원:', member.name, member.memberId)

  // API 데이터에서 회원별 출결 정보를 가져오는 함수
  const getMemberAttendanceData = (date: string) => {
    const [monthStr, dayStr] = date.split('/')
    const month = parseInt(monthStr)
    const day = parseInt(dayStr)

    const monthData = monthlyData[month]
    if (!monthData?.members?.data) {
      return null
    }

    // 해당 회원 찾기
    const memberData = monthData.members.data.find((m) => m.memberId === member.memberId)
    if (!memberData) {
      return null
    }

    // 해당 날짜의 출결 기록 찾기 - 여러 형식 시도
    const currentYear = new Date().getFullYear()
    const targetDateStr1 = `${currentYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    const targetDateStr2 = `${month}/${day}`
    const targetDateStr3 = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`

    let record = memberData.records.find(
      (r) => r.date === targetDateStr1 || r.date === targetDateStr2 || r.date === targetDateStr3
    )

    // 해당 일자의 모든 기록을 찾아서 가장 최근 기록 또는 포인트가 있는 기록 사용
    const dayRecords = memberData.records.filter((r) => {
      const recordDate = new Date(r.date)
      return recordDate.getMonth() + 1 === month && recordDate.getDate() === day
    })

    if (dayRecords.length > 0) {
      // 포인트가 0이 아닌 기록을 우선하거나, 없으면 마지막 기록
      record = dayRecords.find((r) => r.point !== 0) || dayRecords[dayRecords.length - 1]
    }

    return record
  }

  // 월별 출석 점수 계산 (API 데이터 기반)
  const getMonthlyScore = (month: number) => {
    const monthData = monthlyData[month]
    if (!monthData?.members?.data) return 0

    const memberData = monthData.members.data.find((m) => m.memberId === member.memberId)
    if (!memberData) return 0

    // 해당 월의 모든 출결 기록의 점수 합계
    const totalScore = memberData.records.reduce((sum, record) => {
      return sum + (record.point || 0)
    }, 0)

    return totalScore
  }

  type QpickCol = {
    key: string
    value?: boolean | number
    type: 'qpick' | 'tf'
    month?: 'september' | 'october' | 'november'
  }
  const qpickCols: QpickCol[] = [
    { key: 'qpick_september', value: member.kupickParticipation?.[9], type: 'qpick', month: 'september' },
    { key: 'qpick_october', value: member.kupickParticipation?.[10], type: 'qpick', month: 'october' },
    { key: 'qpick_november', value: member.kupickParticipation?.[11], type: 'qpick', month: 'november' },
    { key: 'tf', value: member.isTf ? 2 : 0, type: 'tf' },
  ]

  // 모든 월의 출석 점수 합산
  const attendanceTotal =
    Object.values(member.attendanceMonthlyTotals || {}).reduce((s, n) => s + (n || 0), 0)

  // 큐픽 참여 점수 (9, 10, 11월)
  const kupickPoints =
    (member.kupickParticipation?.[9] ? 2 : 0) +
    (member.kupickParticipation?.[10] ? 2 : 0) +
    (member.kupickParticipation?.[11] ? 2 : 0)

  // TF 점수
  const tfPoints = member.isTf ? 2 : 0

  // 큐포터즈 점수 (입력값)
  const kuportersPoints = Number(member.kuportersPoints) || 0

  // 운영진/학회원 점수
  const staffPoints = member.isStaff ? 1 : 0

  // 모든 점수 합산
  const totalPoints =
    attendanceTotal + kupickPoints + tfPoints + kuportersPoints + staffPoints

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
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] ${
          totalPoints <= -5 ? 'text-sub-red' : 'text-gray-900'
        } ${baseBg} group-hover:bg-gray-100`}
      >
        {totalPoints}
      </p>

      <div
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 pr-[8px] text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        <RoleTag label={getPartName(member.part)} />
      </div>

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
          const monthScore = monthKey ? getMonthlyScore(monthKey) : 0

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
        // API 데이터에서 해당 날짜의 출결 정보 가져오기
        const attendanceRecord = getMemberAttendanceData(date)

        // 셀 표시값: 수정 중이면 파란색, 저장 후에는 검정색
        const attendanceChangeKey = attendanceRecord?.attendanceId ? String(attendanceRecord.attendanceId) : undefined
        let value = ''
        let displayClass = ''
        let isRecordExists = false
        const pendingChange = attendanceChangeKey ? pendingAttendanceChanges[attendanceChangeKey] : undefined
        if (isEditMode && pendingChange) {
          // 수정 중: 변경사항이 있으면 드롭다운 label로 파란색 표시
          const opt = ATTENDANCE_OPTIONS.find((o) => o.value === pendingChange.status)
          value = opt ? opt.label : pendingChange.status
          displayClass = 'text-primary-500'
          isRecordExists = true
        } else if (attendanceRecord) {
          // 저장 후: 항상 attendanceRecord 기준 검정색 표시
          isRecordExists = true
          const status = attendanceRecord.status
          switch (status) {
            case 'PRESENT':
              if (attendanceRecord.point === 0) {
                value = '출석(0)'
              } else if (attendanceRecord.point === 1) {
                value = '출석(1)'
              } else {
                value = `출석(${attendanceRecord.point})`
              }
              displayClass = 'text-gray-900'
              break
            case 'ABSENT':
            case 'ABSENT_WITH_DOC':
            case 'ABSENT_WITHOUT_DOC':
            case 'ABSENT_NO_SUBMISSION':
              if (attendanceRecord.point === -2) {
                value = '결석(사유 -2)'
              } else if (attendanceRecord.point === -2) {
                value = '결석(무단 -2)'
              } else if (attendanceRecord.point === -3) {
                value = '결석(미제출 -3)'
              } else {
                value = `결석(${attendanceRecord.point})`
              }
              displayClass = 'text-gray-900'
              break
            case 'LATE':
              value = '지각(-1)'
              displayClass = 'text-gray-900'
              break
            case 'EARLY_LEAVE':
              value = '조퇴(-1)'
              displayClass = 'text-gray-900'
              break
            default:
              value = '미기록'
              displayClass = 'text-gray-300'
              isRecordExists = false
          }
        } else {
          value = '미기록'
          displayClass = 'text-gray-300'
          isRecordExists = false
        }

        const keyId = `${memberIndex}-${date}`
        const isModified = Boolean((modifiedCells && modifiedCells[keyId]) || false)
        // 월별 출석 변경사항이 있는지 추가로 확인

        const isPendingAttendanceChange = !!(attendanceChangeKey && pendingAttendanceChanges[attendanceChangeKey])
        const isCellModified = isModified || isPendingAttendanceChange

        // 월별 출결 데이터를 위한 핸들러
        const handleAttendanceChange = async (newStatus: string) => {
          if (attendanceRecord?.attendanceId && onMonthlyAttendanceChange) {
            try {
              onMonthlyAttendanceChange(memberIndex, attendanceRecord.attendanceId, newStatus, date)
            } catch (error) {
              console.error('Failed to update monthly attendance:', error)
            }
          } else {
            // 기존 세션 데이터 처리
            onSessionChange(memberIndex, date, newStatus)
          }
        }

        return (
          <div key={dateIndex} className="flex justify-end">
            <SessionCell
              isEditMode={isEditMode}
              value={value}
              isModified={isCellModified}
              onChange={handleAttendanceChange}
              className={`w-full border-r border-gray-200 group-hover:bg-gray-100 ${baseBg} ${displayClass}`}
              disabled={!isRecordExists}
            />
          </div>
        )
      })}

      {qpickCols.map((col) => {
        const checked = Boolean(col.value)
        let displayText = ''
        if (col.type === 'qpick') displayText = col.value ? '참여' : '미참여'
        else if (col.type === 'tf') displayText = String(col.value)
        else displayText = col.value ? 'TF' : ''

        const handleChange = (checked: boolean) => {
          if (col.type === 'qpick') {
            if (onQpickChange && col.month) {
              onQpickChange(memberIndex, col.month as 'september' | 'october' | 'november', checked)
            }
          } else if (col.type === 'tf') {
            if (onTfChange) {
              onTfChange(memberIndex, checked)
            }
          }
        }

        return (
          <CheckboxCell
            key={col.key}
            isEditMode={isEditMode}
            checked={checked}
            onChange={handleChange}
            display={displayText}
            className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
          />
        )
      })}

      {(
        [
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

      <CheckboxCell
        isEditMode={isEditMode}
        checked={Boolean(member.isStaff)}
        onChange={(checked) => {
          if (onStaffChange) {
            onStaffChange(memberIndex, checked)
          }
        }}
        display={member.isStaff ? '운영진(1)' : '학회원'}
        className={`body-lg-medium flex h-[52px] items-center justify-end border-r border-gray-200 px-[13px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      />

      <div className="relative">
        <div
          onClick={() => {
            const memoText = member.memo ?? ''
            if (memoText.length > 20) {
              setShowMemoTooltip(!showMemoTooltip)
            }
          }}
          className="cursor-pointer"
        >
          <EditableTextCell
            key={`note-${memberIndex}`}
            isEditMode={isEditMode}
            value={member.memo ?? ''}
            isModified={isNoteModified}
            onChange={(v) => onNoteChange && onNoteChange(memberIndex, v)}
            className={`body-lg-medium flex h-[52px] w-[340px] items-center justify-end overflow-hidden border-r border-gray-200 px-[13px] text-start text-ellipsis whitespace-nowrap text-gray-900 group-hover:bg-gray-100 ${baseBg}`}
          />
        </div>
        {showMemoTooltip && (member.memo ?? '').length > 20 && (
          <div className="shadow-middlemodal absolute top-full left-0 z-50 mt-2 w-[338px] rounded-[12px] bg-white p-4">
            <div className="max-h-40 overflow-y-auto">
              <p className="body-lg-medium leading-relaxed break-words whitespace-pre-wrap">{member.memo}</p>
            </div>
          </div>
        )}
      </div>

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
        className={`body-lg-medium flex h-[52px] items-center justify-end px-[24px] text-end text-gray-900 ${baseBg} group-hover:bg-gray-100`}
      >
        {member.major}
      </p>
    </div>
  )
}
