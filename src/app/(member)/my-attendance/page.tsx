'use client'

import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { PenaltyPointIcon, RewardPointIcon } from '@/assets/svgComponents'
import AttendanceItem from '@/components/member/attendance/AttendanceItem'
import { getPointsHistory } from '@/lib/member/client/attendance'

export default function MyAttendancePage() {
  const observerTarget = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
    queryKey: ['pointsHistory'],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getPointsHistory(pageParam, 20)
      return result.data
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.data?.records || lastPage.data.records.length < 20) {
        return undefined
      }
      if (lastPage?.isLastPage === true) {
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

  const getTotalPointsColor = (totalPoint: number | undefined): string => {
    if (!totalPoint) return ''
    if (totalPoint < -5) return 'text-sub-red'
    return 'text-gray-700'
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
      </div>
    )
  }

  if (error && (!data || data.pages.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-4 py-8">
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

  const firstPageData = data?.pages[0]?.data

  const allRecords = data?.pages.flatMap((page) => page?.data?.records || []) || []

  return (
    <>
      <section className="flex flex-1 flex-col px-5">
        <section className="mt-[15px] flex flex-col items-center justify-center">
          <p className="body-lg-regular text-gray-500">{firstPageData?.name}님의 현재 상벌점</p>
          <p className={`${getTotalPointsColor(firstPageData?.totalPoints)} heading-3xl-semibold`}>
            {firstPageData?.totalPoints}
          </p>
          <div className="mt-[11px] flex h-[40px] gap-x-[14px] rounded-[20px] border border-gray-100 bg-white px-4 py-2">
            <div className="flex items-center">
              <RewardPointIcon width={20} height={20} />
              <p className="body-lg-regular pl-[5px] text-gray-500">상점</p>
              <p className="body-lg-bold pl-1">{firstPageData?.plusPoints}</p>
            </div>
            <div className="border-l border-gray-200"></div>
            <div className="flex items-center">
              <PenaltyPointIcon width={20} height={20} />
              <p className="body-lg-regular pl-[5px] text-gray-500">벌점</p>
              <p className="body-lg-bold pl-1">{firstPageData?.minusPoints}</p>
            </div>
          </div>
        </section>

        <section className="mt-[44px] flex w-full flex-1 flex-col items-center justify-center gap-y-[24px]">
          {allRecords.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="body-lg-medium text-gray-500">아직 받은 상벌점이 없어요</p>
            </div>
          ) : (
            allRecords.map((record, index) => (
              <AttendanceItem key={`${record.date}-${record.type}-${index}`} record={record} />
            ))
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

          {error && allRecords.length > 0 && (
            <div className="flex flex-col items-center gap-y-2 py-4">
              <p className="text-sm text-red-500">추가 데이터를 불러올 수 없습니다</p>
              <button onClick={() => fetchNextPage()} className="text-sm text-blue-500 hover:text-blue-600">
                다시 시도
              </button>
            </div>
          )}

          {!hasNextPage && allRecords.length > 0 && !error && (
            <div className="py-2 text-center">
              <p className="caption-sm-medium text-gray-500">더 이상 데이터가 없습니다</p>
            </div>
          )}
        </section>
      </section>

      <div className="h-[100px]" />
    </>
  )
}
