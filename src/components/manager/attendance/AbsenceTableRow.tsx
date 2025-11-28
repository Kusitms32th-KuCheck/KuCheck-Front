'use client'
import { useState, useEffect } from 'react'
import AbsenceDropdown from './AbsenceDropdown'
import { UpIcon, DownIcon } from '@/assets/svgComponents/manager'
import { AbsenceReportItem, AbsencePenaltyType } from '@/types/manager/attendance/type'
import { patchPenaltyClient } from '@/lib/manager/client/absence'
import ImageModal from '../modal/imageModal'
import { getFileType } from '@/utils/manager/fileType'
import RoleTag from '../common/RoleTag'

interface AbsenceTableRowProps {
  record: AbsenceReportItem & { documentStatus?: string }
  isEven: boolean
  gridTemplate: string
}

const ATTENDANCE_SCORE_OPTIONS = [
  { label: '결석(인정)', value: 'EXCUSED', displayValue: '0' },
  { label: '결석(사유 -2)', value: 'ABSENT_WITH_DOC', displayValue: '-2' },
  { label: '결석(무단 -2)', value: 'ABSENT_WITH_CAUSE', displayValue: '-2' },
  { label: '결석(미제출 -3)', value: 'ABSENT', displayValue: '-3' },
  { label: '지각(-1)', value: 'LATE', displayValue: '-1' },
  { label: '조퇴(-1)', value: 'EARLY_LEAVE', displayValue: '-1' },
]

export default function AbsenceTableRow({ record, isEven, gridTemplate }: AbsenceTableRowProps) {
  const getInitialSelectedScore = () => {
    if (record.absenceApprovedType && record.absenceApprovedType !== 'null') {
      return record.absenceApprovedType
    }
    return ''
  }

  const [selectedScore, setSelectedScore] = useState(getInitialSelectedScore())
  const [isLoading, setIsLoading] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  useEffect(() => {
    setSelectedScore(getInitialSelectedScore())
  }, [record.absenceApprovedType])

  // 벌점 설정 핸들러
  const handleScoreChange = async (value: string) => {
    setSelectedScore(value)
    setIsLoading(true)
    try {
      const result = await patchPenaltyClient(record.absenceReportId, value as AbsencePenaltyType)
      if (result.success) {
        console.log('✅ Successfully set penalty:', result.data)
      }
    } catch (error) {
      console.error('❌ Error setting penalty:', error)
      setSelectedScore('')
    } finally {
      setIsLoading(false)
    }
  }

  // 증빙서류 클릭 핸들러
  const handleDocumentClick = () => {
    if (!record.url) return
    const fileType = getFileType(record.url)
    if (fileType === 'image') {
      // 이미지인 경우 ImageModal 열기
      setIsImageModalOpen(true)
    } else {
      // PDF나 기타 파일인 경우 새 창에서 열기
      window.open(record.url, '_blank')
    }
  }

  return (
    <>
      <div
        className={`h-[68px] body-lg-regular grid items-center border-b border-gray-100  ${
          isEven ? 'bg-white' : 'bg-background1'
        }`}
        style={{ gridTemplateColumns: gridTemplate }}
      >
        <p className='pl-6'>{record.name}</p>
        <div>
          <RoleTag label={record.part} />
        </div>
        <p>{record.submitDate}</p>
        <p>{record.submitType}</p>
        <p>{record.time}</p>
        <p className={`h-full flex items-center ${isEven ? '' : 'bg-background1'}`}>{record.reason}</p>
        <p className={`h-full flex items-center ${isEven ? '' : 'bg-background1'}`}>
          <button
            onClick={handleDocumentClick}
            className="text-left hover:underline focus:underline focus:outline-none"
            disabled={!record.url}
          >
            {record.documentStatus || record.url}
          </button>
        </p>
        <div className={`h-full flex items-center ${isEven ? '' : 'bg-background1'}`}>
          <AbsenceDropdown
            options={ATTENDANCE_SCORE_OPTIONS}
            selected={selectedScore}
            onChange={handleScoreChange}
            rightIcon={<DownIcon width={24} height={24} />}
            rightIconActive={<UpIcon width={24} height={24} />}
            showValueInsteadOfLabel={true}
            disabled={isLoading}
          />
        </div>
      </div>
      {isImageModalOpen && record.url && getFileType(record.url) === 'image' && (
        <ImageModal
          customClassName="px-[60px] gap-[30px] min-w-[600px]"
          title={`${record.name} 증빙서류`}
          images={[record.url]}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </>
  )
}
