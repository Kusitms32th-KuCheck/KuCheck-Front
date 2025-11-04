'use client'

import { useState } from 'react'
import Dropdown from '../ManagerdropDown'
import { PointupIcon, PointdownIcon } from '@/assets/svgComponents/manager'
import InputField from './InputField'
import ImageUpload from './ImageUpload'

export default function SessionHeader() {
  const hourOptions = Array.from({ length: 6 }, (_, i) => ({
    label: String(11 + i).padStart(2, '0'),
    value: String(11 + i).padStart(2, '0'),
  }))
  const minuteOptions = [
    { label: '00', value: '00' },
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '30', value: '30' },
    { label: '40', value: '40' },
    { label: '50', value: '50' },
  ]

  const [selectedHours, setSelectedHours] = useState<string[]>(['', ''])
  const [selectedMinutes, setSelectedMinutes] = useState<string[]>(['', ''])

  return (
    <div className="space-y-6">
      <InputField label="장소" placeholder="세션 장소를 입력해 주세요" />
      <InputField label="일시">
        <div className="flex items-center">
          <div className="body-lg-medium bg-background1 mr-[21px] flex h-[40px] items-center rounded-[8px] border border-gray-300 px-3 text-gray-500">
            09/20
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
