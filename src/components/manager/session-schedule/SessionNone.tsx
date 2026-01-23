'use client'
import { useRouter } from 'next/navigation'
import { SessionNoneIcon } from '@/assets/svgComponents/manager'
import SessionHeader from './session-table/SessionHeader'

export default function SessionNone() {
  const router = useRouter()

  const handleAdd = () => {
    router.push('/session-schedule/add')
  }

  return (
    <>
      <SessionHeader editNone={true}/>
      <div className="mx-6 mt-7 mb-6 flex h-full flex-col items-center justify-center gap-[50px] rounded-[12px] bg-white">
        <SessionNoneIcon width={175} height={182} />
        <div className="flex flex-col items-center gap-[30px]">
          <div className="flex flex-col items-center gap-[12px]">
            <p className="heading-lg-semibold">세션 일정이 아직 등록되지 않았어요</p>
            <p className="body-lg-regular">아래 버튼을 눌러 세션을 등록해주세요</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-primary-500 body-2xl-semibold h-[52px] w-[160px] cursor-pointer rounded-[12px] text-white"
          >
            등록하기
          </button>
        </div>
      </div>
    </>
  )
}
