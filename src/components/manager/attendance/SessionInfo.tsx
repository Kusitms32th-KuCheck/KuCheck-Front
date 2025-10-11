'use client'
import React from 'react'
import ManagerButton from '../common/ManagerButton'

interface SessionInfoProps {
  location: string
  time: string
}

export default function SessionInfo({ location, time }: SessionInfoProps) {
  return (
    <div className="rounded-[12px] bg-white px-[30px] py-[24px]">
      <div className="flex h-[62px] w-full items-start justify-between">
        <p className="heading-1xl-semibold">집중협업시간</p>
        <ManagerButton
          customClassName="w-[160px]"
          styleSize="md"
          onClick={() => console.log('출석체크 시작하기 클릭됨')}
        >
          출석체크 시작하기
        </ManagerButton>
      </div>
      <div className="body-lg-medium text-gray-500">
        <div className="flex h-[62px] w-full flex-col items-start justify-between py-1">
          <div className="flex items-center gap-x-3">
            <p>장소</p>
            <p>{location}</p>
          </div>
          <div className="flex items-center gap-x-3">
            <p>일시</p>
            <p>{time}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
