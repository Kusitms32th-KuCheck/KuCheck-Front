'use client'

import ManagerButton from '../common/ManagerButton'
import { usePointStore } from '@/store/manager/usePointStore'
import { usePointTableStore } from '@/store/manager/usePointTableStore'
import { HeaderArrowRight } from '@/assets/svgComponents/manager'

export default function PointHeader() {
  const { isEditMode, toggleEditMode } = usePointStore()
  const { resetToOriginal } = usePointTableStore()

  const handleReset = () => {
    resetToOriginal()
  }

  return (
    <div className="flex flex-row items-center justify-between px-[32px] pt-8">
      {isEditMode ? (
        <>
          {/* 수정 모드 - 브레드크럼 */}
          <div className="flex items-center gap-2">
            <span className="heading-lg-medium text-gray-600">상벌점 조회</span>
            <HeaderArrowRight width={24} height={24} />
            <span className="heading-lg-medium">수정하기</span>
          </div>
          {/* 수정 모드 - 초기화/저장하기 버튼 */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="body-lg-medium body-sm-medium h-[36px] w-[73px] rounded-[4px] bg-white text-gray-900"
            >
              초기화
            </button>
            <ManagerButton onClick={toggleEditMode} styleSize="sm">
              저장하기
            </ManagerButton>
          </div>
        </>
      ) : (
        <>
          {/* 일반 모드 */}
          <p className="heading-lg-medium">상벌점 조회</p>
          <ManagerButton onClick={toggleEditMode} styleSize="sm">
            수정하기
          </ManagerButton>
        </>
      )}
    </div>
  )
}
