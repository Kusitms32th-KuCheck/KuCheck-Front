'use client'
import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { DownIcon, UpIcon } from '@/assets/svgComponents/manager'
import { getClientAvailableCategoryColors } from '@/lib/manager/client/notice'

interface DropdownOption {
  label: string
  value: string
  icon?: React.ReactNode
}

interface ColorSelectDropdownProps {
  options: DropdownOption[]
  selected: string
  onChange: (value: string) => void
  refreshTrigger?: number
  placeholder?: string
}

export default function ColorSelectDropdown({
  options,
  selected,
  onChange,
  refreshTrigger = 0,
  placeholder = '색상',
}: ColorSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [availableColors, setAvailableColors] = useState<string[]>([])

  useEffect(() => {
    // 사용 가능한 컬러 API 연동
    getClientAvailableCategoryColors().then((res) => {
      if (res.success && res.data) {
        if (Array.isArray(res.data)) {
          setAvailableColors(res.data)
        } else if (res.data && typeof res.data === 'object' && 'colors' in res.data && Array.isArray((res.data as any).colors)) {
          setAvailableColors((res.data as any).colors)
        } else {
          setAvailableColors([])
        }
      } else {
        setAvailableColors([])
      }
    })
  }, [refreshTrigger])

  // 옵션 중 사용 가능한 컬러만 필터링
  const filteredOptions = options.filter(
    (opt) => (Array.isArray(availableColors) && availableColors.includes(opt.value)) || opt.value === selected
  )
  const availableOptions = filteredOptions.filter((opt) => opt.value !== selected && opt.value !== '')
  const selectedOption = filteredOptions.find((opt) => opt.value === selected)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (value: string) => {
    onChange(value)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'caption-md-medium flex h-[40px] w-[123px] items-center justify-between rounded-[8px] border bg-white px-3 py-2 transition-all',
          isOpen ? 'border-black text-black' : 'border-gray-300 text-black hover:border-gray-500'
        )}
      >
        <div className="flex items-center gap-2">
          {selectedOption?.icon}
          <span className={clsx(selected ? 'text-black' : 'text-gray-500')}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        {isOpen ? <UpIcon width={16} height={16} /> : <DownIcon width={16} height={16} />}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 rounded-[8px] bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.15)]">
          <div className="scrollbar-hide max-h-[230px] overflow-y-auto p-[6px]">
            {availableOptions.length > 0 ? (
              availableOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={clsx(
                    'caption-md-medium flex w-full items-center gap-2 rounded-[4px] px-[10px] py-[10px] text-left hover:bg-gray-100 focus:outline-none',
                    selected === option.value && 'bg-gray-200'
                  )}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))
            ) : (
              <div className="px-[10px] py-[10px] text-sm text-gray-500">사용 가능한 색상이 없습니다</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
