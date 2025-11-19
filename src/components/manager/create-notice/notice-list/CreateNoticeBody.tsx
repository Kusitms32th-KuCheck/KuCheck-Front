'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { NoticeSettingIcon } from '@/assets/svgComponents/manager'
import CreateNoticeDropDown from '../category/CreateNoticeDropDown'
import { getClientNoticeList, deleteClientNoticeManage } from '@/lib/manager/client/notice'
import { NoticeListItem } from '@/types/manager/notice/type'
import { getCategoryClass } from '@/utils/manager/notice'
import { useRouter } from 'next/navigation'

export default function CreateNoticeBody() {
  const [notices, setNotices] = useState<NoticeListItem[]>([])
  const [selectedSetting, setSelectedSetting] = useState('')
  const [page, setPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const gridTemplate = '67px 613px 120px 199px 185px 145px 124px 120px 35px'
  const gridHeaderTemplate = '613px 120px 199px 185px 145px 124px 155px'
  const router = useRouter()

  const fetchNotices = useCallback(async (pageNum: number) => {
    setLoading(true)
    const res = await getClientNoticeList(pageNum, 20)
    if (res.success && res.data) {
      setNotices((prev) => [...prev, ...(res?.data?.data ?? [])])
      setIsLastPage(res.data.isLastPage)
    } else {
      console.error('❌ Error fetching notice list:', res.error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchNotices(page)
  }, [page, fetchNotices])

  useEffect(() => {
    if (isLastPage) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !isLastPage) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 0.5 }
    )
    const currentRef = observerRef.current
    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [loading, isLastPage])

  // 삭제 핸들러
  const handleDelete = async (noticeId: number) => {
    const res = await deleteClientNoticeManage(noticeId)
    if (res.success) {
      setNotices((prev) => prev.filter((n) => n.id !== noticeId))
    } else {
      alert('삭제에 실패했습니다.')
    }
  }
  const handleEdit = async (noticeId: number) => {
    router.push(`/create-notice/add?isEditMode=true&noticeId=${noticeId}`)
  }

  return (
    <div className="mx-6 rounded-t-[12px] bg-white">
      <div className="border-b border-gray-200 px-6 py-[14px]">
        <p className="body-md-regular text-gray-500">
          총 <span className="body-md-semibold text-primary-500">{notices.length}</span>개
        </p>
      </div>
      <div className="overflow-x-auto">
        <div className="grid items-center py-2 pl-[91px]" style={{ gridTemplateColumns: gridHeaderTemplate }}>
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
            style={{ gridTemplateColumns: gridTemplate, minWidth: '1640px', cursor: 'pointer' }}
            onClick={() => router.push(`/create-notice/detail/${n.id}`)}
          >
            <p className="body-lg-regular text-gray-500">{idx + 1}</p>
            <div className="flex flex-col gap-3">
              <p className="body-lg-semibold text-gray-800">{n.title}</p>
              <p className="body-sm-medium mr-12 line-clamp-2 text-gray-400">{n.content.replace(/<[^>]+>/g, '')}</p>
            </div>
            <p className="body-lg-regular text-gray-800">{n.authorName}</p>
            <div className="mr-[52px] flex flex-wrap gap-1">
              {n.categories.map((cat) => (
                <p
                  key={cat.color}
                  className={`w-fit rounded-[4px] px-2 py-1 text-sm font-bold ${getCategoryClass(cat.color)}`}
                >
                  {cat.name}
                </p>
              ))}
            </div>
            <p>{n.createdAt}</p>
            <p>{n.status === 'PUBLISHED' && '공개'}</p>
            <p>20</p>
            <div className="relative bottom-2">
              {n.imageUrls.length > 0 && (
                <img className="h-[100px] w-[100px] rounded-[8px] object-cover" src={n.imageUrls[0]?.url} alt="image" />
              )}
            </div>
            <div onClick={(e) => e.stopPropagation()} className="flex items-start justify-end">
              <CreateNoticeDropDown
                trigger={
                  <button className="cursor-pointer">
                    <NoticeSettingIcon width={28} height={35} />
                  </button>
                }
                options={[
                  { label: '수정', value: '수정' },
                  { label: '삭제', value: '삭제' },
                ]}
                selected={selectedSetting}
                onChange={(value) => {
                  setSelectedSetting(value)
                  if (value === '삭제') handleDelete(n.id)
                  else if (value === '수정') handleEdit(n.id)
                }}
              />
            </div>
          </div>
        ))}
        {!isLastPage && <div ref={observerRef} style={{ height: 1 }} />}
        {loading && <div className="py-4 text-center text-gray-400">로딩 중...</div>}
      </div>
    </div>
  )
}
