import { ChangeEvent } from 'react'

const inputBoxStyles = {
  default: 'border-gray2 placeholder:text-gray4 text-black',
  error: 'border-error text-black',
  disabled: 'border-gray2 text-gray4 cursor-not-allowed',
}

interface InputProps {
  value: string | number
  setValue?: (e: ChangeEvent<HTMLInputElement>) => void
  inputBoxStyle: 'default' | 'error' | 'disabled'
  textCount?: number
  totalCount?: number
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'tel' | 'date' | 'number'
  customClassName?: string
  onKeyPress?: (e: React.KeyboardEvent) => void
  onClick?: () => void
}

const Input = ({
  value,
  setValue,
  inputBoxStyle,
  textCount,
  totalCount,
  rightIcon,
  leftIcon,
  placeholder,
  type = 'text',
  customClassName,
  onClick,
}: InputProps) => {
  const inputBoxBase = 'border flex gap-x-2 desktop:p-4 px-4 py-3 rounded-[16px] items-center bg-white'
  const inputFieldBase = 'button desktop:body-md w-full outline-none bg-white'

  const inputBoxStyleClassName = inputBoxStyles[inputBoxStyle]

  return (
    <div className={`${inputBoxBase} ${inputBoxStyleClassName} ${customClassName}`}>
      {leftIcon ? leftIcon : null}
      <div className="flex w-full justify-between">
        <input
          onClick={onClick}
          value={value}
          onChange={setValue ?? (() => {})}
          type={type}
          disabled={inputBoxStyle === 'disabled'}
          className={`${inputFieldBase} ${inputBoxStyle === 'disabled' ? 'cursor-not-allowed' : ''}`}
          placeholder={placeholder}
        />
        {textCount && totalCount && (
          <div className="body2 text-gray-50">
            {textCount}/{totalCount}
          </div>
        )}
      </div>
      {rightIcon ? rightIcon : null}
    </div>
  )
}
export default Input
