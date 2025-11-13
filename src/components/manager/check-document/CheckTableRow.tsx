'use client'
import { useState } from 'react'
import Dropdown from '../common/ManagerdropDown'
import RoleTag from '../common/RoleTag'

import { UpIcon, DownIcon } from '@/assets/svgComponents/manager'
import ImageModal from '../modal/imageModal'
import { useRouter } from 'next/navigation'
import { postKupicClient } from '@/lib/manager/client/kupic'
import { formatDateToKorean, getPartName } from '@/utils/manager/attendance'
import type { CheckDocumentRecord, KupicData } from '@/types/manager/check-document/types'

interface AbsenceTableRowProps {
  record: CheckDocumentRecord
  isEven: boolean
  gridTemplate?: string
  onToast?: (message: string) => void
}

const ATTENDANCE_SCORE_OPTIONS = [
  { label: '승인', value: 'approved', displayValue: '승인' },
  { label: '미승인', value: 'rejected', displayValue: '미승인' },
]

const getFileNameFromUrl = (url: string) => {
  if (!url) return ''
  const parts = url.split('/')
  const fileNameWithQuery = parts[parts.length - 1]
  if (!fileNameWithQuery) return ''
  const queryIndex = fileNameWithQuery.indexOf('?')
  if (queryIndex !== -1) {
    return fileNameWithQuery.substring(0, queryIndex)
  }
  return fileNameWithQuery
}

export default function AbsenceTableRow({ record, isEven, gridTemplate, onToast }: AbsenceTableRowProps) {
  const router = useRouter()
  const initialApprovalValue = record.approval === true ? 'approved' : 'rejected'
  const [selectedScore, setSelectedScore] = useState(initialApprovalValue)
  const [isLoading, setIsLoading] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  const formattedSubmitDate = record.submitDate ? formatDateToKorean(record.submitDate) : ''

  const toImageUrl = (val: string) => {
    if (val && (val.startsWith('http') || val.startsWith('/'))) return val
    return '/png/mock-image-default.png'
  }

  const handleApprovalChange = async (newValue: string) => {
    const isApproved = newValue === 'approved'
    const originalValue = selectedScore
    setSelectedScore(newValue)
    setIsLoading(true)

    const kupicData: KupicData = {
      kupickId: record.kupickId,
      approval: isApproved,
    }

    try {
      const result = await postKupicClient(kupicData)
      if (!result.success) {
        console.error('Approval update failed:', result.error)
        alert(`승인 처리 실패: ${result.error || '알 수 없는 오류'}`)
        setSelectedScore(originalValue)
      } else {
        console.log('Approval updated successfully:', result.data)
        onToast?.('저장되었습니다')
        router.refresh()
      }
    } catch (error) {
      console.error('Network or processing error during approval:', error)
      alert('네트워크 오류로 승인 처리에 실패했습니다.')
      setSelectedScore(originalValue)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div
        className={`body-lg-regular grid items-center border-b border-gray-100 px-6 ${
          isEven ? 'bg-white' : 'bg-background1'
        }`}
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {/* 이름 */}
        <p className="py-[22px] text-start whitespace-nowrap">{record.name}</p>

        {/* 파트 (RoleTag 컴포넌트 사용) */}
        <div className="flex items-center py-[22px]">
          <RoleTag label={getPartName(record.part)} />
        </div>

        {/* 제출일시 */}
        <p className="py-[22px] text-start whitespace-nowrap">{formattedSubmitDate}</p>

        {/* 신청 사진과 시청 사진 */}
        {[record.applicationUrl, record.viewUrl].map((fileUrl, index) => {
          const openIndex = index
          const fileName = getFileNameFromUrl(fileUrl)
          const displayFileName = fileName || '미제출'
          const isSubmitted = !!fileName

          return (
            <button
              key={index + 2}
              type="button"
              onClick={() => {
                if (isSubmitted) {
                  setModalIndex(openIndex)
                  setModalOpen(true)
                }
              }}
              className={`body-lg-regular overflow-hidden py-[22px] text-start text-ellipsis whitespace-nowrap ${
                isSubmitted ? 'text-gray-800 hover:underline' : 'cursor-default text-gray-500'
              }`}
              disabled={!isSubmitted}
            >
              <span className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {displayFileName}
              </span>
            </button>
          )
        })}

        <div className="flex items-center justify-between">
          <Dropdown
            options={ATTENDANCE_SCORE_OPTIONS}
            selected={selectedScore}
            onChange={handleApprovalChange}
            disabled={isLoading}
            rightIcon={<DownIcon width={24} height={24} />}
            rightIconActive={<UpIcon width={24} height={24} />}
            showValueInsteadOfLabel={true}
          />
        </div>
      </div>
      {modalOpen && (
        <ImageModal
          titles={['신청 사진', '시청 사진']}
          images={[toImageUrl(record.applicationUrl), toImageUrl(record.viewUrl)]}
          footerText={`${record.name}  ${formattedSubmitDate}`}
          initialIndex={modalIndex}
          onClose={() => setModalOpen(false)}
          imageClassName="px-0 m-0"
        />
      )}
    </>
  )
}
