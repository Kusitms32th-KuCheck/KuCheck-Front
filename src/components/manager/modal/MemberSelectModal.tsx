'use client'

import React, { useState, useEffect } from 'react'
import type { Member } from '@/types/manager/member/mockData'
import { ModalXIcon } from '@/assets/svgComponents/manager'

const partMap: Record<string, string> = {
  BACKEND: '백엔드',
  FRONTEND: '프론트엔드',
  DESIGN: '디자인',
  PLANNING: '기획',
}

export default function MemberSelectModal({
  open,
  title = '',
  members = [],
  loading = false,
  onClose,
  onSave,
}: {
  open: boolean
  title?: string
  members?: Member[]
  loading?: boolean
  onClose?: () => void
  onSave?: (selected: Member[]) => void
}) {
  const [selectedIds, setSelectedIds] = useState<Record<number, boolean>>({})

  // members 데이터가 완전히 로드된 후 체크박스 상태 초기화
  useEffect(() => {
    if (!loading && members.length > 0) {
      const initial: Record<number, boolean> = {}
      members.forEach((m, i) => {
        if (m.role === 'manager' || m.role === '운영진' || !!m.checked) {
          initial[i] = true
        }
      })
      setSelectedIds(initial)
    }
  }, [members, loading])

  if (!open) return null

  const toggle = (idx: number) => {
    setSelectedIds((s) => ({ ...s, [idx]: !s[idx] }))
  }

  const handleSave = () => {
    const selected = members.filter((_, i) => selectedIds[i])
    onSave?.(selected)
    onClose?.()
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <section className="relative inline-flex h-[90vh] max-h-[752px] w-[90vw] max-w-[852px] flex-col rounded-[16px] bg-white px-6 pb-5 shadow-lg">
        <div className="relative flex items-center justify-between">
          <div className='py-6 flex flex-row items-center gap-[10px]'>
          <p className="heading-md-medium">{title}</p>
          <p className='body-sm-medium text-gray-600'>삭제하려면 선택을 해제한 후 저장해 주세요</p>
          </div>
          <button
            aria-label="닫기"
            onClick={() => onClose?.()}
            className="absolute right-0 text-gray-500 hover:text-gray-700"
          >
            <ModalXIcon width={32} height={32} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {loading ? (
            <div className="flex items-center justify-center flex-1">
              <span className="body-lg-medium text-gray-400">불러오는 중...</span>
            </div>
          ) : (
            <>
              <div
                className="grid items-center border-b border-gray-100 p-3"
                style={{ gridTemplateColumns: '64px 160px 160px 350px' }}
              >
                <div />
                <p className="body-sm-medium text-gray-500">이름</p>
                <p className="body-sm-medium text-gray-500">파트</p>
                <p className="body-sm-medium text-gray-500">학교</p>
              </div>

              <div className="overflow-auto">
                <div className="grid gap-0">
                  {members.length > 0 ? (
                    members.map((m, i) => (
                      <div
                        key={i}
                        className={`grid items-center border-b border-gray-100`}
                        style={{ gridTemplateColumns: '64px 160px 160px 350px' }}
                      >
                        <div className="pl-5">
                          <input checked={!!selectedIds[i]} onChange={() => toggle(i)} type="checkbox" />
                        </div>
                        <p className="body-lg-regular truncate border-r border-gray-100 p-3 text-gray-800">{m.name}</p>
                        <p className="body-lg-regular truncate border-r border-gray-100 p-3 text-gray-800">{partMap[m.part] || m.part}</p>
                        <p className="body-lg-regular truncate p-3 text-gray-800">{m.school}</p>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center py-10">
                      <span className="body-lg-medium text-gray-400">데이터가 없습니다.</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={handleSave} className="bg-primary-500 rounded-[8px] px-4 py-2 text-white">
            저장하기
          </button>
        </div>
      </section>
    </div>
  )
}
