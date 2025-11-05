'use client'

import { useRouter, usePathname } from 'next/navigation'
import DropDownCell from './DropDownCell'
import EditableTextCell from './EditableTextCell'

type Row = {
  weekLabel: string
  date: string
  name: string
  type: string
  filled?: boolean
  isEditing?: boolean
  isHoliday?: boolean
}

type Props = {
  rows: Row[]
  mode: 'view' | 'edit'
  showViewButton?: boolean
  isRowFilled?: (idx: number, row: Row) => boolean
  onNameChange?: (idx: number, v: string) => void
  onTypeChange?: (idx: number, v: string) => void
  onHolidayChange?: (idx: number, v: boolean) => void
  onViewClick?: (idx: number) => void
}

export default function SessionTable({
  rows,
  mode,
  showViewButton = false,
  isRowFilled,
  onNameChange,
  onTypeChange,
  onHolidayChange,
  onViewClick,
}: Props) {
  const isEditing = mode === 'edit'
  const router = useRouter()
  const pathname = usePathname() || ''
  const gridCols = showViewButton
    ? 'grid-cols-[147px_145px_312px_193px_75px_150px]'
    : 'grid-cols-[147px_145px_312px_193px_75px]'

  return (
    <div className="shadow-middlemodal flex flex-col overflow-hidden rounded-[12px] bg-white">
      <div className="align-center flex w-full overflow-x-auto">
        <div className="min-w-[797px]">
          <div
            className={`grid ${gridCols} body-lg-semibold items-center gap-0 border-b border-gray-100 py-[14px] text-gray-500`}
          >
            <div className="pl-[34px]">주차</div>
            <div>세션 일자</div>
            <div>세션 이름</div>
            <div>세션 종류</div>
            <div>공휴일</div>
            {showViewButton && <div />}
          </div>

          {rows.length === 0 ? (
            <div className="flex h-[80vh] flex-col items-center justify-center text-gray-700">
              <p className="body-md-regular text-gray-500">전체 주차와 첫 세션 일시를 입력한 후</p>
              <p className="body-md-regular text-gray-500">‘확인’ 버튼을 눌러주세요</p>
            </div>
          ) : (
            rows.map((r, i) => (
              <div
                key={i}
                className={`grid ${gridCols} body-lg-regular items-center gap-0 border-t border-gray-200 ${
                  i % 2 === 1 ? 'bg-background1' : ''
                }`}
              >
                <div className="body-lg border-r border-gray-200 py-[22px] pl-[34px] text-gray-800">{r.weekLabel}</div>
                <div className="border-r border-gray-200 px-[20px] py-[22px] text-gray-800">{r.date}</div>

                {(() => {
                  const filled = typeof isRowFilled === 'function' ? isRowFilled(i, r) : r.name.trim().length > 0

                  const canEditRow = isEditing && (filled || !showViewButton)

                  if (canEditRow) {
                    return (
                      <>
                        <EditableTextCell
                          forceTextBlack
                          isEditMode
                          value={r.name}
                          onChange={(v) => onNameChange?.(i, v)}
                          isModified={r.name.trim().length > 0}
                          className="w-full border-r border-gray-200 px-[20px] py-[14px]"
                        />
                        <DropDownCell
                          className="align-center flex h-full border-r border-gray-200"
                          isEditMode
                          value={r.type}
                          onChange={(v) => onTypeChange?.(i, v)}
                        />
                        <div className="flex items-center justify-center border-r border-gray-200">
                          <input
                            type="checkbox"
                            checked={Boolean(r.isHoliday)}
                            onChange={(e) => onHolidayChange && onHolidayChange(i, e.target.checked)}
                          />
                        </div>
                      </>
                    )
                  }

                  return (
                    <>
                      <div
                        className={`border-r border-gray-200 px-[20px] py-[22px] ${filled ? 'text-gray-800' : 'text-gray-400'}`}
                      >
                        {filled ? r.name : '-'}
                      </div>
                      <div
                        className={`border-r border-gray-200 px-[20px] py-[22px] ${filled ? 'text-gray-800' : 'text-gray-400'}`}
                      >
                        {filled ? r.type : '-'}
                      </div>
                      <div
                        className={`border-r border-gray-200 px-[20px] py-[22px] ${
                          filled ? 'text-gray-800' : 'text-gray-400'
                        }`}
                      >
                        {r.isHoliday ? 'Y' : '-'}
                      </div>
                    </>
                  )
                })()}

                {showViewButton && (
                  <div className="flex justify-center">
                    {(() => {
                      const canView = typeof r.isEditing === 'boolean' ? r.isEditing : true
                      const isFilledClass =
                        'border-gray-700 rounded-[4px] px-3 py-[6px]  body-sm-medium text-white border bg-gray-700 '

                      const enabledClass =
                        'border-primary-200 rounded-[4px] px-3 py-[6px]  body-sm-medium text-primary-500 border bg-white '
                      const disabledClass =
                        'border-gray-200 rounded-[4px] px-3 py-[6px]  body-sm-medium text-gray-400 border bg-white cursor-not-allowed'
                      if (!canView && mode === 'edit') {
                        const cleaned = pathname.replace(/\/$/, '')
                        const target = cleaned.includes('/edit')
                          ? cleaned.replace(/\/edit(\/|$)/, '/detail-add$1')
                          : `${cleaned}/detail-add`
                        return (
                          <button onClick={() => router.push(target)} className={isFilledClass}>
                            세션 정보 입력
                          </button>
                        )
                      }

                      return (
                        <button
                          onClick={() => canView && onViewClick?.(i)}
                          disabled={!canView}
                          className={canView ? enabledClass : disabledClass}
                        >
                          세션 정보 보기
                        </button>
                      )
                    })()}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
