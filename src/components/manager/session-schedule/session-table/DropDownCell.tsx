'use client'

import Dropdown from '../../common/ManagerdropDown'
import { PointupIcon, PointdownIcon } from '@/assets/svgComponents/manager'

interface Option {
  label: string
  value: string
}

interface DropDownCellProps {
  isEditMode: boolean
  value: string
  isModified?: boolean
  onChange?: (value: string) => void
  className?: string
  options?: Option[]
}

const DEFAULT_SESSION_OPTIONS: Option[] = [
  { label: '선택', value: '선택' },
  { label: '네트워킹', value: '네트워킹' },
  { label: '기업프로젝트', value: '기업프로젝트' },
  { label: '밋업프로젝트', value: '밋업프로젝트' },
  { label: '휴회', value: '휴회' },
]

export default function DropDownCell({
  isEditMode,
  value,
  isModified = false,
  onChange,
  className = '',
  options = DEFAULT_SESSION_OPTIONS,
}: DropDownCellProps) {
  return (
    <div className={className}>
      {isEditMode ? (
        <div className={`flex w-[193px] items-center justify-center`}>
          <Dropdown
            unstyled
            triggerClassName={
              !value || value === '선택'
                ? 'text-gray-600 body-lg-medium'
                : isModified
                  ? 'body-lg-semibold text-primary-500'
                  : 'text-gray-900 body-lg-medium'
            }
            options={options}
            selected={value}
            placeholder={'선택'}
            onChange={(v) => onChange && onChange(v)}
            size="md"
            rightIcon={<PointdownIcon width={10} height={8} />}
            rightIconActive={<PointupIcon width={10} height={8} />}
          />
        </div>
      ) : (
        <p
          className={`body-lg-medium flex h-[52px] w-full items-center justify-end text-gray-600 ${
            value && value !== '선택' ? '' : 'text-gray-600'
          }`}
        >
          {value || '선택'}
        </p>
      )}
    </div>
  )
}
