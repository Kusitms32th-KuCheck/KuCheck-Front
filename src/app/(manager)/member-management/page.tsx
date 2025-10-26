import MemberHeader from '@/components/manager/member/MemberHeader'
import MemberTable from '@/components/manager/member/MemberTable'

export default function MemberManagementPage() {
  return (
    <main className="flex h-full flex-col overflow-visible">
      <MemberHeader />
      <MemberTable />
    </main>
  )
}
