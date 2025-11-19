'use client'

import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getNotice } from '@/lib/member/client/notice'
import NoticeCard from '@/components/member/notice/NoticeCard'
import { useNoticeStore } from '@/store/member/noticeStore'

export default function NoticeList() {
  const selectedCategoryId = useNoticeStore((state) => state.selectedCategoryId)
  const observerTarget = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
    queryKey: ['notices', selectedCategoryId],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getNotice(pageParam, 20, selectedCategoryId)
      console.log('result', result)
      return result.data
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.data || lastPage.data.data.length < 20) {
        return undefined
      }
      if (lastPage?.data.isLastPage === true) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
    retry: 1,
    throwOnError: false,
  })

  useEffect(() => {
    if (!observerTarget.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && !error) {
          fetchNextPage()
        }
      },
      {
        rootMargin: '100px',
      }
    )

    observer.observe(observerTarget.current)

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, error])

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
      </div>
    )
  }

  if (error && (!data || data.pages.length === 0)) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 py-8">
        <p className="text-red-500">데이터를 불러오는데 실패했습니다.</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    )
  }

  const allNoticeData = data?.pages.flatMap((page) => page?.data?.data ?? []) ?? []
  return (
    <section className="flex w-full flex-1 flex-col mt-[28px]">
      {allNoticeData.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="body-lg-medium text-gray-500">아직 작성된 공지사항이 없어요</p>
        </div>
      ) : (
        allNoticeData.map((notice) => {
          return (
            <div key={`${notice?.id} ${notice?.title}`} className="w-full">
              <NoticeCard {...notice} />
            </div>
          )
        })
      )}

      <div
        ref={observerTarget}
        className="h-4 w-full"
        aria-label="load more"
        style={{ backgroundColor: 'transparent' }}
      >
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
          </div>
        )}
      </div>

      {error && allNoticeData.length > 0 && (
        <div className="flex flex-col items-center gap-y-2 py-4">
          <p className="text-sm text-red-500">추가 데이터를 불러올 수 없습니다</p>
          <button onClick={() => fetchNextPage()} className="text-sm text-blue-500 hover:text-blue-600">
            다시 시도
          </button>
        </div>
      )}

      {!hasNextPage && allNoticeData.length > 0 && !error && (
        <div className="py-2 text-center">
          <p className="caption-sm-medium text-gray-500">더 이상 데이터가 없습니다</p>
        </div>
      )}
    </section>
  )
}
