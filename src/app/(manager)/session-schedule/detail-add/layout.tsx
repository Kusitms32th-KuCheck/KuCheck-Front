import WriteHeader from '@/components/manager/common/WriteHeader'

export default function SessionDetailAddLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WriteHeader />
      {children}
    </>
  )
}
