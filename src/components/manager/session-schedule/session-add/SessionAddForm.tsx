'use client'

import { useState } from 'react'
import ManagerButton from '../../common/ManagerButton'
import ManagerInput from '../../common/ManagerInput'
import SessionCalendar from './SessionCalendar'

type Props = {
  initialWeeks?: number
  initialDate?: string
  onGenerate: (weeks: number, firstDate: string) => void
}

export default function SessionAddForm({ initialWeeks, initialDate = '', onGenerate }: Props) {
  const [weeks, setWeeks] = useState<string>(initialWeeks != null ? String(initialWeeks) : '')
  const [firstDate, setFirstDate] = useState<string>(initialDate)
  const [errors, setErrors] = useState<{ weeks?: string; firstDate?: string }>({})
  const [locked, setLocked] = useState(false)

  const validate = () => {
    const e: typeof errors = {}
    const w = Number(weeks)
    if (!weeks || Number.isNaN(w) || w <= 0) e.weeks = '올바른 주차를 입력해 주세요'
    if (!firstDate) e.firstDate = '정확한 일자를 입력해 주세요'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleConfirm = () => {
    if (!validate()) return
    onGenerate(Number(weeks), firstDate)
    setLocked(true)
  }

  const handleReset = () => {
    setLocked(false)
  }

  return (
    <div className="shadow-middlemodal flex w-[507px] min-w-[300px] flex-col gap-[60px] self-start rounded-[12px] bg-white px-10 py-8">
      <div className="mb-4 px-3 md:mb-6 md:px-6">
        <p className="heading-sm-medium pb-3">전체 주차</p>
        <ManagerInput
          type="text"
          inputMode="numeric"
          customClassName="max-w-[295px]"
          value={weeks}
          onChange={(e) => {
            if (locked) return
            const v = e.target.value
            if (v === '' || /^\d+$/.test(v)) {
              if (errors.weeks) setErrors((prev) => ({ ...prev, weeks: undefined }))
            } else {
              setErrors((prev) => ({ ...prev, weeks: '숫자만 입력해주세요' }))
            }
            setWeeks(v)
          }}
          placeholder="'숫자만' 입력해주세요"
          inputBoxStyle={errors.weeks ? 'error' : 'default'}
          errorMessage={errors.weeks}
          className="w-full rounded-[8px] text-sm"
          size="sm"
        />
      </div>

      <div className="mb-4 px-3 md:mb-6 md:px-6">
        <p className="heading-sm-medium pb-3">첫 세션 날짜</p>
        <SessionCalendar
          value={firstDate}
          onChange={(d) => {
            if (locked) return
            setFirstDate(d)
            if (errors.firstDate) setErrors((prev) => ({ ...prev, firstDate: undefined }))
          }}
          error={errors.firstDate}
        />
      </div>

      <div className="px-3 pb-4">
        {locked ? (
          <button
            type="button"
            onClick={handleReset}
            className="bg-primary-100 text-primary-500 body-sm-medium rounded-[8px] px-6 py-2"
          >
            재설정
          </button>
        ) : (
          <ManagerButton onClick={handleConfirm} styleSize="sm">
            확인
          </ManagerButton>
        )}
      </div>
    </div>
  )
}
