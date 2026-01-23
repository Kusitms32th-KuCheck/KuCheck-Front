import { ChangeEvent } from 'react'

const inputBoxStyles = {
  default: 'border-gray-300 cursor-pointer',
  error: 'border-sub-red border-[1px] cursor-pointer',
  disabled: '',
}

interface ManagerInputProps {
  inputBoxStyle?: 'default' | 'error' | 'disabled'
  size?: 'sm' | 'md' | 'lg'
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'tel' | 'date' | 'number' | 'time'
  customClassName?: string
  className?: string
  inputClassName?: string
  errorMessage?: string
  inputMode?: 'text' | 'email' | 'tel' | 'search' | 'url' | 'none' | 'numeric' | 'decimal'
  readonly?: boolean
  onFocus?: () => void
}

const ManagerInput = ({
  value,
  onChange,
  inputBoxStyle = 'default',
  rightIcon,
  leftIcon,
  placeholder,
  type = 'text',
  customClassName,
  className,
  inputClassName,
  errorMessage,
  inputMode,
  onClick,
  onFocus,
  size = 'sm',
}: ManagerInputProps) => {
  const inputBoxBase = 'border flex gap-x-2 rounded-[8px] items-center bg-white'
  const inputFieldBase = 'button desktop:body-md w-full outline-none bg-white placeholder:text-gray-400'

  const sizeClass = {
    sm: 'px-[20px] py-[14px] body-sm-medium',
    md: '',
    lg: '',
  }[size]

  const inputBoxStyleClassName = inputBoxStyles[inputBoxStyle ?? 'default']

  return (
    <div>
      <div className={`${inputBoxBase} ${sizeClass} ${inputBoxStyleClassName} ${customClassName} ${className}`}>
        {leftIcon ? leftIcon : null}
        <div className="flex w-full justify-between">
          <input
            onClick={onClick}
            value={value}
            onChange={onChange ?? (() => {})}
            type={type}
            disabled={inputBoxStyle === 'disabled'}
            onFocus={onFocus}
            inputMode={inputMode}
            className={`${inputFieldBase} ${inputBoxStyle === 'disabled' ? 'cursor-not-allowed' : ''} ${inputClassName ?? ''}`}
            placeholder={placeholder}
            style={{
              color: inputBoxStyle === 'disabled' ? '#9CA3AF' : 'inherit',
            }}
          />
        </div>
        {rightIcon ? rightIcon : null}
      </div>
      {errorMessage && <p className="caption-sm-medium text-sub-red mt-2">{errorMessage}</p>}
    </div>
  )
}
export default ManagerInput
