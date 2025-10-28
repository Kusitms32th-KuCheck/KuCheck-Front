'use client'

import { useState } from 'react'
import { generateMockMembers } from '@/types/manager/member/mockData'
import useScrollSync from '@/utils/manager/useScrollSync'
import Dropdown from '../common/ManagerdropDown'
import { DownIcon, UpIcon } from '@/assets/svgComponents/manager'

export default function ApprovalListNew() {
  const members = generateMockMembers().slice(0, 10)

  const gridTemplate = '130px 130px 185px 419px 170px 404px 170px'
  const { containerRef, headerScrollRef, isScrolled } = useScrollSync()

  const [selections, setSelections] = useState<Record<number, string>>({})

  const APPROVAL_OPTIONS = [
    { label: '선택', value: '' },
    { label: '승인', value: 'approve' },
    { label: '거절', value: 'reject' },
  ]

  return (
    <div className="mx-6 mt-7 mb-6 flex min-h-0 flex-1 flex-col">
      <div
        className={`rounded-t-[12px] border-b border-gray-100 bg-white ${isScrolled ? 'z-1000 shadow-[0_6px_20px_rgba(0,0,0,0.13)]' : ''}`}
      >
        <div ref={headerScrollRef} className="scrollbar-hide overflow-x-auto">
          <div className="grid items-center py-[14px]" style={{ gridTemplateColumns: gridTemplate }}>
            <p className="body-lg-medium pl-[30px] text-start text-gray-500">이름</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">파트</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">학교</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">학과</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">전화번호</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">로그인한 소셜 계정</p>
            <p className="body-lg-medium px-[13px] text-start text-gray-500">승인 여부</p>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="scrollbar-custom h-full overflow-auto rounded-b-[12px] bg-white">
        <div>
          {members.map((m, i) => (
            <div
              key={i}
              className={`even:bg-background1 grid cursor-default items-center gap-0 border-b border-gray-100 bg-white`}
              style={{ gridTemplateColumns: gridTemplate }}
            >
              <div className="body-lg-medium flex h-[68px] items-center px-[24px] text-start text-gray-900">
                <span className="truncate">{m.name}</span>
              </div>

              <div className="flex h-[68px] items-center px-[13px]">{m.part}</div>

              <div className="body-lg-medium flex h-[68px] items-center justify-start pl-3 text-gray-900">
                <span className="truncate">{m.school}</span>
              </div>

              <div className="body-lg-medium flex h-[68px] items-center justify-start px-[13px] text-gray-900">
                <span className="truncate">{m.major}</span>
              </div>

              <div className="body-lg-medium flex h-[68px] items-center justify-start px-[13px] text-gray-900">
                {m.phone}
              </div>

              <div className="body-lg-medium flex h-[68px] items-center justify-start px-[13px] text-gray-900">
                <span className="truncate">{m.social}</span>
              </div>

              <div className="body-lg-medium flex h-[68px] items-center justify-center px-[13px] text-gray-900">
                <Dropdown
                  options={APPROVAL_OPTIONS}
                  selected={selections[i] ?? ''}
                  onChange={(v) => setSelections((s) => ({ ...s, [i]: v }))}
                  rightIcon={<DownIcon width={24} height={24} />}
                  rightIconActive={<UpIcon width={24} height={24} />}
                  showValueInsteadOfLabel={false}
                  placeholder="선택"
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
