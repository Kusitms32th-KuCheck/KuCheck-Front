'use client'
import { useState } from 'react'
import Dropdown from '../common/ManagerdropDown'
import { UpIcon, DownIcon } from '@/assets/svgComponents/manager'
import ImageModal from '../modal/imageModal'
import type { CheckDocumentRecord } from '@/types/manager/check-document/types'

interface AbsenceTableRowProps {
  record: CheckDocumentRecord
  isEven: boolean
  gridTemplate?: string
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

export default function AbsenceTableRow({ record, isEven, gridTemplate }: AbsenceTableRowProps) {
  const initialApprovalValue = record.approval === true ? 'approved' : 'rejected'
  const [selectedScore, setSelectedScore] = useState(initialApprovalValue)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  const formattedSubmitDate = record.submitDate ? record.submitDate.substring(0, 10) : ''

  const cellData = [record.name, record.part, formattedSubmitDate, record.applicationUrl, record.viewUrl]

  const toImageUrl = (val: string) => {
    if (val && (val.startsWith('http') || val.startsWith('/'))) return val
    return '/png/mock-image-default.png'
  }

  return (
    <>
      <div
        className={`body-lg-regular grid items-center border-b border-gray-100 px-6 ${
          isEven ? 'bg-white' : 'bg-background1'
        }`}
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {cellData.map((data, index) => {
          if (index === 3 || index === 4) {
            const openIndex = index === 3 ? 0 : 1
            const fileUrl = data as string
            const fileName = getFileNameFromUrl(fileUrl)

            const displayFileName = fileName || '미제출'
            const isSubmitted = !!fileName

            return (
              <button
                key={index}
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
          }
          return (
            <p key={index} className="py-[22px] text-start whitespace-nowrap">
              {data}
            </p>
          )
        })}

        <div className="flex items-center justify-between">
          <Dropdown
            options={ATTENDANCE_SCORE_OPTIONS}
            selected={selectedScore}
            onChange={setSelectedScore}
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
