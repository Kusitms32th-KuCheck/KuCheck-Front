'use client'
import { useState } from 'react'
import { gridTemplate } from './AbsenceTableHeader'
import Dropdown from '../common/ManagerdropDown'
import { UpIcon, DownIcon } from '@/assets/svgComponents/manager'
import { TransformedAbsenceReportItem, AbsencePenaltyType } from '@/types/manager/attendance/type'
import { patchPenaltyClient } from '@/lib/manager/client/absence'
import ImageModal from '../modal/imageModal'
import { getFileType } from '@/utils/manager/fileType'

interface AbsenceTableRowProps {
  record: TransformedAbsenceReportItem
  isEven: boolean
}

const ATTENDANCE_SCORE_OPTIONS = [
  { label: '결석(인정)', value: 'EXCUSED', displayValue: '0' },
  { label: '결석(사유서 있음)', value: 'ABSENT_WITH_DOC', displayValue: '-1' },
  { label: '결석(사유 있음)', value: 'ABSENT_WITH_CAUSE', displayValue: '-1' },
  { label: '결석(무단)', value: 'ABSENT', displayValue: '-2' },
  { label: '지각', value: 'LATE', displayValue: '-1' },
  { label: '조퇴', value: 'EARLY_LEAVE', displayValue: '-1' },
]

export default function AbsenceTableRow({ record, isEven }: AbsenceTableRowProps) {
  const [selectedScore, setSelectedScore] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const cellData = [record.name, record.part, record.submitDate, record.submitType, record.time, record.reason]

  // 벌점 설정 핸들러
  const handleScoreChange = async (value: string) => {
    setSelectedScore(value)
    setIsLoading(true)

    try {
      console.log('🔄 Setting penalty for absenceReportId:', record.absenceReportId, 'type:', value)

      const result = await patchPenaltyClient(record.absenceReportId, value as AbsencePenaltyType)

      if (result.success) {
        console.log('✅ Successfully set penalty:', result.data)
      } else {
        console.error('❌ Failed to set penalty:', result.error)
        // 실패 시 원래 값으로 되돌리기 (필요한 경우)
        setSelectedScore('')
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
        className={`body-lg-regular grid items-center gap-[50px] border-b border-gray-100 px-6 py-[22px] ${
          isEven ? 'bg-white' : 'bg-background1'
        }`}
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {cellData.map((data, index) => (
          <p key={index}>{data}</p>
        ))}

        <p>
          <button
            onClick={handleDocumentClick}
            className="text-left hover:underline focus:outline-none focus:underline"
            disabled={!record.url}
          >
            {record.documentStatus}
          </button>
        </p>

        <div>
          <Dropdown
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

      {/* ImageModal for image files */}
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
    
