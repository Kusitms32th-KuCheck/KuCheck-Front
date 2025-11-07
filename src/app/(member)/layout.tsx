export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="desktop:flex desktop:flex-col desktop:items-center desktop:justify-center flex w-full flex-col">
      {children}
    </div>
  )
}
