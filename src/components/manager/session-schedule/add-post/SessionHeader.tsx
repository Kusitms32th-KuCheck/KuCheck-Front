'use client'

import { useState, useEffect } from 'react'
import Dropdown from '../../common/ManagerdropDown'
import { PointupIcon, PointdownIcon } from '@/assets/svgComponents/manager'
import InputField from './InputField'
import ImageUpload from './ImageUpload'
import { useSessionScheduleStore } from '@/store/manager/useSessionScheduleStore'

type SessionHeaderProps = {
  place: string
  setPlace: (v: string) => void
  startTime?: string
  endTime?: string
  setStartTime: (v: string) => void
  setEndTime: (v: string) => void
  date?: string | null
  files: File[]
  setFiles: (files: File[] | ((prev: File[]) => File[])) => void
  error?: boolean
}

export default function SessionHeader({
  place,
  setPlace,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  date,
  files,
  setFiles,
  error = false,
}: SessionHeaderProps) {
  const hourOptions = Array.from({ length: 13 }, (_, i) => ({
    label: String(11 + i).padStart(2, '0'),
    value: String(11 + i).padStart(2, '0'),
  }))
  const minuteOptions = ['00', '10', '20', '30', '40', '50'].map((v) => ({
    label: v,
    value: v,
  }))

  // 기존 시간 값이 있으면 파싱해서 초기값 설정
  const parseTime = (timeString: string) => {
    if (!timeString) return ['', '']
    const [hour, minute] = timeString.split(':')
    return [hour || '', minute || '']
  }

  const [selectedHours, setSelectedHours] = useState<string[]>(() => {
    const startHourMinute = parseTime(startTime || '')
    const endHourMinute = parseTime(endTime || '')
    return [startHourMinute[0], endHourMinute[0]]
  })

  const [selectedMinutes, setSelectedMinutes] = useState<string[]>(() => {
    const startHourMinute = parseTime(startTime || '')
    const endHourMinute = parseTime(endTime || '')
    return [startHourMinute[1], endHourMinute[1]]
  })

  // 초기 시간 값이 변경될 때 상태 업데이트
  useEffect(() => {
    if (startTime || endTime) {
      const startHourMinute = parseTime(startTime || '')
      const endHourMinute = parseTime(endTime || '')
      setSelectedHours([startHourMinute[0], endHourMinute[0]])
      setSelectedMinutes([startHourMinute[1], endHourMinute[1]])
    }
  }, [startTime, endTime])

  useEffect(() => {
    const s = `${selectedHours[0]}:${selectedMinutes[0]}:00`
    const e = `${selectedHours[1]}:${selectedMinutes[1]}:00`
    if (selectedHours[0] && selectedMinutes[0]) setStartTime(s)
    if (selectedHours[1] && selectedMinutes[1]) setEndTime(e)
  }, [selectedHours, selectedMinutes, setStartTime, setEndTime])

  // error prop으로 상태 제어

  const selectedSessionName = useSessionScheduleStore(
    (state: import('@/store/manager/useSessionScheduleStore').SessionScheduleStore) => state.selectedSessionName
  )
  return (
    <div className="space-y-6">
      <p className="heading-lg-medium">{selectedSessionName || '세션이름없음'}</p>
      <InputField
        label={<span>장소 {error && !place && <span className="text-sub-red ml-2">필수 항목입니다</span>}</span>}
        placeholder="세션 장소를 입력해 주세요"
      >
        <input
          className={`body-lg-medium focus:border-primary-500 h-[40px] w-full rounded-[8px] border px-3 text-gray-900 focus:ring-[0.5] focus:outline-none ${error && !place ? 'border-sub-red' : 'border-gray-300'}`}
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </InputField>

      <InputField
        label={
          <span>
            일시{' '}
            {error && (!selectedHours[0] || !selectedMinutes[0] || !selectedHours[1] || !selectedMinutes[1]) && (
              <span className="text-sub-red ml-2">필수 항목입니다</span>
            )}
          </span>
        }
      >
        <div className="flex items-center">
          <div className="body-lg-medium bg-background1 mr-[21px] flex h-[40px] items-center rounded-[8px] border border-gray-300 px-3 text-gray-500">
            {date}
          </div>
          {['시작', '종료'].map((t, idx) => (
            <div key={t} className="flex items-center">
              {idx === 1 && <span>~</span>}
              <div className={`mx-2 ${error && !selectedHours[idx] ? 'border-sub-red rounded-[8px] border' : ''}`}>
                <Dropdown
                  size="add"
                  options={hourOptions}
                  selected={selectedHours[idx]}
                  onChange={(v: string) => setSelectedHours((prev) => prev.map((p, j) => (j === idx ? v : p)))}
                  triggerClassName={
                    selectedHours[idx] ? 'body-lg-semibold text-primary-500' : 'text-gray-600 body-lg-medium'
                  }
                  rightIcon={<PointdownIcon width={10} height={8} />}
                  rightIconActive={<PointupIcon width={10} height={8} />}
                  placeholder="11"
                />
              </div>
              <span>:</span>
              <div className={`mx-2 ${error && !selectedMinutes[idx] ? 'border-sub-red rounded-[8px] border' : ''}`}>
                <Dropdown
                  size="add"
                  options={minuteOptions}
                  selected={selectedMinutes[idx]}
                  onChange={(v: string) => setSelectedMinutes((prev) => prev.map((p, j) => (j === idx ? v : p)))}
                  triggerClassName={
                    selectedMinutes[idx] ? 'body-lg-semibold text-primary-500' : 'text-gray-600 body-lg-medium'
                  }
                  rightIcon={<PointdownIcon width={10} height={8} />}
                  rightIconActive={<PointupIcon width={10} height={8} />}
                  placeholder="00"
                />
              </div>
            </div>
          ))}
        </div>
      </InputField>

      <ImageUpload files={files} setFiles={setFiles} />
    </div>
  )
}
