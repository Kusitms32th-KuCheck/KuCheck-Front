'use client'

interface EditableTextCellProps {
  isEditMode: boolean
  value: string
  isModified?: boolean
  onChange?: (v: string) => void
  className?: string
}

export default function EditableTextCell({
  isEditMode,
  value,
  isModified = false,
  onChange,
  className = '',
}: EditableTextCellProps) {
  return (
    <div className={className}>
      {isEditMode ? (
        <input
          className={`w-full rounded-[6px] border-none py-2 text-left ${isModified ? 'text-primary-500' : 'text-gray-900'} focus:outline-none`}
          defaultValue={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      ) : (
        <p className={isModified ? 'text-primary-500' : ''}>{value}</p>
      )}
    </div>
  )
}
