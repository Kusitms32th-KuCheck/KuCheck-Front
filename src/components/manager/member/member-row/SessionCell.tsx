'use client'

import React, { useEffect, useState } from 'react'
import Dropdown from '../../common/ManagerdropDown'
import { PointupIcon, PointdownIcon } from '@/assets/svgComponents/manager'
import { MEMBER_OPTIONS } from '@/types/manager/member/types'

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
  const [selectedLocal, setSelectedLocal] = useState<string>(value)

  useEffect(() => {
    setSelectedLocal(value)
  }, [value])

  const handleChange = (v: string) => {
    if (onChange) onChange(v)
    setSelectedLocal(v)
  }

  return (
    <div className={className}>
      {isEditMode ? (
        <div className={`flex h-[52px] w-full items-center justify-start pr-[1px]`}>
          <Dropdown
            unstyled
            triggerClassName={isModified ? 'body-lg-semibold text-primary-500 ' : 'text-gray-900 body-lg-medium '}
            options={MEMBER_OPTIONS}
            selected={selectedLocal}
            placeholder={value || '선택'}
            onChange={handleChange}
            size="sm"
            rightIcon={<PointdownIcon width={10} height={8} />}
            rightIconActive={<PointupIcon width={10} height={8} />}
          />
        </div>
      ) : (
        <p className={`body-lg-medium flex h-[52px] w-full items-center justify-start`}>{value || ''}</p>
      )}
    </div>
  )
}
