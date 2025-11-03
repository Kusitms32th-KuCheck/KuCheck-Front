'use client'

import DropDownCell from './DropDownCell'
import EditableTextCell from './EditableTextCell'

type Row = {
  weekLabel: string
  date: string
  name: string
  type: string
}

type Props = {
  rows: Row[]
  gridCols?: string
  customClass?: string
  headerLabels?: [string, string, string, string]
  onNameChange?: (idx: number, v: string) => void
  onTypeChange?: (idx: number, v: string) => void
}

export default function SessionTable({
  rows,
  gridCols = 'grid-cols-[147px_145px_312px_193px]',
  customClass = 'min-w-[797px]',
  headerLabels = ['주차', '세션 일자', '세션 이름', '세션 종류'],

  onNameChange,
  onTypeChange,
}: Props) {
  return (
    <div className="shadow-middlemodal flex min-h-[100vh] flex-col overflow-hidden rounded-[12px] bg-white">
      <div className="align-center flex w-full overflow-x-auto">
        <div className={customClass}>
          <div
            className={`grid ${gridCols} body-lg-semibold items-center gap-0 border-b border-gray-100 py-[14px] text-gray-500`}
          >
            <div className="pl-[34px]">{headerLabels[0]}</div>
            <div className="pl-2">{headerLabels[1]}</div>
            <div className="pl-2">{headerLabels[2]}</div>
            <div className="pl-2">{headerLabels[3]}</div>
          </div>

          <div className={`flex-1 overflow-auto`}>
            {rows.length === 0 ? (
              <div className="flex h-[80vh] flex-col items-center justify-center text-gray-700">
                <p className="body-md-regular justify-center text-gray-500">전체 주차와 첫 세션 일시를 입력한 후</p>
                <p className="body-md-regular justify-center text-gray-500">‘확인’ 버튼을 눌러주세요</p>
              </div>
            ) : (
              rows.map((r, i) => (
                <div
                  key={i}
                  className={`grid ${gridCols} body-lg-regular items-center gap-0 border-t border-gray-200 ${i % 2 === 1 ? 'bg-background1' : ''}`}
                >
                  <div className="body-lg border-r border-gray-200 py-[22px] pl-[34px] text-gray-800">
                    {r.weekLabel}
                  </div>
                  <div className="border-r border-gray-200 px-[20px] py-[22px] text-gray-800">{r.date}</div>
                  <div>
                    <EditableTextCell
                      forceTextBlack={true}
                      isEditMode={true}
                      value={r.name}
                      onChange={(v) => onNameChange && onNameChange(i, v)}
                      isModified={r.name.trim().length > 0}
                      className="w-full border-r border-gray-200 px-[20px] py-[14px]"
                    />
                  </div>
                  <div>
                    <DropDownCell
                      isEditMode={true}
                      value={r.type}
                      onChange={(v) => onTypeChange && onTypeChange(i, v)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
