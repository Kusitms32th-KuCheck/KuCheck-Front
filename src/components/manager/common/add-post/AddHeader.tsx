'use client'
import Dropdown from '../ManagerdropDown'
import { useState } from 'react'
import { PointupIcon, PointdownIcon, AddPhotoIcon } from '@/assets/svgComponents/manager'

type AddHeaderProps = {
  type: 'session' | 'post'
}

// 공통 입력 필드
const InputField = ({
  label,
  placeholder,
  children,
}: {
  label: string
  placeholder?: string
  children?: React.ReactNode
}) => (
  <div className="space-y-2">
    <label className="body-lg-semibold block">{label}</label>
    {children ? (
      children
    ) : (
      <input
        type="text"
        placeholder={placeholder}
        className="placeholder:body-lg-medium focus:ring-primary-500 w-full rounded-[8px] border border-gray-300 px-3 py-[10px] placeholder:text-gray-400 focus:ring-1 focus:outline-none"
      />
    )}
  </div>
)

// 공통 이미지 첨부 박스
const ImageUpload = ({ hasFiles = false }: { hasFiles?: boolean }) => (
  <div className="space-y-2">
    <div className="flex gap-3">
      <label className="body-lg-semibold block">이미지 첨부</label>
      <button className="caption-sm-medium h-[26px] w-[54px] rounded-[4px] border text-gray-600">내 PC</button>
    </div>
    {!hasFiles ? (
      <div className="body-sm-medium flex h-[99px] flex-col items-center justify-center gap-1 rounded-[12px] border border-gray-200 text-gray-500">
        <AddPhotoIcon width={24} height={24} />
        <p>파일을 마우스로 끌어오세요</p>
      </div>
    ) : (
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <input
          type="file"
          className="flex items-center justify-between border-b bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
        >
          <span>내 PC</span>
        </input>
        <div className="divide-y text-sm">
          {['스크린샷 20251011 1154338.png', '스크린샷 20251011 1154338.png'].map((file, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-red-500">✕</button>
                <span>{file}</span>
              </div>
              <span className="text-gray-500">10mb</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)

export default function AddHeader({ type }: AddHeaderProps) {
  return (
    <div className="w-full space-y-6 rounded-2xl bg-white p-6">
      {type === 'session' ? <SessionHeader /> : <PostHeader />}
    </div>
  )
}

/* -------------------- 세션용 폼 -------------------- */
function SessionHeader() {
  // Hours limited to 11 ~ 16
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
                  showValueInsteadOfLabel={false}
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
                  showValueInsteadOfLabel={false}
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

/* -------------------- 게시글용 폼 -------------------- */
function PostHeader() {
  const categories = [
    '기프',
    '밋업',
    '기업프로젝트',
    '큐픽',
    '수요조사',
    '홍보',
    '팀빌딩결과',
    '현장사진공유',
    '좋은정보공유',
    '일곱글자입니다',
  ]

  return (
    <div className="space-y-6">
      <InputField label="제목" placeholder="💜 큐포터즈 1차 모집! 💜" />

      <InputField label="카테고리">
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              <span className="text-sm text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </InputField>

      <ImageUpload hasFiles />
    </div>
  )
}
