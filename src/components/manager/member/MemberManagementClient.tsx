'use client'
import MemberHeader from '@/components/manager/member/MemberHeader'
import MemberTable from '@/components/manager/member/MemberTable'
import ApprovalList from '@/components/manager/member/ApprovalListNew'
import { useMemberStore } from '@/store/manager/useMemberStore'
import { useState, useEffect } from 'react'
import { getClientApprovedStaffMembers, getClientStaffApprovalRequests } from '@/lib/member/client/staff'
import { MemberApprovalRequestListResponse, MemberListResult } from '@/types/manager/member/types'

export default function MemberManagementClient() {
  const [approvedStaff, setApprovedStaff] = useState<MemberListResult>()
  const [approvalRequests, setApprovalRequests] = useState<MemberApprovalRequestListResponse>()
  const { isApprovalView } = useMemberStore()
  useEffect(() => {
    const fetchData = async () => {
      const approvalRes = await getClientStaffApprovalRequests(1, 80)
      setApprovalRequests(approvalRes.data)
      const approvedRes = await getClientApprovedStaffMembers(1, 80)
      setApprovedStaff(approvedRes.data)
    }
    fetchData()
  }, [])

  return (
    <>
      {MemberHeader(approvalRequests?.pendingCount ?? 0)}
      {isApprovalView ? <ApprovalList data={approvalRequests} /> : <MemberTable data={approvedStaff} />}
    </>
  )
}