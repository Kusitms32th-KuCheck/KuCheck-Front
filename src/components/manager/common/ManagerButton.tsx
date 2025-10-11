import { ReactNode } from 'react'

const variantStyles = {
  primary: {
    default: 'bg-primary-500 text-white hover:bg-primary-700 cursor-pointer',
    disabled: 'bg-gray-100 text-gray-500 cursor-not-allowed',
  },
  gray: {
    default: '',
    disabled: '',
  },
}
const sizeStyles = {
  lg: '',
  md: 'body-2xl-semibold h-[52px] rounded-[12px]',
  sm: 'body-sm-medium h-[36px] rounded-[4px]',
}

export interface ManagerButtonProps {
  children: ReactNode
  onClick: () => void
  styleType?: 'primary' | 'gray'
  styleStatus?: 'default' | 'disabled'
  styleSize?: 'lg' | 'md' | 'sm'
  customClassName?: string
  buttonType?: 'button' | 'submit'
  disabled?: boolean
  rightIcon?: ReactNode
  leftIcon?: ReactNode
}

const ManagerButton = ({
  styleType = 'primary',
  styleStatus = 'default',
  styleSize = 'lg',
  children,
  customClassName,
  onClick,
  buttonType = 'button',
  disabled = false,
  rightIcon,
  leftIcon,
}: ManagerButtonProps) => {
  const base = 'flex items-center justify-center w-full gap-x-2'
  const variantClass = variantStyles[styleType][styleStatus]
  const sizeClass = sizeStyles[styleSize]
  const className = [base, variantClass, sizeClass].join(' ')

  return (
    <button disabled={disabled} type={buttonType} onClick={onClick} className={`${className} ${customClassName}`}>
      {leftIcon ? leftIcon : null}
      {children}
      {rightIcon ? rightIcon : null}
    </button>
  )
}

export default ManagerButton
