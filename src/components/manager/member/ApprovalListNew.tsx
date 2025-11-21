'use client'
import RoleTag from '@/components/manager/common/RoleTag'
  const partMap: Record<string, string> = {
    BACKEND: '백엔드',
    FRONTEND: '프론트엔드',
    DESIGN: '디자인',
    PLANNING: '기획',
  }

import { AppleIcon ,KakaoIcon} from '@/assets/svgComponents/manager'
import { useState, useEffect } from 'react'
import useScrollSync from '@/utils/manager/useScrollSync'
import Dropdown from '../common/ManagerdropDown'
import { DownIcon, UpIcon } from '@/assets/svgComponents/manager'
import { MemberApprovalRequestListResponse, MemberApprovalRequestResponse } from '@/types/manager/member/types'
import ImageModal from '@/components/manager/modal/imageModal'
import { useMemberApprovalStore } from '@/store/manager/useMemberApprovalStore'
import { ManageImage } from '@/assets/svgComponents/manager'

export default function ApprovalListNew({ data }: { data?: MemberApprovalRequestListResponse }) {
  const [members] = useState<MemberApprovalRequestResponse[]>(data?.members.data || [])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  // 사진 컬럼 추가로 gridTemplate도 컬럼 개수에 맞게 수정해야 함
  const gridTemplate = '132px  171px 163px 185px 419px 170px 404px 170px'
  const { containerRef, headerScrollRef, isScrolled } = useScrollSync()
  const { selections, setSelection, setApprovalMembers } = useMemberApprovalStore()

  const APPROVAL_OPTIONS = [
    { label: '선택', value: '' },
    { label: '승인', value: 'APPROVED' },
    { label: '거절', value: 'REJECTED' },
  ]

  // 승인요청 멤버 배열을 store에 저장
  useEffect(() => {
    setApprovalMembers(members)
  }, [members, setApprovalMembers])

  return (
    <>
      <div className="mx-6 mt-7 mb-6 flex min-h-0 flex-1 flex-col">
        <div
          className={`rounded-t-[12px] border-b border-gray-100 bg-white ${isScrolled ? 'z-10 shadow-[0_6px_20px_rgba(0,0,0,0.13)]' : ''}`}
        >
          <div ref={headerScrollRef} className="scrollbar-hide overflow-x-auto">
            <div className="grid items-center py-[14px]" style={{ gridTemplateColumns: gridTemplate }}>
              <p className="body-lg-medium pl-[30px] text-start text-gray-500">이름</p>
              <p className="body-lg-medium px-[13px] text-start text-gray-500">사진</p>
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
                className={`grid cursor-default items-center gap-0 border-b border-gray-100 bg-white`}
                style={{ gridTemplateColumns: gridTemplate }}
              >
                <div className={`body-lg-medium flex h-[68px] items-center px-[24px] text-start text-gray-900 ${i % 2 === 1 ? 'bg-background1' : ''}`}>
                  <span className="truncate">{m.name}</span>
                </div>
                <div className={`flex h-[68px] items-center px-[20px] group-hover:bg-gray-100 ${i % 2 === 1 ? 'bg-background1' : ''}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setModalIndex(i)
                      setModalOpen(true)
                    }}
                    className="bg-gray-100 body-lg-regular flex h-[40px] max-w-[119px] items-center justify-center rounded-[4px] border border-gray-200 px-4 text-center text-gray-800 hover:bg-gray-100 gap-2"
                  >
                    <ManageImage 
                      width={20} 
                      height={20} 
                      className="flex-shrink-0"   
                    />

                    {m.profileImageUrl ? (
                      <span className="truncate flex-shrink text-gray-500">
                        {m.profileImageUrl.split('/').pop()}
                      </span>
                    ) : (
                      <span className="text-gray-400">사진 없음</span>
                    )}
                  </button>

                </div>
                <div className={`flex h-[68px] items-center px-[13px] ${i % 2 === 1 ? 'bg-background1' : ''}`}>
                  <RoleTag label={partMap[m.part] || m.part} />
                </div>
                <div className={`body-lg-medium flex h-[68px] items-center justify-start pl-3 text-gray-900 ${i % 2 === 1 ? 'bg-background1' : ''}`}>
                  <span className="truncate">{m.school}</span>
                </div>
                <div className={`body-lg-medium flex h-[68px] items-center justify-start px-[13px] text-gray-900 ${i % 2 === 1 ? 'bg-background1' : ''}`}>
                  <span className="truncate">{m.major}</span>
                </div>
                <div className={`body-lg-medium flex h-[68px] items-center justify-start px-[13px] text-gray-900 ${i % 2 === 1 ? 'bg-background1' : ''}`}>
                  {m.phoneNumber}
                </div>
                <div className={`body-lg-medium flex h-[68px] items-center justify-start px-[13px] text-gray-900 ${i % 2 === 1 ? 'bg-background1' : ''}`}>
                  {m.socialType=== 'APPLE' ? <AppleIcon width={20} height={20} /> : <KakaoIcon width={20} height={20} />}
                  <span className="ml-2 truncate">{m.email}</span>
                </div>
                <div className={`body-lg-medium flex h-[68px] items-center justify-center px-[13px] text-gray-900 ${i % 2 === 1 ? 'bg-background1' : ''}`}>
                  <Dropdown
                    options={APPROVAL_OPTIONS}
                    selected={
                      selections[i] !== undefined
                        ? selections[i]
                        : m.approval === 'APPROVED' ? 'APPROVED'
                        : m.approval === 'REJECTED' ? 'REJECTED'
                        : ''
                    }
                    onChange={(v) => setSelection(i, v as 'APPROVED' | 'REJECTED' | '')}
                    rightIcon={<DownIcon width={24} height={24} />}
                    rightIconActive={<UpIcon width={24} height={24} />}
                    showValueInsteadOfLabel={false}
                    placeholder={
                      m.approval === 'APPROVED' ? '승인'
                        : m.approval === 'REJECTED' ? '반려'
                        : '선택'
                    }
                    size="sm"
                    textColor={
                      !selections[i] || selections[i] === ''
                        ? 'text-gray-00'
                        : 'text-blue-500'
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {modalOpen && (
          <ImageModal
            title={'사진'}
            images={
              members[modalIndex]?.profileImageUrl
                ? [members[modalIndex].profileImageUrl]
                : []
            }
            footerText={members[modalIndex]?.name}
            initialIndex={0}
            onClose={() => setModalOpen(false)}
            customClassName="px-[60px] gap-[60px]"
          />
        )}
      </div>
    </>
  )
}