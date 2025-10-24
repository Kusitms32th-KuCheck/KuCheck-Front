import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const buttonType: {
  primary: { default: string; disabled: string }
  secondary: { default: string; disabled: string }
  round: { default: string; disabled: string }
} = {
  primary: {
    default: 'bg-[#E2F2FF] text-primary-400',
    disabled: 'bg-gray-100 text-gray-300',
  },
  secondary: {
    default: 'bg-primary-50 text-primary-400',
    disabled: 'bg-gray-100 text-gray-300',
  },
  round: {
    default: 'px-2 h-[22px] rounded-[32px] bg-gray-100 text-gray-500',
    disabled: '',
  },
}

interface TagProps {
  type: 'primary' | 'secondary' | 'round'
  status: 'default' | 'disabled'
  children: ReactNode
  customClassName?: string
}

export default function MemberTag({ type = 'primary', status = 'default', children, customClassName }: TagProps) {
  const base = 'flex items-center justify-center px-1 py-[2px] rounded-[4px] caption-sm-semibold h-fit w-fit'
  const style = buttonType[type][status]

  return (
    <div className={twMerge(`${base} ${style}`, customClassName)}>
      <p>{children}</p>
    </div>
  )
}
