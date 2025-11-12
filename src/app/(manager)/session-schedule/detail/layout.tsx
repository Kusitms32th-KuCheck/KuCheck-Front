import WriteHeader from '@/components/manager/session-schedule/add-post/WriteHeader'

export default function SessionDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WriteHeader />
      {children}
    </>
  )
}
