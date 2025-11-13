'use client'

import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps {
  options: DropdownOption[]
  selected?: string
  onChange: (value: string) => void
  trigger?: React.ReactNode
}

export default function Dropdown({ options, selected, onChange, trigger }: DropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="z-50 mt-1 w-[210px] rounded-[8px] bg-white p-[6px] shadow-[0px_0px_12px_rgba(0,0,0,0.15)]"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onChange(option.value)}
            className={clsx(
              'body-md-medium flex cursor-pointer items-center gap-2 rounded-[4px] p-[10px] hover:bg-gray-100 focus:outline-none',
              selected === option.value && 'bg-gray-200'
            )}
          >
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
