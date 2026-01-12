"use client"

import { useState, useEffect } from 'react'
import { getClientApprovedStaffMembers, patchClientStaffBatch } from '@/lib/member/client/staff'
import MemberSelectModal from '@/components/manager/modal/MemberSelectModal'
import type { Member } from '@/types/manager/member/mockData'

interface StaffHeaderProps {
  isEditMode: boolean
  setIsEditMode: (isEditMode: boolean) => void
  onSaveRoles?: () => void
}

export default function StaffHeader({ isEditMode, setIsEditMode, onSaveRoles }: StaffHeaderProps) {
  const [editMode, setEditMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMembers, setModalMembers] = useState<Member[]>([])
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)
console.log(onSaveRoles)
  useEffect(() => {
    if (isModalOpen) {
      setModalLoading(true)
      getClientApprovedStaffMembers(1, 50)
        .then((res) => {
          if (res.success && res.data?.members?.data) {
            setModalMembers(
              res.data.members.data.map((m) => ({
                memberId: m.memberId, // memberId 추가
                name: m.name,
                photo: m.profileImageUrl ?? '',
                part: m.part,
                school: m.school,
                major: m.major,
                phone: m.phoneNumber,
                social: m.email,
                checked: ['STAFF', 'MANAGEMENT', 'EXECUTIVE'].includes(m.role),
              }))
            )
            setModalError(null)
          } else {
            setModalError(res.error || '데이터를 불러올 수 없습니다.')
          }
        })
        .catch((err) => {
          setModalError(err.message || 'API 호출 오류')
        })
        .finally(() => setModalLoading(false))
    }
  }, [isModalOpen])

  return (
    <div className="flex items-center justify-between pl-8 pr-6 pt-[31px]  bg-background2">
      <span className="heading-lg-medium">운영진 관리</span>
      <div className="flex gap-2">
        {!isEditMode ? (
          <>
            <button
              type="button"
              className="body-sm-medium rounded-[4px] border border-primary-100 bg-white px-3 py-2 text-primary-500 hover:bg-primary-50"
              onClick={() => setIsModalOpen(true)}
            >
              운영진 추가/삭제
            </button>
            {/* 운영진 추가/삭제 모달 */}
            {isModalOpen && (
              <MemberSelectModal
                open={isModalOpen}
                title="운영진 추가/삭제"
                members={modalMembers}
                loading={modalLoading}
                onClose={() => setIsModalOpen(false)}
                onSave={async (selected) => {
                  const selectedIds = modalMembers
                    .filter(m => selected.some(sel => sel.name === m.name && sel.phone === m.phone))
                    .map(m => (m as any).memberId)
                  if (selectedIds.length > 0) {
                    await patchClientStaffBatch(selectedIds)
                  }
                }}
              >
                {modalLoading && (
                  <div className="flex flex-col items-center justify-center py-10">
                    <span className="body-lg-medium text-gray-400">불러오는 중...</span>
                  </div>
                )}
              </MemberSelectModal>
            )}
            <button
              type="button"
              className="body-sm-medium rounded-[4px] bg-primary-500 px-3 py-2 text-white hover:bg-primary-600"
              onClick={() => setIsEditMode(true)}
            >
              권한 수정하기
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="body-sm-medium rounded-[4px] border border-primary-100 bg-white px-3 py-2 text-primary-500 hover:bg-primary-50"
              onClick={() => setIsEditMode(false)}
            >
              초기화
            </button>
            <button
              type="button"
              className="body-sm-medium rounded-[4px] bg-primary-500 px-3 py-2 text-white hover:bg-primary-600"
              onClick={() => {
                if (typeof onSaveRoles === 'function') {
                  onSaveRoles()
                }
              }}
            >
              저장하기
            </button>
          </>
        )}
      </div>
    </div>
  )
}
