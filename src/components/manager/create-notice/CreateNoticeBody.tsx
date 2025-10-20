'use client'

import { useMemo, useState } from 'react'
import { NoticeImageIcon, NoticeSettingIcon } from '@/assets/svgComponents/manager'
import Dropdown from '../common/ManagerdropDown'
type Notice = {
  id: number
  title: string
  owner: string
  category: string
  createdAt: string
  status: string
  views: number | string
}

const mockNotices: Notice[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: [
    '아이디어 발표 & 커피챗 세션 ☕',
    '1차 스프린트 안내',
    '큐톡데이 (10/11) ☕',
    '32기 큐시줌 × 네이버 클라우드 플랫폼(NCP) 크레딧 신청 가이드라인',
    '집중 협업 (9/6) 세션 공지 ⭐',
    '밋업 프로젝트 팀 빌딩 공지',
  ][i % 6],
  owner: '큐밀리',
  category: i % 2 === 0 ? '홍보' : '밋업프로젝트',
  createdAt: '2025/10/02 13:00',
  status: i === 1 ? '임시저장' : i === 0 ? '예약' : '공개',
  views: i === 0 ? '-' : 60 + i,
}))

export default function CreateNoticeBody() {
  const notices = useMemo(() => mockNotices, [])
  const [selectedSetting, setSelectedSetting] = useState('')
  const gridTemplate = '67px 613px 120px 199px 185px 145px 124px 120px 35px'

  const gridHeaderTemplate = '613px 120px 199px 185px 145px 124px 155px'

  return (
    <div className="mx-6 h-[100vh] rounded-t-[12px] bg-white">
      <div className="border-b border-gray-200 px-6 py-[14px]">
        <p className="body-md-regular text-gray-500">
          총 <span className="body-md-semibold text-primary-500">{notices.length}</span>개
        </p>
      </div>

      <div className="overflow-x-auto">
        <div
          className="grid items-center py-2 pl-[91px]"
          style={{ gridTemplateColumns: gridHeaderTemplate, minWidth: '1608px' }}
        >
          <p className="body-lg-semibold text-start text-gray-500">공지 제목</p>
          <p className="body-lg-semibold text-start text-gray-500">담당자</p>
          <p className="body-lg-semibold text-start text-gray-500">카테고리</p>
          <p className="body-lg-semibold text-start text-gray-500">작성일</p>
          <p className="body-lg-semibold text-start text-gray-500">상태</p>
          <p className="body-lg-semibold text-start text-gray-500">열람자 수</p>
          <p className="body-lg-semibold text-start text-gray-500">사진</p>
        </div>

        {notices.map((n, idx) => (
          <div
            key={n.id}
            className={`group body-lg-regular grid h-[124px] items-start border-b border-gray-100 py-5 pl-6 text-gray-800 ${
              idx % 2 === 1 ? 'bg-background1' : ''
            }`}
            style={{ gridTemplateColumns: gridTemplate, minWidth: '1640px' }}
          >
            <p className="body-lg-regular text-gray-500">{idx + 1}</p>
            <div className="flex flex-col gap-3">
              <p className="body-lg-semibold text-gray-800">{n.title}</p>
              <div>
                <p className="body-sm-medium text-gray-400">장소 마루 180 이벤트홀 지하1층</p>
                <p className="body-sm-medium text-gray-400">일시 9월 27일(토) 12:00 ~ 17:00</p>
              </div>
            </div>
            <p className="body-lg-regular text-gray-800">{n.owner}</p>
            <p className="">
              <span className="rounded-md bg-amber-100 px-2 py-1 text-sm text-amber-700">{n.category}</span>
            </p>
            <p>{n.createdAt}</p>
            <p>{n.status}</p>
            <p>{n.views}</p>
            <div className="relative bottom-2">
              <NoticeImageIcon width={100} height={100} />
            </div>
            <Dropdown
              unstyled
              trigger={
                <button className="cursor-pointer">
                  <NoticeSettingIcon width={28} height={35} />
                </button>
              }
              size="md"
              options={[
                { label: '수정', value: '수정' },
                { label: '삭제', value: '삭제' },
              ]}
              selected={selectedSetting}
              onChange={setSelectedSetting}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
