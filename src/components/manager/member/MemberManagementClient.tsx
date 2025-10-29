'use client'

import MemberHeader from '@/components/manager/member/MemberHeader'
import MemberTable from '@/components/manager/member/MemberTable'
import ApprovalList from '@/components/manager/member/ApprovalListNew'
import { useMemberStore } from '@/store/manager/useMemberStore'

export default function MemberManagementClient() {
  const { isApprovalView } = useMemberStore()

  return (
    <>
      <MemberHeader />
      {isApprovalView ? <ApprovalList /> : <MemberTable />}
    </>
  )
}
