import { ReactNode } from 'react'

export default function MemberModal({ children, customClassName }: { children: ReactNode; customClassName?: string }) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <section
        className={`${customClassName} desktop:w-[335px] mx-5 flex w-full flex-col gap-y-[31px] rounded-[20px] bg-white px-[14px] pt-[32px] pb-[13px]`}
      >
        {children}
      </section>
    </div>
  )
}

function Content({ children }: { children: ReactNode }) {
  return <>{children}</>
}

function BottomButton({ children }: { children: ReactNode }) {
  return <>{children}</>
}

MemberModal.BottomButton = BottomButton
MemberModal.Content = Content
