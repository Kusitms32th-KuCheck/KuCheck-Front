import { ReactNode } from 'react'

const variantStyles = {
  primary: {
    default: 'bg-primary-500 text-white cursor-pointer',
    disabled: 'bg-gray-100 text-gray-500 cursor-not-allowed',
  },
  gray: {
    default: 'bg-background2 text-black',
    disabled: '',
  },
  white: {
    default: 'bg-white text-black',
    disabled: '',
  },
}
const sizeStyles = {
  lg: '',
  md: 'body-2xl-semibold h-[52px] rounded-[12px] ',
  sm: 'body-sm-medium h-[36px] rounded-[4px] min-w-[73px]',
}

export interface ManagerButtonProps {
  children: ReactNode
  onClick: () => void
  styleType?: 'primary' | 'gray' | 'white'
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
  // disabled 상태일 때 styleStatus를 강제로 'disabled'로 설정
  const actualStyleStatus = disabled ? 'disabled' : styleStatus

  const base = 'flex items-center justify-center gap-x-2 py-[12px] px-[15.5px]'
  const hoverClass = disabled ? '' : 'hover:bg-primary-700'
  const variantClass = variantStyles[styleType][actualStyleStatus]
  const sizeClass = sizeStyles[styleSize]
  const className = [base, hoverClass, variantClass, sizeClass].join(' ')

  const handleClick = () => {
    if (!disabled) {
      onClick()
    }
  }

  return (
    <button disabled={disabled} type={buttonType} onClick={handleClick} className={`${className} ${customClassName}`}>
      {leftIcon ? leftIcon : null}
      {children}
      {rightIcon ? rightIcon : null}
    </button>
  )
}

export default ManagerButton
