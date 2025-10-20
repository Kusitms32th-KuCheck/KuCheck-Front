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

export default function AbsenceTableRow({ record, isEven, gridTemplate }: AbsenceTableRowProps) {
  const [selectedScore, setSelectedScore] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  const cellData = [record.name, record.part, record.sessionDate, record.applicationImage, record.viewingImage]

  const toImageUrl = (val: string, seed = 100) => {
    if (!val) return `/png/mock-image-${seed}.png`
    if (val.startsWith('http')) return val
    if (val.startsWith('/')) return val
    return `/png/mock-image-${seed}.png`
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
            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setModalIndex(openIndex)
                  setModalOpen(true)
                }}
                className="body-lg-regular py-[22px] text-start whitespace-nowrap text-gray-800 hover:underline"
              >
                {data}
              </button>
            )
          }

          return <p key={index}>{data}</p>
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
          images={[toImageUrl(record.applicationImage, 1), toImageUrl(record.viewingImage, 2)]}
          footerText={`${record.name}  ${record.sessionDate}`}
          initialIndex={modalIndex}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
