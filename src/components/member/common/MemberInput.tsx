import { ChangeEvent } from 'react'

const inputBoxStyles = {
  default: 'border-gray-200 placeholder:text-gray-400 focus-within:border-primary-400 text-black cursor-pointer',
  error: 'border-sub-red text-black cursor-pointer',
  disabled: 'border-primary-400 text-gray-400 cursor-not-allowed',
}

interface MemberInputProps {
  inputBoxStyle: 'default' | 'error' | 'disabled'
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
  textCount?: number
  totalCount?: number
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'tel' | 'date' | 'number' | 'time'
  customClassName?: string
  readonly?: boolean
}

const MemberInput = ({
  value,
  onChange,
  inputBoxStyle,
  textCount,
  totalCount,
  rightIcon,
  leftIcon,
  placeholder,
  type = 'text',
  customClassName,
  onClick,
}: MemberInputProps) => {
  const inputBoxBase =
    'border py-[14px] px-[12px] body-md-regular placeholder:text-gray-400 flex gap-x-2 rounded-[12px] items-center bg-white'
  const inputFieldBase = 'button desktop:body-md w-full outline-none bg-white'

  const inputBoxStyleClassName = inputBoxStyles[inputBoxStyle]

  return (
    <div className={`${inputBoxBase} ${inputBoxStyleClassName} ${customClassName}`}>
      {leftIcon ? leftIcon : null}
      <div className="flex w-full justify-between">
        <input
          onClick={onClick}
          value={value}
          onChange={onChange ?? (() => {})}
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
export default MemberInput
