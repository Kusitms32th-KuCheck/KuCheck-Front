import TeamTable from '@/components/manager/staff-management/TeamTable'
import { generateMockMembers } from '@/types/manager/member/mockData'

const members = generateMockMembers()

export default function StaffManagementPage() {
  return (
    <main className="flex h-full flex-col overflow-visible">
      <p className="heading-lg-medium px-6 pt-8">운영진 관리</p>
      <div className="px-6 pt-6">
        <TeamTable teamName="학부학" members={members.slice(0, 3)} />
        <TeamTable teamName="경영총괄팀" members={members.slice(0, 6)} />
        <TeamTable teamName="교육기획팀" members={members.slice(0, 3)} />
        <TeamTable teamName="대외홍보팀" members={[]} />
      </div>
    </main>
  )
}
