'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import Dropdown from '../common/ManagerdropDown'
import RoleTag from '../common/RoleTag'
import ImageModal from '../modal/imageModal'
import { UpIcon, DownIcon } from '@/assets/svgComponents/manager'
import { postKupicClient } from '@/lib/manager/client/kupic'
import { formatDateToKorean, getPartName } from '@/utils/manager/attendance'
import type { CheckDocumentRecord } from '@/types/manager/check-document/types'

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

// URL에서 파일명 추출
const getFileNameFromUrl = (url?: string) => {
  if (!url) return ''
  const fileName = url.split('/').pop() ?? ''
  return fileName.split('?')[0] // 쿼리 제거
}

export default function AbsenceTableRow({ record, isEven, gridTemplate, onToast }: AbsenceTableRowProps) {
  const router = useRouter()
  const initialApprovalValue = record.approval ? 'approved' : 'rejected'

  const [selectedScore, setSelectedScore] = useState(initialApprovalValue)
  const [isLoading, setIsLoading] = useState(false)
  const [modalState, setModalState] = useState<{ open: boolean; index: number }>({ open: false, index: 0 })

  const formattedSubmitDate = record.submitDate ? formatDateToKorean(record.submitDate) : ''

  const files = [
    { url: record.applicationUrl, title: '신청 사진' },
    { url: record.viewUrl, title: '시청 사진' },
  ]

  const toImageUrl = (val: string) => {
    if (val && (val.startsWith('http') || val.startsWith('/'))) return val
    return '/png/mock-image-default.png'
  }

  const handleApprovalChange = async (newValue: string) => {
    const isApproved = newValue === 'approved'
    const originalValue = selectedScore
    setSelectedScore(newValue)
    setIsLoading(true)

    try {
      const result = await postKupicClient({ kupickId: record.kupickId, approval: isApproved })
      if (!result.success) throw new Error(result.error || '알 수 없는 오류')
      onToast?.('저장되었습니다')
      router.refresh()
    } catch (err: unknown) {
      console.error('Approval update failed:', err)
      onToast?.(`승인 처리 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`)
      setSelectedScore(originalValue)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div
        className={clsx('body-lg-regular grid items-center border-b px-6', isEven ? 'bg-white' : 'bg-background1')}
        style={{ gridTemplateColumns: gridTemplate }}
      >
        <p className="py-[22px] text-start whitespace-nowrap">{record.name}</p>
        <div className="flex items-center py-[22px]">
          <RoleTag label={getPartName(record.part)} />
        </div>
        <p className="py-[22px] text-start whitespace-nowrap">{formattedSubmitDate}</p>
        {files.map(({ url }, index) => {
          const fileName = getFileNameFromUrl(url)
          const isSubmitted = !!fileName
          return (
            <button
              key={index}
              type="button"
              onClick={() => isSubmitted && setModalState({ open: true, index })}
              disabled={!isSubmitted}
              className={clsx(
                'body-lg-regular overflow-hidden py-[22px] text-start text-ellipsis whitespace-nowrap',
                isSubmitted ? 'text-gray-800 hover:underline' : 'cursor-default text-gray-500'
              )}
            >
              <span className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {fileName || '미제출'}
              </span>
            </button>
          )
        })}
        <div className="flex items-center justify-between text-gray-800">
          <Dropdown
            options={ATTENDANCE_SCORE_OPTIONS}
            selected={selectedScore}
            onChange={handleApprovalChange}
            disabled={isLoading}
            rightIcon={<DownIcon width={24} height={24} />}
            rightIconActive={<UpIcon width={24} height={24} />}
            showValueInsteadOfLabel
          />
        </div>
      </div>

      {modalState.open && (
        <ImageModal
          titles={files.map((f) => f.title)}
          images={files.map((f) => toImageUrl(f.url))}
          footerText={`${record.name}  ${formattedSubmitDate}`}
          initialIndex={modalState.index}
          onClose={() => setModalState({ ...modalState, open: false })}
          imageClassName="px-0 m-0"
        />
      )}
    </>
  )
}
