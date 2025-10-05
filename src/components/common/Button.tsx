import { ReactNode } from 'react'

const buttonStyleType = {
  active: 'bg-main text-white',
  disabled: 'text-gray5 bg-gray2',
  outline: 'border border-gray2 text-gray5',
}
const buttonSize = {
  lg: 'py-4 px-6',
  sm: 'py-3 px-4',
}

interface ButtonProps {
  type: 'active' | 'disabled' | 'outline'
  size: 'lg' | 'sm'
  customClassName?: string
  children: ReactNode
  onClick: () => void
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  disabled?: boolean
  buttonType?: 'button' | 'submit'
}

const Button = ({
  children,
  type = 'active',
  size = 'lg',
  customClassName,
  onClick,
  leftIcon,
  rightIcon,
  disabled,
  buttonType = 'button',
}: ButtonProps) => {
  const base = 'flex items-center justify-center gap-x-1 rounded-[16px] button'
  const style = buttonStyleType[type]
  const styleSize = buttonSize[size]

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonType === 'button') {
      e.preventDefault() // form submit 방지
    }
    onClick()
  }

  return (
    <button
      type={buttonType}
      disabled={disabled}
      onClick={handleClick}
      className={`${base} ${style} ${styleSize} ${customClassName}`}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
export default Button
