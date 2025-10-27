'use client'

import StaffTableRow from './staff-row/StaffTableRow'
import type { Member } from '@/types/manager/member/mockData'
import { PlusIcon } from '@/assets/svgComponents/manager'
import { generateMockMembers } from '@/types/manager/member/mockData'
import MemberSelectModal from '@/components/manager/modal/MemberSelectModal'
import { useState } from 'react'

export default function TeamTable({ teamName, members: initialMembers }: { teamName: string; members: Member[] }) {
  const [members, setMembers] = useState<Member[]>(initialMembers ?? [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const gridTemplate = '133px 143px 181px 594px 172px 400px'

  return (
    <section className="mb-6 overflow-hidden rounded-[12px] bg-white">
      <div className="flex items-center gap-3 px-6 pt-6 pb-5">
        <p className="heading-lg-medium">{teamName}</p>
        <button className="text-primary-500" onClick={() => setIsModalOpen(true)}>
          <PlusIcon width={24} height={24} />
        </button>
      </div>

      <div>
        {members && members.length > 0 ? (
          <div className="scrollbar-hide overflow-x-auto">
            <div
              className="grid items-center border-b border-gray-100 p-[14px]"
              style={{ gridTemplateColumns: gridTemplate }}
            >
              <p className="body-lg-medium pl-[13px] text-start text-gray-500">이름</p>
              <p className="body-lg-medium text-start text-gray-500">파트</p>
              <p className="body-lg-medium text-start text-gray-500">학교</p>
              <p className="body-lg-medium text-start text-gray-500">학과</p>
              <p className="body-lg-medium text-start text-gray-500">전화번호</p>
              <p className="body-lg-medium text-start text-gray-500">로그인한 소셜 계정</p>
            </div>

            <div>
              {members.map((m, i) => (
                <StaffTableRow key={i} member={m} index={i} gridTemplate={gridTemplate} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-[120px] items-center justify-center text-gray-400">
            <span className="body-lg-medium">+를 눌러 운영진을 등록해주세요</span>
          </div>
        )}
      </div>
      <MemberSelectModal
        open={isModalOpen}
        title={teamName}
        members={generateMockMembers()}
        onClose={() => setIsModalOpen(false)}
        onSave={(selected) => {
          if (selected && selected.length > 0) setMembers((s) => [...s, ...selected])
        }}
      />
    </section>
  )
}
