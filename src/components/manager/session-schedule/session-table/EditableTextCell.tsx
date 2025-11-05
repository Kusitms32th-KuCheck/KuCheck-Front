'use client'

import { useState } from 'react'

interface EditableTextCellProps {
  isEditMode: boolean
  value: string
  isModified?: boolean
  onChange?: (v: string) => void
  className?: string
  forceTextBlack?: boolean
}

export default function EditableTextCell({
  isEditMode,
  value,
  isModified = false,
  onChange,
  className = '',
  forceTextBlack = false,
}: EditableTextCellProps) {
  const [focused, setFocused] = useState(false)
  const containerClass = `${className} ${focused ? 'ring-inset ring-primary-500 ring-2' : ''}`

  return (
    <div className={containerClass}>
      {isEditMode ? (
        <input
          className={`w-full rounded-[6px] border border-transparent py-2 text-left ${
            forceTextBlack ? 'text-gray-800' : isModified ? 'text-primary-500' : 'text-gray-600'
          } placeholder:text-gray-600 focus:outline-none`}
          value={value}
          placeholder="입력"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      ) : (
        <p className={forceTextBlack ? 'text-gray-800' : isModified ? 'text-gray-300' : value ? '' : 'text-gray-300'}>
          {value || '입력'}
        </p>
      )}
    </div>
  )
}
