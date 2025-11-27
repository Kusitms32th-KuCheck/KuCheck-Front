'use client'

import { useEffect, useState } from 'react'
import ImageModal from '../../modal/imageModal'
import EditableTextCell from './EditableTextCell'
import SessionCell from './SessionCell'
import RoleTag from '@/components/manager/common/RoleTag'
  const partMap: Record<string, string> = {
    BACKEND: '백엔드',
    FRONTEND: '프론트엔드',
    DESIGN: '디자인',
    PLANNING: '기획',
  }
  const reversePartMap: Record<string, string> = {
    '백엔드': 'BACKEND',
    '프론트엔드': 'FRONTEND',
    '디자인': 'DESIGN',
    '기획': 'PLANNING',
  }
import { MemberApprovedResponse } from '@/types/manager/member/types'
import { AppleIcon , KakaoIcon} from '@/assets/svgComponents/manager'
import { useMemberTableStore } from '@/store/manager/useMemberTableStore'
import { ManageImage } from '@/assets/svgComponents/manager'
export default function MemberTableRow({
  member,
  index,
  isEditMode = false,
  gridTemplate,
  revertToken,
  editedValues,
  onEdit,
}: {
  member: MemberApprovedResponse
  index: number
  isEditMode?: boolean
  gridTemplate?: string
  revertToken?: number
  editedValues?: Partial<MemberApprovedResponse>
  onEdit?: (patch: Partial<MemberApprovedResponse>) => void
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const [name, setName] = useState(editedValues?.name ?? member.name)
  const [part, setPart] = useState(editedValues?.part ?? member.part)
  const [school, setSchool] = useState(editedValues?.school ?? member.school)
  const [major, setMajor] = useState(editedValues?.major ?? member.major)
  const [phone, setPhone] = useState(editedValues?.phoneNumber ?? member.phoneNumber)
  const isNameModified = name !== member.name
  const isPartModified = part !== member.part
  const isSchoolModified = school !== member.school
  const isMajorModified = major !== member.major
  const isPhoneModified = phone !== member.phoneNumber
  useEffect(() => {
    setName(editedValues?.name ?? member.name)
    setPart(editedValues?.part ?? member.part)
    setSchool(editedValues?.school ?? member.school)
    setMajor(editedValues?.major ?? member.major)
    setPhone(editedValues?.phoneNumber ?? member.phoneNumber)
  }, [member, editedValues])

  useEffect(() => {
    setName(member.name)
    setPart(member.part)
    setSchool(member.school)
    setMajor(member.major)
    setPhone(member.phoneNumber)
  }, [revertToken, member])

  return (
    <>
      <div
        className={`group grid min-h-[68px] cursor-default items-center gap-0`}
        style={{ gridTemplateColumns: gridTemplate ?? '200px repeat(3,1fr) 200px 220px' }}
      >
        <div
          className={`body-lg-medium focus-within:border-primary-500 flex h-[68px] items-center border-r border-gray-200 px-[24px] text-start text-gray-900 group-hover:bg-gray-100 focus-within:border-2 ${index % 2 === 1 ? 'bg-background1' : ''}`}
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

        <div
          className={`flex h-[68px] items-center border-r border-gray-200 px-[24px] group-hover:bg-gray-100 ${index % 2 === 1 ? 'bg-background1' : ''}`}
        >
    <button
      type="button"
      onClick={() => {
        setModalIndex(0)
        setModalOpen(true)
      }}
      className="bg-gray-100 body-lg-regular flex h-[40px] min-w-[119px] items-center justify-center rounded-[4px] border border-gray-200 px-4 text-center text-gray-800 hover:bg-gray-100 gap-2"
    >
      <ManageImage 
        className="flex-shrink-0" 
        width={20} 
        height={20} 
      />

      <span className="truncate flex-shrink text-gray-500">
        {member.profileImageUrl
          ? member.profileImageUrl.split('/').pop()
          : '사진없음'}
      </span>
    </button>

        </div>

        <div
          className={`body-lg-medium flex h-[68px] items-center justify-start border-r border-gray-200  group-hover:bg-gray-100 ${index % 2 === 1 ? 'bg-background1' : ''}`}
        >
          {isEditMode ? (
            <SessionCell
              isEditMode={isEditMode}
              value={partMap[part] || part}
              isModified={isPartModified}
              onChange={(v) => {
                const engPart = reversePartMap[v] || v
                setPart(engPart)
                if (onEdit) onEdit({ part: engPart })
              }}
              className="w-full flex px-[12px]"
            />
          ) : (
            <div className='flex w-full pl-[19px]'>
              <RoleTag label={partMap[part] || part} />
            </div>
          )}
        </div>

        <div
          className={`body-lg-medium focus-within:border-primary-500 flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 group-hover:bg-gray-100 focus-within:border-2 ${index % 2 === 1 ? 'bg-background1' : ''}`}
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
          className={`body-lg-medium focus-within:border-primary-500 flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 group-hover:bg-gray-100 focus-within:border-2 ${index % 2 === 1 ? 'bg-background1' : ''}`}
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
          className={`body-lg-medium focus-within:border-primary-500 flex h-[68px] items-center justify-start border-r border-gray-200 px-6 text-gray-900 group-hover:bg-gray-100 focus-within:border-2 ${index % 2 === 1 ? 'bg-background1' : ''}`}
        >
          <EditableTextCell
            isEditMode={isEditMode}
            value={phone}
            isModified={isPhoneModified}
            onChange={(v) => {
              setPhone(v)
              if (onEdit) onEdit({ phoneNumber: v })
            }}
            className="w-full"
          />
        </div>

        <div
          className={`body-lg-medium flex h-[68px] items-center justify-between gap-2 px-6 text-gray-900 group-hover:bg-gray-100 ${index % 2 === 1 ? 'bg-background1' : ''}`}
        >
          <span className="flex items-center gap-2">
           {member.socialType=== 'APPLE' ? <AppleIcon width={20} height={20} /> : <KakaoIcon width={20} height={20} />}
            <span className="ml-2 truncate">{member.email}</span>
          </span>
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
        </div>
      </div>
      {modalOpen && (
        <ImageModal
          title={'사진'}
          images={member.profileImageUrl ? [member.profileImageUrl] : []}
          footerText={member.name}
          initialIndex={modalIndex}
          onClose={() => setModalOpen(false)}
          customClassName="px-[60px] gap-[60px]"
        />
      )}
    </>
  )
}
