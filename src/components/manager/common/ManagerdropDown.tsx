'use client'

import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

interface DropdownOption {
  label: string
  value: string
  icon?: React.ReactNode
}

interface DropdownProps {
  options: DropdownOption[]
  selected?: string
  onChange: (value: string) => void
  placeholder?: string
  icon?: React.ReactNode
  leftIcon?: React.ReactNode
  leftIconActive?: React.ReactNode
  rightIcon?: React.ReactNode
  rightIconActive?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  type?: 'default' | 'icon-list' | 'date'
  customWidth?: string
}

export default function Dropdown({
  options,
  selected,
  onChange,
  placeholder = '선택',
  icon,
  leftIcon,
  leftIconActive,
  rightIcon,
  rightIconActive,
  size = 'md',
  customWidth,
}: DropdownProps) {
  const [open, setOpen] = useState(false)

  const selectedLabel = options.find((o) => o.value === selected)?.label ?? placeholder

  const sizeClass = {
    sm: 'h-[36px] text-sm px-3 py-2',
    md: 'h-[36px] w-[140px] px-3 py-2 body-md-medium',
    lg: 'h-[40px] w-[216px] px-3 py-2 body-sm-medium',
  }[size]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={clsx(
            'flex items-center justify-between rounded-[8px] border bg-white hover:border-gray-500 focus:outline-none',
            sizeClass,
            open ? 'border-black text-black' : 'border-gray-300 text-gray-500'
          )}
        >
          <div className="flex items-center gap-2">
            {(leftIcon || leftIconActive || icon) && (
              <span className={open ? 'text-black' : 'text-gray-500'}>
                {open && leftIconActive ? leftIconActive : leftIcon || icon}
              </span>
            )}
            <span>{selectedLabel}</span>
          </div>
          {(rightIcon || rightIconActive) && (
            <span className={open ? 'text-black' : 'text-gray-500'}>
              {open && rightIconActive ? rightIconActive : rightIcon}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={clsx(
          'z-50 mt-2 rounded-[8px] border border-gray-200 bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.08)]',
          customWidth ?? 'w-[160px]'
        )}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onChange(option.value)}
            className={clsx(
              'flex cursor-pointer items-center gap-2 rounded-[6px] px-4 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
              selected === option.value && 'bg-gray-100'
            )}
          >
            {option.icon && <span>{option.icon}</span>}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
