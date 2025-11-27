import MobileDebugPanel from '@/components/common/MobileDebugPanel'

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        paddingBottom: 'var(--safe-area-inset-bottom)',
        paddingTop: 'var(--safe-area-inset-top)',
        paddingLeft: 'var(--safe-area-inset-left)',
        paddingRight: 'var(--safe-area-inset-right)',
      }}
      className="desktop:flex desktop:flex-col desktop:items-center desktop:justify-center flex w-full flex-col"
    >
      <MobileDebugPanel />
      {children}
    </div>
  )
}
