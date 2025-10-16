'use client'
import PointStatusTab from '../../../components/manager/point/PointStatusTab'
import ManagerButton from '@/components/manager/common/ManagerButton'

export default function PointPage() {
  return (
    <main className="flex h-full flex-col overflow-visible">
      <div className="flex flex-row items-center justify-between px-[38px] pt-8">
        <p className="heading-lg-medium">상벌점 조회</p>
        <ManagerButton onClick={() => {}} styleSize="sm">
          수정하기
        </ManagerButton>
      </div>
      <div className="flex-1 overflow-x-visible overflow-y-auto">
        <PointStatusTab />
      </div>
    </main>
  )
}
