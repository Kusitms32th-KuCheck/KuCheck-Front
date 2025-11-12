'use client'

import InputField from './InputField'
import ImageUpload from './ImageUpload'

export default function PostHeader() {
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

      <ImageUpload />
    </div>
  )
}
