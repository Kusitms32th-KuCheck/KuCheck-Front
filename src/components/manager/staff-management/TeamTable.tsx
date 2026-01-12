'use client'

import StaffTableRow from './staff-row/StaffTableRow'
import type { Member } from '@/types/manager/member/mockData'
import { useEffect, useState } from 'react'
import { getClientApprovedStaffMembers } from '@/lib/member/client/staff'
import { patchClientStaffRolesBatch } from '@/lib/member/client/staff'

export default function TeamTable({ isEditMode, setHandleSaveRoles }: { isEditMode?: boolean, setHandleSaveRoles?: (fn: () => void) => void }) {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // 권한 변경 내역 관리
  const [staffRoleItems, setStaffRoleItems] = useState<{ memberId: number; role: 'STAFF' | 'MANAGEMENT' }[]>([])

  // 권한 변경 핸들러
  const handleRoleChange = (item: { memberId: number; role: 'STAFF' | 'MANAGEMENT' }) => {
    setStaffRoleItems(prev => {
      // 이미 있는 memberId면 최신 role로 덮어쓰기
      const filtered = prev.filter(i => i.memberId !== item.memberId)
      const next = [...filtered, item]
      console.log('[드롭다운 변경] staffRoleItems:', next)
      return next
    })
  }

  // 저장하기 핸들러를 props로 전달 (예시)
  const handleSaveRoles = async () => {
    if (staffRoleItems.length > 0) {
  console.log('보내는 payload:', JSON.stringify({ items: staffRoleItems }, null, 2))
      const res = await patchClientStaffRolesBatch(staffRoleItems)
      console.log('저장 결과:', res)
    }
  }

  // 상위에 저장 핸들러 등록
  useEffect(() => {
    if (setHandleSaveRoles) {
      setHandleSaveRoles(() => handleSaveRoles)
    }
  }, [setHandleSaveRoles, staffRoleItems])

  useEffect(() => {
    setLoading(true)
    getClientApprovedStaffMembers(1, 80, true)
      .then((res) => {
        if (res.success && res.data?.members?.data) {
          setMembers(
            res.data.members.data.map((m) => ({
              name: m.name,
              photo: m.profileImageUrl ?? '',
              part: m.part,
              school: m.school,
              major: m.major,
              phone: m.phoneNumber,
              social: m.email,
              role: m.role,
              memberId: m.memberId,
              checked: ['STAFF', 'MANAGEMENT', 'EXECUTIVE'].includes(m.role),
            }))
          )
          setError(null)
        } else {
          setError(res.error || '데이터를 불러올 수 없습니다.')
        }
      })
      .catch((err) => {
        setError(err.message || 'API 호출 오류')
      })
      .finally(() => setLoading(false))
  }, [])
  // isModalOpen과 setIsModalOpen을 StaffHeader로 이동
  // 7 columns: 이름, 파트, 권한, 학교, 학과, 전화번호, 로그인한 소셜 계정
  const gridTemplate = '133px 185px 168px 181px 594px 172px 400px'
  console.log('운영진 멤버들:', members)

  return (
    <section className="mb-6 mt-[3px] overflow-hidden rounded-[12px] bg-white">
   
      <div>
          <div className="scrollbar-hide overflow-x-auto">
            <div
              className="grid items-center border-b border-gray-100 p-[14px]"
              style={{ gridTemplateColumns: gridTemplate }}
            >
              <p className="body-lg-medium pl-[13px] text-start text-gray-500">이름</p>
              <p className="body-lg-medium text-start text-gray-500">파트</p>
              <p className="body-lg-medium text-start text-gray-500">권한</p>
              <p className="body-lg-medium text-start text-gray-500">학교</p>
              <p className="body-lg-medium text-start text-gray-500">학과</p>
              <p className="body-lg-medium text-start text-gray-500">전화번호</p>
              <p className="body-lg-medium text-start text-gray-500">로그인한 소셜 계정</p>
            </div>
            <div>
              {members.map((m, i) => (
                <StaffTableRow
                  key={i}
                  member={m}
                  index={i}
                  gridTemplate={gridTemplate}
                  isEditMode={isEditMode}
                  onRoleChange={handleRoleChange}
                />
              ))}
            </div>
          </div>

      </div>
    </section>
  )
}
