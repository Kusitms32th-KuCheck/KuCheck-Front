export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center">
      <div className="desktop:w-[375px] bg-primary-500 min-h-screen w-full">{children}</div>
    </main>
  )
}
