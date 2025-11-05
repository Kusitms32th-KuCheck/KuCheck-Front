'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, CalendarIcon, CalendarOnIcon } from '@/assets/svgComponents/manager'

type Props = {
  value?: string
  onChange: (dateString: string) => void
  error?: string
}

function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function getFirstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

export default function SessionCalendar({ value, onChange, error }: Props) {
  const [showCalendar, setShowCalendar] = useState(false)
  const initial = value ? new Date(value) : new Date()
  const [calendarDate, setCalendarDate] = useState<Date>(initial)

  const generateCalendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(calendarDate)
    const firstDay = getFirstDayOfMonth(calendarDate)
    const days: Array<number | null> = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }, [calendarDate])

  const handleDateClick = (day: number) => {
    const year = calendarDate.getFullYear()
    const month = String(calendarDate.getMonth() + 1).padStart(2, '0')
    const date = String(day).padStart(2, '0')
    const dateString = `${year}-${month}-${date}`
    onChange(dateString)
    setShowCalendar(false)
  }

  const handlePrevMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1))
  const handleNextMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1))

  const formatDateForDisplay = (dateStr?: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  const dayLabels = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div className="relative max-w-[295px]">
      <div
        onClick={() => setShowCalendar(!showCalendar)}
        className={`flex cursor-pointer items-center justify-between rounded-[8px] border px-5 py-3 transition-all ${
          error ? 'border-sub-red' : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
      >
        <input
          type="text"
          value={formatDateForDisplay(value)}
          readOnly
          placeholder="MM/DD/YYYY"
          aria-invalid={!!error}
          aria-describedby={error ? 'session-calendar-error' : undefined}
          className="flex-1 cursor-pointer bg-transparent text-sm outline-none placeholder:text-gray-300"
        />
        {showCalendar ? <CalendarOnIcon /> : <CalendarIcon />}
      </div>

      {error && (
        <p id="session-calendar-error" role="alert" className="caption-sm-medium text-sub-red mt-2">
          {error}
        </p>
      )}

      {showCalendar && (
        <div className="absolute top-10 left-55 z-40 w-[416px] rounded-[10px] bg-white p-10 shadow-[0_0_12px_rgba(0,0,0,0.15)]">
          <div className="mb-10 flex items-center justify-center">
            <button onClick={handlePrevMonth}>
              <ChevronLeft />
            </button>
            <p className="body-2xl-semibold px-[50px]">
              {calendarDate.getFullYear()}년 {calendarDate.getMonth() + 1}월
            </p>
            <button onClick={handleNextMonth}>
              <ChevronRight />
            </button>
          </div>

          <div className="mb-6 grid grid-cols-7 justify-items-center gap-2">
            {dayLabels.map((day) => (
              <div
                key={day}
                className="body-md-regular flex h-[32px] w-[32px] items-center justify-center text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 justify-items-center gap-2">
            {generateCalendarDays.map((day, idx) => (
              <button
                key={idx}
                onClick={() => day && handleDateClick(day)}
                disabled={!day}
                className={`body-md-regular flex h-[32px] w-[32px] items-center justify-center rounded-full transition-all ${
                  !day
                    ? 'cursor-default text-gray-300'
                    : value ===
                        `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                      ? 'bg-primary-500 font-bold text-white'
                      : 'active:bg-primary-500 text-gray-700 hover:bg-gray-100 active:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
