'use client'

import { useSearchParams } from 'next/navigation'

const absencePageData: { page: string; title: string; process: string }[] = [
  { page: '1', title: '해당 세션을 선택해 주세요', process: '0%' },
  { page: '2', title: '참석 유형을 선택해 주세요', process: '20%' },
  { page: '3', title: '사유를 작성해 주세요', process: '50%' },
  { page: '4', title: '증빙 서류를 첨부해 주세요 (선택)', process: '70%' },
]

interface AbsenceHeaderProps {
  customProcess?: string
}

export default function AbsenceHeader({ customProcess }: AbsenceHeaderProps) {
  const searchParams = useSearchParams()
  const step = searchParams.get('step') || '1'

  // step과 page가 일치하는 데이터 찾기
  const currentPageData = absencePageData.find((item) => item.page === step)

  // 데이터가 없을 경우 기본값 설정
  const title = currentPageData?.title || '알 수 없는 단계'
  const process = currentPageData?.process || '0%'

  return (
    <div className="flex flex-col gap-y-3 px-5">
      <h1 className="heading-sm-semibold text-primary-500">{title}</h1>
      <div className="relative w-full">
        <div
          className="bg-primary-500 absolute z-10 h-[5px] rounded-full transition-all duration-300"
          style={{ width: customProcess ? customProcess : process }}
        />
        <div className="bg-background2 absolute h-[5px] w-full rounded-full" />
      </div>
    </div>
  )
}
