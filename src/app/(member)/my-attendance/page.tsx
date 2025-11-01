'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'

import { PenaltyPointIcon, RewardPointIcon } from '@/assets/svgComponents'
import MemberButton from '@/components/member/common/MemberButton'

import AttendanceItem from '@/components/member/attendance/AttendanceItem'
import { getPointsHistory } from '@/lib/member/client/attendance'

export default function MyAttendancePage() {
  const observerTarget = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
    queryKey: ['pointsHistory'],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getPointsHistory(pageParam, 10)
      return result.data
    },
    // allPages 파라미터 사용 - 현재까지 가져온 총 페이지 수로 다음 페이지 계산
    getNextPageParam: (lastPage, allPages) => {
      // records가 10개 미만이면 마지막 페이지 (불완전한 페이지)
      if (lastPage?.data?.records && lastPage?.data?.records?.length < 10) {
        return undefined
      }

      // isLastPage가 true면 마지막 페이지
      if (lastPage?.isLastPage === true) {
        return undefined
      }

      // 다음 페이지 번호 = 현재까지 가져온 페이지 수 + 1
      return allPages.length + 1
    },
    initialPageParam: 1,
  })

  useEffect(() => {
    if (!observerTarget.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        rootMargin: '100px',
      }
    )

    observer.observe(observerTarget.current)

    return () => {
      observer.disconnect()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center py-4">
        <p className="text-red-500">데이터를 불러오는데 실패했습니다.</p>
      </div>
    )
  }

  const firstPageData = data?.pages[0]?.data

  const uniqueRecords = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page?.data?.records || [])
        .map((record) => [`${record.date}${record.type}`, record]) || []
    ).values()
  )
  return (
    <>
      <section className="px-5">
        <section className="mt-[30px] flex flex-col items-center justify-center">
          <p className="body-lg-regular text-gray-500">{firstPageData?.name}님의 현재 상벌점</p>
          <p className="heading-3xl-semibold">{firstPageData?.totalPoints}</p>
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

        <section className="mt-[44px] flex flex-col gap-y-[24px]">
          {uniqueRecords.map((record) => (
            <AttendanceItem key={`${record.date}-${record.type}`} record={record} />
          ))}

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

          {!hasNextPage && uniqueRecords.length > 0 && (
            <div className="py-4 text-center">
              <p className="caption-sm-medium text-gray-500">더 이상 데이터가 없습니다</p>
            </div>
          )}
        </section>
      </section>

      <div className="h-[100px]" />

      <section className="desktop:absolute ios:fixed android:fixed bg-background1 bottom-0 z-10 flex w-full items-center justify-center bg-white px-5 pb-[36px]">
        <MemberButton
          onClick={() => {
            router.push('/ku-pick')
          }}
          buttonType={'button'}
          styleType={'primary'}
          styleSize={'lg'}
          styleStatus={'default'}
        >
          큐픽 제출하기
        </MemberButton>
      </section>
    </>
  )
}
