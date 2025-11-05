'use client'

import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

interface DropdownOption {
  label: string
  value: string
  displayValue?: string
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
  size?: 'sm' | 'md' | 'lg' | 'add'
  type?: 'default' | 'icon-list' | 'date'
  customWidth?: string
  showValueInsteadOfLabel?: boolean
  unstyled?: boolean
  triggerClassName?: string
  disabled?: boolean
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
  size = 'sm',
  customWidth,
  showValueInsteadOfLabel = false,
  unstyled = false,
  triggerClassName = '',
  disabled = false,
}: DropdownProps) {
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

  const sizeClass = {
    sm: 'h-[36px] w-[140px] px-3 py-2 body-lg-regular',

    md: 'h-[36px] w-[193px] px-6 ',
    lg: 'h-[40px] gap-2 py-2 body-lg-medium',
    add: 'h-[40px] w-[66px] body-lg-medium px-3 ',

  }[size]
  const resolvedTriggerClassWhenOpen = (() => {
    if (!triggerClassName) return 'text-primary-500'
    const parts = triggerClassName.split(/\s+/)
    const replaced = parts.map((p) => (p.startsWith('text-') ? 'text-primary-500' : p))
    return Array.from(new Set(replaced)).join(' ')
  })()

  const triggerClasses = (() => {
    if (unstyled) return open ? resolvedTriggerClassWhenOpen : triggerClassName
    if (triggerClassName) {
      return open ? `${resolvedTriggerClassWhenOpen} border-primary-500` : `${triggerClassName} border-gray-300`
    }
    return open ? 'border-black text-black' : 'border-gray-300 text-gray-500'
  })()

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className={clsx(
            unstyled
              ? 'flex items-center justify-between border-0 bg-transparent p-0 focus:outline-none'
              : 'flex items-center justify-between rounded-[8px] border bg-white hover:border-gray-500 focus:outline-none',
            sizeClass,
            triggerClasses,
            disabled && 'pointer-events-none cursor-not-allowed bg-gray-100 opacity-60'
          )}
          style={size === 'md' && !selectedOption ? { color: '#4B5563' } : undefined}
          disabled={disabled}
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
        side="bottom"
        align="end"
        className={clsx(
          'z-50 mt-1 rounded-[8px] bg-white p-[6px] shadow-[0px_0px_12px_rgba(0,0,0,0.15)]',
          size === 'lg' && 'scrollbar-hide max-h-[222px] w-[216px] overflow-y-auto',
          size === 'md' && 'w-[193px]',
          size === 'sm' && 'w-[140px]',
          size === 'add' && '] w-[66px]',
          customWidth && customWidth
        )}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onChange(option.value)}
            disabled={disabled}
            className={clsx(
              'flex cursor-pointer items-center gap-2 rounded-[4px] p-[10px] hover:bg-gray-100 focus:outline-none',
              selected === option.value && 'bg-gray-200',
              size === 'lg' && 'body-lg-medium',
              size === 'sm' && 'body-md-medium',
              size === 'add' && 'body-lg-medium h-[32px] justify-center',
              disabled && 'cursor-not-allowed opacity-60'
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
