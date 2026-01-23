import { ReactNode } from 'react'

const variantStyles = {
  primary: {
    default: 'bg-primary-500 text-white focus:bg-primary-700 cursor-pointer',
    disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',
  },
  gray: {
    default: 'bg-gray-700 focus:bg-gray-800 cursor-pointer text-white',
    disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',
  },
}
const sizeStyles = {
  lg: 'body-lg-semibold h-[48px] rounded-[14px]',
  sm: 'body-sm-medium h-[44px] rounded-[12px]',
}

export interface MemberButtonProps {
  onClick?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: ReactNode
  styleType?: 'primary' | 'gray'
  styleStatus?: 'default' | 'disabled'
  styleSize?: 'lg' | 'sm'
  customClassName?: string
  buttonType?: 'button' | 'submit'
  disabled?: boolean
  rightIcon?: ReactNode
  leftIcon?: ReactNode
}

const MemberButton = ({
  styleType = 'primary',
  styleStatus = 'default',
  styleSize = 'lg',
  children,
  customClassName,
  onClick,
  onChange,
  buttonType = 'button',
  disabled = false,
  rightIcon,
  leftIcon,
}: MemberButtonProps) => {
  const base = 'flex items-center justify-center w-full gap-x-2'
  const variantClass = variantStyles[styleType][styleStatus]
  const sizeClass = sizeStyles[styleSize]
  const className = [base, variantClass, sizeClass].join(' ')

  return (
    <button
      disabled={disabled}
      type={buttonType}
      onClick={onClick}
      onChange={() => onChange}
      className={`${className} ${customClassName}`}
    >
      {leftIcon ? leftIcon : null}
      {children}
      {rightIcon ? rightIcon : null}
    </button>
  )
}

export default MemberButton
