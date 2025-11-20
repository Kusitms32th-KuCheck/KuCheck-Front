'use client'

import type { Member } from '@/types/manager/member/mockData'
import { AppleIcon } from '@/assets/svgComponents/manager'
import Dropdown from '../../common/ManagerdropDown'
import { PointupIcon, PointdownIcon } from '@/assets/svgComponents/manager'
import { useState } from 'react'
import { patchClientStaffRolesBatch } from '@/lib/member/client/staff'

const ROLE_OPTIONS = [
  { label: '운영진', value: '운영진' },
  { label: '학부학', value: '학부학' },
  { label: '경영총괄팀', value: '경영총괄팀' },
]

export default function StaffTableRow({
  member,
  index,
  gridTemplate,
  isEditMode,
  onRoleChange
}: {
  member: Member
  index: number
  gridTemplate?: string
  isEditMode?: boolean
  onRoleChange?: (item: { memberId: number; role: 'STAFF' | 'MANAGEMENT' }) => void
}) {
  const baseBg = index % 2 === 0 ? 'bg-white' : 'bg-background1'
  const name = member.name
  const part = member.part
  const school = member.school
  const major = member.major
  const phone = member.phone

  // role 매핑
  const roleMap: Record<string, string> = {
    STAFF: '운영진',
    MANAGEMENT: '경영총괄팀',
    EXECUTIVE: '학부학',
    운영진: '운영진',
    경영총괄팀: '경영총괄팀',
    학부학: '학부학',
  }
  let initialRole = '운영진'
  if (member.role) {
    if (roleMap[member.role]) {
      initialRole = roleMap[member.role]
    } else if (Object.values(roleMap).includes(member.role)) {
      initialRole = member.role
    }
  }
  const [selectedRole, setSelectedRole] = useState(initialRole)

  // 드롭다운 변경 핸들러
  const handleRoleChange = (value: string) => {
    console.log('[handleRoleChange 호출] value:', value)
    setSelectedRole(value)
    let role: 'STAFF' | 'MANAGEMENT' | undefined
    if (value === '운영진') role = 'STAFF'
    else if (value === '경영총괄팀') role = 'MANAGEMENT'
    if (role && member.memberId && onRoleChange) {
      onRoleChange({ memberId: member.memberId, role })
    }
  }

  // 권한 드롭다운 스타일
  const triggerClassName =
    selectedRole === '경영총괄팀'
      ? 'body-lg-semibold text-primary-500'
      : 'text-gray-900 body-lg-medium'

  return (
    <>
      <div
        className={`group grid cursor-default items-center gap-0`}
        style={{ gridTemplateColumns: gridTemplate ?? '200px repeat(6,1fr)' }}
      >
        {/* 이름 */}
        <div
          className={`body-lg-medium flex h-[68px] items-center border-r border-gray-200 px-[24px] text-start text-gray-900 ${baseBg} focus-within:border-primary-500 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <span className="w-full truncate">{name}</span>
        </div>
        {/* 파트 */}
        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200 pl-3 text-gray-900 ${baseBg} group-hover:bg-gray-100`}
        >
          <span className="w-full truncate">{part}</span>
        </div>
        {/* 권한 - isEditMode에 따라 드롭다운 또는 텍스트 */}
        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200 ${baseBg} group-hover:bg-gray-100`}
        >
          {isEditMode ? (
            <Dropdown
              unstyled
              triggerClassName={triggerClassName}
              options={ROLE_OPTIONS}
              selected={selectedRole}
              placeholder={'운영진'}
              onChange={handleRoleChange}
              size="md"
              rightIcon={<PointdownIcon width={10} height={8} />}
              rightIconActive={<PointupIcon width={10} height={8} />}
            />
          ) : (
            <span className="w-full truncate">{selectedRole}</span>
          )}
        </div>
        {/* 학교 */}
        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 ${baseBg} focus-within:border-primary-500 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <span className="w-full truncate">{school}</span>
        </div>
        {/* 학과 */}
        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 ${baseBg} focus-within:border-primary-500 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <span className="w-full truncate">{major}</span>
        </div>
        {/* 전화번호 */}
        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 ${baseBg} focus-within:border-primary-500 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <span className="w-full truncate">{phone}</span>
        </div>
        {/* 로그인한 소셜 계정 */}
        <p
          className={`body-lg-medium flex h-[68px] items-center justify-start gap-2 px-6 text-gray-900 ${baseBg} group-hover:bg-gray-100`}
        >
          <AppleIcon width={20} height={20} />

          {member.social}
        </p>
      </div>
    </>
  )
}
