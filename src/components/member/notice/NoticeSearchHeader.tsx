'use client'

import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftBlackIcon } from '@/assets/svgComponents'
import { XCircleIcon } from '@/assets/svgComponents/member'

interface NoticeSearchHeaderProps {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string >>
}

export default function NoticeSearchHeader({searchValue, setSearchValue}: NoticeSearchHeaderProps) {
  const router = useRouter()
  return (
    <header
      className={'desktop:w-[375px] fixed top-0 z-50 w-full bg-white'}
      style={{ paddingTop: '54px' }}
    >
      <div className={'bg-white relative flex h-[62px] items-center px-[7px]'}>
        <ChevronLeftBlackIcon onClick={() => router.back()} width={36} height={36} className="cursor-pointer" />
        <div className="flex items-center w-full justify-between h-[40px] px-[11px] py-2 bg-gray-100 rounded-[8px] mr-5">
          <input onChange={(e) => {setSearchValue(e.target.value)}}  className="w-full outline-none body-lg-medium"></input>
          <XCircleIcon width={19} height={19} />
        </div>
      </div>
    </header>

  )
}
