import { ReactNode } from 'react'

export default function Modal({ children, customClassName }: { children: ReactNode; customClassName?: string }) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <section className={`${customClassName} gap-y-s p-l flex w-[600px] flex-col rounded-[32px] bg-white`}>
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

Modal.BottomButton = BottomButton
Modal.Content = Content
