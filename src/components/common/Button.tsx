import { ReactNode } from 'react'

const buttonType = {
  primary: {
    default: 'bg-[#E2F2FF] text-primary-400',
    disabled: '',
  },
  secondary: {
    default: 'bg-primary-50 text-primary-400',
    disabled: 'bg-gray-100 text-gray-300',
  },
}

interface ButtonProps {
  type: 'primary' | 'secondary'
  status: 'default' | 'disabled'
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
  type = 'primary',
  customClassName,
  onClick,
  leftIcon,
  rightIcon,
  disabled,
  buttonType = 'button',
}: ButtonProps) => {
  const base = 'flex items-center justify-center px-1 py-[2px] rounded-[4px] caption'
  const style = buttonType[type]

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
      className={`${base} ${style} ${customClassName}`}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
export default Button
