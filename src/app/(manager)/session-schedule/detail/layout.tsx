import WriteHeader from '@/components/manager/common/WriteHeader'

export default function SessionDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WriteHeader />
      {children}
    </>
  )
}
