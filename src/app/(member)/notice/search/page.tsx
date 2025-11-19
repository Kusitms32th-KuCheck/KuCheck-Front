'use client'

import { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getNoticeSearch } from '@/lib/member/client/notice'

import NoticeSearchHeader from '@/components/member/notice/NoticeSearchHeader'
import NoticeCard from '@/components/member/notice/NoticeCard'

export default function NoticeSearchPage() {
  const [searchValue, setSearchValue] = useState<string>('')

  const observerTarget = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
    queryKey: ['notices', searchValue],
    queryFn: async ({ pageParam = 1 }) => {
      console.log('API 요청:', { pageParam, searchValue }) // 디버깅용
      const result = await getNoticeSearch(pageParam, 20, searchValue)
      console.log('API 응답:', result)
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
    enabled: searchValue.length > 0,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
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

  if (error && (!data || data.pages.length === 0) && searchValue !== '') {
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
    <main className="flex min-h-screen flex-col desktop:w-[375px] bg-white">
      <NoticeSearchHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="px-5 mt-[148px] flex flex-1 flex-col">
        <section className="flex w-full flex-1 flex-col gap-y-[24px]">
          {/* 검색어 미입력 상태 */}
          {searchValue === '' ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="body-lg-medium text-gray-400">검색어를 입력해 주세요</p>
            </div>
          ) : /* 검색어 입력했는데 결과 없음 */ allNoticeData.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-y-2">
              <p className="body-lg-medium text-gray-400 text-center">검색 결과가 없어요 <br/>띄어쓰기에 유의해 다시 검색해 보세요</p>
            </div>
          ) : /* 검색 결과 있음 */ (
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

          {searchValue !== '' && !hasNextPage && allNoticeData.length > 0 && !error && (
            <div className="py-2 text-center">
              <p className="caption-sm-medium text-gray-500">더 이상 데이터가 없습니다</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
