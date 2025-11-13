'use client'

import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

interface AbsenceOption {
  label: string
  value: string
  displayValue?: string
}

interface AbsenceDropdownProps {
  options: AbsenceOption[]
  selected?: string
  onChange: (value: string) => void
  placeholder?: string
  rightIcon?: React.ReactNode
  rightIconActive?: React.ReactNode
  showValueInsteadOfLabel?: boolean
  disabled?: boolean
}

const colorMap: Record<string, { hover: string; active: string }> = {
  EXCUSED: { hover: 'hover:bg-[#FFE8E8]', active: 'bg-[#FFD0D0]' },
  ABSENT_WITH_DOC: { hover: 'hover:bg-[#FFE8E8]', active: 'bg-[#FFD0D0]' },
  ABSENT_WITH_CAUSE: { hover: 'hover:bg-[#FFE8E8]', active: 'bg-[#FFD0D0]' },
  ABSENT: { hover: 'hover:bg-[#FFE8E8]', active: 'bg-[#FFD0D0]' },
  LATE: { hover: 'hover:bg-[#FFF3D9]', active: 'bg-[#FBE6BA]' },
  EARLY_LEAVE: { hover: 'hover:bg-[#F2F2F9]', active: 'bg-[#E5E5F4]' },
}

export default function AbsenceDropdown({
  options,
  selected,
  onChange,
  placeholder = '선택',
  rightIcon,
  rightIconActive,
  showValueInsteadOfLabel = false,
  disabled = false,
}: AbsenceDropdownProps) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    if (disabled) {
      setOpen(false)
      return
    }
    setOpen(newOpen)
  }

  const selectedOption = options.find((o) => o.value === selected)

  const selectedLabel = selectedOption
    ? showValueInsteadOfLabel
      ? (selectedOption.displayValue ?? selectedOption.value)
      : selectedOption.label
    : placeholder

  const triggerClasses = open ? 'border-black text-black' : 'border-gray-300 text-gray-500'

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className={clsx(
            'flex items-center justify-between rounded-[8px] border bg-white hover:border-gray-500 focus:outline-none',
            'body-lg-regular h-[36px] w-[140px] px-3 py-2',
            triggerClasses
          )}
        >
          <span>{selectedLabel}</span>
          {(rightIcon || rightIconActive) && (
            <span className={open ? 'text-black' : 'text-gray-500'}>
              {open && rightIconActive ? rightIconActive : rightIcon}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        className="z-50 mt-1 w-[140px] rounded-[8px] bg-white p-[6px] shadow-[0px_0px_12px_rgba(0,0,0,0.15)]"
      >
        {options.map((option) => {
          const colorSet = colorMap[option.value] || {
            hover: 'hover:bg-gray-100',
            active: 'bg-gray-200',
          }
          const isSelected = selected === option.value

          return (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => onChange(option.value)}
              disabled={disabled}
              className={clsx(
                'body-md-medium flex cursor-pointer items-center justify-between rounded-[4px] p-[10px] focus:outline-none',
                colorSet.hover,
                isSelected && colorSet.active,
                disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              <span>{option.label}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
