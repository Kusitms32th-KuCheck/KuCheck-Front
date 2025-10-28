'use client'

import React, { useState } from 'react'
import type { Member } from '@/types/manager/member/mockData'
import { ModalXIcon } from '@/assets/svgComponents/manager'

export default function MemberSelectModal({
  open,
  title = '',
  members = [],
  onClose,
  onSave,
}: {
  open: boolean
  title?: string
  members?: Member[]
  onClose?: () => void
  onSave?: (selected: Member[]) => void
}) {
  const [selectedIds, setSelectedIds] = useState<Record<number, boolean>>({})

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
      <section className="relative inline-flex h-[90vh] max-h-[752px] w-[90vw] max-w-[852px] flex-col rounded-[16px] bg-white px-6 py-5 shadow-lg">
        <div className="relative mb-4 flex items-center justify-between">
          <p className="body-2xl-medium">{title}</p>
          <button
            aria-label="닫기"
            onClick={() => onClose?.()}
            className="absolute right-0 text-gray-500 hover:text-gray-700"
          >
            <ModalXIcon width={20} height={20} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
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
              {members.map((m, i) => (
                <div
                  key={i}
                  className={`grid items-center border-b border-gray-100 ${i % 2 === 1 ? 'bg-background1' : ''}`}
                  style={{ gridTemplateColumns: '64px 160px 160px 350px' }}
                >
                  <div className="pl-5">
                    <input checked={!!selectedIds[i]} onChange={() => toggle(i)} type="checkbox" />
                  </div>
                  <p className="body-lg-regular truncate border-r border-gray-100 p-3 text-gray-800">{m.name}</p>
                  <p className="body-lg-regular truncate border-r border-gray-100 p-3 text-gray-800">{m.part}</p>
                  <p className="body-lg-regular truncate p-3 text-gray-800">{m.school}</p>
                </div>
              ))}
            </div>
          </div>
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
