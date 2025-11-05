'use client'

import { useState, useEffect } from 'react'
import Dropdown from '../../common/ManagerdropDown'
import { PointupIcon, PointdownIcon } from '@/assets/svgComponents/manager'
import InputField from './InputField'
import ImageUpload from './ImageUpload'

type SessionHeaderProps = {
  place: string
  setPlace: (v: string) => void
  setStartTime: (v: string) => void
  setEndTime: (v: string) => void
  date?: string | null
}

export default function SessionHeader({ place, setPlace, setStartTime, setEndTime, date }: SessionHeaderProps) {
  const hourOptions = Array.from({ length: 6 }, (_, i) => ({
    label: String(11 + i).padStart(2, '0'),
    value: String(11 + i).padStart(2, '0'),
  }))
  const minuteOptions = ['00', '10', '20', '30', '40', '50'].map((v) => ({
    label: v,
    value: v,
  }))

  const [selectedHours, setSelectedHours] = useState<string[]>(['', ''])
  const [selectedMinutes, setSelectedMinutes] = useState<string[]>(['', ''])

  useEffect(() => {
    const s = `${selectedHours[0]}:${selectedMinutes[0]}:00`
    const e = `${selectedHours[1]}:${selectedMinutes[1]}:00`
    if (selectedHours[0] && selectedMinutes[0]) setStartTime(s)
    if (selectedHours[1] && selectedMinutes[1]) setEndTime(e)
  }, [selectedHours, selectedMinutes, setStartTime, setEndTime])

  return (
    <div className="space-y-6">
      <InputField label="장소" placeholder="세션 장소를 입력해 주세요">
        <input
          className="body-lg-medium h-[40px] w-full rounded-[8px] border border-gray-300 px-3 text-gray-900"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </InputField>

      <InputField label="일시">
        <div className="flex items-center">
          <div className="body-lg-medium bg-background1 mr-[21px] flex h-[40px] items-center rounded-[8px] border border-gray-300 px-3 text-gray-500">
            {date}
          </div>
          {['시작', '종료'].map((t, idx) => (
            <div key={t} className="flex items-center">
              {idx === 1 && <span>~</span>}
              <div className="mx-2">
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
              <div className="mx-2">
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

      <ImageUpload />
    </div>
  )
}
