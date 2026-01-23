'use client'

interface CheckboxCellProps {
  isEditMode: boolean
  checked: boolean
  onChange?: (checked: boolean) => void
  display?: string | number | null
  className?: string
}

export default function CheckboxCell({ isEditMode, checked, onChange, display, className = '' }: CheckboxCellProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked)
    }
  }

  return (
    <div className={className}>
      {isEditMode ? (
        <div className="flex w-full items-center justify-end">
          <input type="checkbox" className="h-4 w-4" checked={checked} onChange={handleChange} />
        </div>
      ) : (
        <p>{display}</p>
      )}
    </div>
  )
}
