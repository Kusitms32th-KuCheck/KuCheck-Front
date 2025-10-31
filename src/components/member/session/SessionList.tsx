'use client'

import { useEffect, useRef } from 'react'
import { SessionDataType } from '@/types/member/session'
import SessionItem from '@/components/member/session/SessionItem'

interface SessionListProps {
  sessionList: SessionDataType[] | undefined
}

export default function SessionList({ sessionList }: SessionListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentSessionRef = useRef<HTMLDivElement>(null)

  /**
   * 날짜 문자열을 로컬 타임존 기준 Date 객체로 변환
   * "2025-10-31" 형식의 문자열을 파싱
   */
  const parseLocalDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  /**
   * 이번주 토요일 날짜 계산 (로컬 타임존 기준)
   */
  const getThisSaturdayDate = (): string => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const dayOfWeek = today.getDay()

    let daysUntilSaturday = 6 - dayOfWeek

    if (daysUntilSaturday < 0) {
      daysUntilSaturday += 7
    }

    const saturdayDate = new Date(year, month - 1, date + daysUntilSaturday)

    const satYear = saturdayDate.getFullYear()
    const satMonth = String(saturdayDate.getMonth() + 1).padStart(2, '0')
    const satDay = String(saturdayDate.getDate()).padStart(2, '0')

    return `${satYear}-${satMonth}-${satDay}`
  }

  /**
   * 세션 상태 판별 (이전/현재/이후)
   * @returns 'past' | 'current' | 'future'
   */
  const getSessionStatus = (sessionDate: string, thisSaturdayDate: string): 'past' | 'current' | 'future' => {
    const sessionDateObj = parseLocalDate(sessionDate)
    const saturdayDateObj = parseLocalDate(thisSaturdayDate)

    const nextDayObj = new Date(saturdayDateObj)
    nextDayObj.setDate(nextDayObj.getDate() + 1)

    // 세션이 이번주 토요일 이전이면 past
    if (sessionDateObj < saturdayDateObj) {
      return 'past'
    }

    // 세션이 이번주 토요일 당일이면 current
    if (sessionDateObj >= saturdayDateObj && sessionDateObj < nextDayObj) {
      return 'current'
    }

    // 세션이 이번주 토요일 이후면 future
    return 'future'
  }

  const thisSaturday = getThisSaturdayDate()

  /**
   * 페이지 진입 시 현재 세션이 1번째 보이도록 스크롤 설정
   */
  useEffect(() => {
    if (currentSessionRef.current && containerRef.current) {
      const scrollPosition = currentSessionRef.current.offsetTop
      containerRef.current.scrollTop = Math.max(0, scrollPosition)
    }
  }, [sessionList])

  return (
    <div ref={containerRef} className="mr-[27px] ml-[29px] flex h-screen flex-col gap-y-[10px] overflow-y-auto">
      {sessionList?.map((session, index) => {
        const isLast = index === sessionList.length - 1
        const sessionStatus = getSessionStatus(session.startDate, thisSaturday)

        return (
          <SessionItem
            currentSessionRef={sessionStatus === 'current' ? currentSessionRef : null}
            key={session.sessionId}
            {...session}
            isCurrent={sessionStatus === 'current'}
            isPast={sessionStatus === 'past'}
            isFuture={sessionStatus === 'future'}
            isLast={isLast}
          />
        )
      })}
    </div>
  )
}
