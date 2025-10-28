'use client'

import { useEffect, useState } from 'react'
import ImageModal from '../../modal/imageModal'
import EditableTextCell from './EditableTextCell'
import SessionCell from './SessionCell'
import type { Member } from '@/types/manager/member/mockData'
import { AppleIcon } from '@/assets/svgComponents/manager'
import { useMemberTableStore } from '@/store/manager/useMemberTableStore'

export default function MemberTableRow({
  member,
  index,
  isEditMode = false,
  gridTemplate,
  revertToken,
  editedValues,
  onEdit,
}: {
  member: Member
  index: number
  isEditMode?: boolean
  gridTemplate?: string
  revertToken?: number
  editedValues?: Partial<Member>
  onEdit?: (patch: Partial<Member>) => void
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const [name, setName] = useState(editedValues?.name ?? member.name)
  const [part, setPart] = useState(editedValues?.part ?? member.part)
  const [school, setSchool] = useState(editedValues?.school ?? member.school)
  const [major, setMajor] = useState(editedValues?.major ?? member.major)
  const [phone, setPhone] = useState(editedValues?.phone ?? member.phone)
  const isNameModified = name !== member.name
  const isPartModified = part !== member.part
  const isSchoolModified = school !== member.school
  const isMajorModified = major !== member.major
  const isPhoneModified = phone !== member.phone

  const toImageUrl = (val: string | undefined, seed = 1) => {
    if (!val) return `/png/mock-image-${seed}.png`
    if (val.startsWith('http')) return val
    if (val.startsWith('/')) return val
    return `/png/mock-image-${seed}.png`
  }

  useEffect(() => {
    setName(editedValues?.name ?? member.name)
    setPart(editedValues?.part ?? member.part)
    setSchool(editedValues?.school ?? member.school)
    setMajor(editedValues?.major ?? member.major)
    setPhone(editedValues?.phone ?? member.phone)
  }, [member, editedValues])

  useEffect(() => {
    setName(member.name)
    setPart(member.part)
    setSchool(member.school)
    setMajor(member.major)
    setPhone(member.phone)
  }, [revertToken, member])

  return (
    <>
      <div
        className={`group even:bg-background1 grid cursor-default items-center gap-0`}
        style={{ gridTemplateColumns: gridTemplate ?? '200px repeat(3,1fr) 200px 220px' }}
      >
        <div
          className={`body-lg-medium focus-within:border-primary-500 flex h-[68px] items-center border-r border-gray-200 px-[24px] text-start text-gray-900 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <EditableTextCell
            isEditMode={isEditMode}
            value={name}
            isModified={isNameModified}
            onChange={(v) => {
              setName(v)
              if (onEdit) onEdit({ name: v })
            }}
            className="w-full"
          />
        </div>

        <div className={`flex h-[68px] items-center border-r border-gray-200 px-[24px] group-hover:bg-gray-100`}>
          <button
            type="button"
            onClick={() => {
              setModalIndex(0)
              setModalOpen(true)
            }}
            className="bg-background1 body-lg-regular flex h-[40px] min-w-[120px] items-center justify-center rounded-[8px] border border-gray-200 px-4 text-center text-gray-800 hover:bg-gray-100"
          >
            {member.photo ? (
              <span className="truncate">{member.photo.split('/').pop()}</span>
            ) : (
              <span className="text-gray-400">사진 없음</span>
            )}
          </button>
        </div>

        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200 pl-3 text-gray-900 group-hover:bg-gray-100`}
        >
          <SessionCell
            isEditMode={isEditMode}
            value={part}
            isModified={isPartModified}
            onChange={(v) => {
              setPart(v)
              if (onEdit) onEdit({ part: v })
            }}
            className="w-full"
          />
        </div>

        <div
          className={`body-lg-medium focus-within:border-primary-500 flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <EditableTextCell
            isEditMode={isEditMode}
            value={school}
            isModified={isSchoolModified}
            onChange={(v) => {
              setSchool(v)
              if (onEdit) onEdit({ school: v })
            }}
            className="w-full"
          />
        </div>

        <div
          className={`body-lg-medium focus-within:border-primary-500 flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <EditableTextCell
            isEditMode={isEditMode}
            value={major}
            isModified={isMajorModified}
            onChange={(v) => {
              setMajor(v)
              if (onEdit) onEdit({ major: v })
            }}
            className="w-full"
          />
        </div>

        <div
          className={`body-lg-medium focus-within:border-primary-500 flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 group-hover:bg-gray-100 focus-within:border-2`}
        >
          <EditableTextCell
            isEditMode={isEditMode}
            value={phone}
            isModified={isPhoneModified}
            onChange={(v) => {
              setPhone(v)
              if (onEdit) onEdit({ phone: v })
            }}
            className="w-full"
          />
        </div>

        <p
          className={`body-lg-medium flex h-[68px] items-center justify-between gap-2 px-6 text-gray-900 group-hover:bg-gray-100`}
        >
          <div className="flex items-center gap-2">
            <AppleIcon width={20} height={20} />
            <span className="truncate">{member.social}</span>
          </div>
          {isEditMode && (
            <button
              type="button"
              onClick={() => {
                const { setPendingDeleteIndex, setIsDeleteModalOpen } = useMemberTableStore.getState()
                setPendingDeleteIndex(index)
                setIsDeleteModalOpen(true)
              }}
              className="text-primary-500 body-sm-semibold bg-primary-50 w-[73px] rounded-[4px] py-2"
            >
              삭제
            </button>
          )}
        </p>
      </div>
      {modalOpen && (
        <ImageModal
          title={'사진'}
          images={[toImageUrl(member.photo, 1)]}
          footerText={member.name}
          initialIndex={modalIndex}
          onClose={() => setModalOpen(false)}
          customClassName="px-[60px] gap-[60px]"
        />
      )}
    </>
  )
}
