'use client'
import { useState } from 'react'
import ManagerModal from '@/components/manager/common/ManagerModal'
import { useRouter } from 'next/navigation'

export default function FocusSessionCard() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="mx-auto w-full max-w-[1260px] rounded-[12px] bg-white">
      <div className="flex h-[116px] items-start justify-between border-b border-gray-100">
        <div className="flex flex-col gap-3 px-[31px] py-6">
          <p className="heading-1xl-semibold">집중협업시간</p>
          <p className="body-lg-medium text-gray-500">장소 마루180 이벤트홀 지하 1층 일시 9/22 13:00~ 17:00</p>
        </div>
        <div className="px-[31px] py-6">
          <button
            onClick={() => setOpen(true)}
            className={'= body-2xl-semibold rounded-[12px] bg-gray-700 px-[15.5] py-3 text-white'}
          >
            출석체크 종료하기
          </button>
          <ManagerModal
            open={open}
            message="출석을 종료하시겠습니까?"
            confirmLabel="종료하기"
            onCancel={() => setOpen(false)}
            onConfirm={() => {
              setOpen(false)
              interface NavWindow extends Window {
                __allowNav?: boolean
              }
              ;(window as NavWindow).__allowNav = true
              router.push('/attendance')
            }}
          />
        </div>
      </div>
      <div className="flex h-[120px] items-center justify-center">
        <Stat label="출석" value="50" highlight />
        <div className="h-[80px] border border-gray-100"></div>
        <Stat label="조퇴" value="0" />
        <div className="h-[80px] border border-gray-100"></div>
        <Stat label="지각" value="4" />
        <div className="h-[80px] border border-gray-100"></div>
        <Stat label="결석" value="3" />
      </div>
    </div>
  )
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex w-[192px] flex-col items-center">
      <span className="body-lg-regular text-gray-500">{label}</span>
      <span className={`heading-3xl-medium font-semibold ${highlight ? 'text-primary-500' : 'text-gray-500'}`}>
        {value}
      </span>
    </div>
  )
}
