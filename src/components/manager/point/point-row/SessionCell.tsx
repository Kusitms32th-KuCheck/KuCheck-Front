'use client'

import Dropdown from '../../common/ManagerdropDown'
import { PointupIcon, PointdownIcon } from '@/assets/svgComponents/manager'
import { ATTENDANCE_OPTIONS } from '@/constants/manager/point'

interface SessionCellProps {
  isEditMode: boolean
  value: string
  isModified?: boolean
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

export default function SessionCell({
  isEditMode,
  value,
  isModified = false,
  onChange,
  className = '',
  disabled = false,
}: SessionCellProps) {
  const selectedLabel = ATTENDANCE_OPTIONS.find((opt) => opt.value === value)?.label || value || ''
  return (
    <div className={className}>
      {isEditMode && !disabled ? (
        <div className={`flex h-[52px] w-full items-center justify-end pl-[13px]`}>
          <Dropdown
            unstyled
            triggerClassName={isModified ? 'body-lg-semibold text-primary-500 ' : 'text-gray-900 body-lg-medium '}
            options={ATTENDANCE_OPTIONS}
            selected={value}
            placeholder={selectedLabel || '선택'}
            onChange={(v) => onChange && onChange(v)}
            size="lg"
            rightIcon={<PointdownIcon width={10} height={8} />}
            rightIconActive={<PointupIcon width={10} height={8} />}
          />
        </div>
      ) : (
        <p
          className={`body-lg-medium flex h-[52px] w-full items-center justify-end px-[13px] ${
            disabled && isEditMode ? 'text-gray-300' : ''
          }`}
        >
          {selectedLabel}
        </p>
      )}
    </div>
  )
}
