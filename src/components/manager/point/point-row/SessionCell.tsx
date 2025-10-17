'use client'

import React from 'react'
import Dropdown from '../../common/ManagerdropDown'
import { PointupIcon, PointdownIcon } from '@/assets/svgComponents/manager'
import { ATTENDANCE_OPTIONS } from '@/constants/manager/point'

interface SessionCellProps {
  isEditMode: boolean
  value: string
  isModified?: boolean
  onChange?: (value: string) => void
  className?: string
}

export default function SessionCell({
  isEditMode,
  value,
  isModified = false,
  onChange,
  className = '',
}: SessionCellProps) {
  return (
    <div className={className}>
      {isEditMode ? (
        <div className={`flex h-[52px] w-full items-center justify-end`}>
          <Dropdown
            unstyled
            triggerClassName={isModified ? 'body-lg-semibold text-primary-500 ' : 'text-gray-900 body-lg-medium '}
            options={ATTENDANCE_OPTIONS}
            selected={value}
            placeholder={value || '선택'}
            onChange={(v) => onChange && onChange(v)}
            size="md"
            rightIcon={<PointdownIcon width={10} height={8} />}
            rightIconActive={<PointupIcon width={10} height={8} />}
          />
        </div>
      ) : (
        <p className={`body-lg-medium flex h-[52px] w-full items-center justify-end`}>{value || ''}</p>
      )}
    </div>
  )
}
