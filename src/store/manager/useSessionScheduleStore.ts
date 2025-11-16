import { create } from 'zustand'
import { SessionScheduleData } from '@/types/manager/session/type'

interface SessionScheduleStore {
  sessions: SessionScheduleData[]
  sessionDates: Record<number, number[]> // 월별 세션 날짜들 { 11: [13, 20, 27], 12: [4, 11] }

  // 액션들
  setSessions: (sessions: SessionScheduleData[]) => void
  setSessionDates: (sessionDates: Record<number, number[]>) => void
  clearSessions: () => void

  // 헬퍼 함수들
  getSessionDatesByMonth: (month: number) => number[]
  getAllSessionDates: () => Record<number, number[]>
}

export const useSessionScheduleStore = create<SessionScheduleStore>((set, get) => ({
  sessions: [],
  sessionDates: {},

  setSessions: (sessions) => {
    // 세션 데이터에서 월별 날짜 추출
    const sessionDates: Record<number, number[]> = {}

    sessions.forEach((session) => {
      const date = new Date(session.startDate)
      const month = date.getMonth() + 1 // 0 기반이므로 +1
      const day = date.getDate()

      if (!sessionDates[month]) {
        sessionDates[month] = []
      }

      if (!sessionDates[month].includes(day)) {
        sessionDates[month].push(day)
      }
    })

    // 각 월의 날짜들을 오름차순으로 정렬
    Object.keys(sessionDates).forEach((month) => {
      sessionDates[parseInt(month)].sort((a, b) => a - b)
    })

    set({ sessions, sessionDates })
  },

  setSessionDates: (sessionDates) => set({ sessionDates }),

  clearSessions: () => set({ sessions: [], sessionDates: {} }),

  getSessionDatesByMonth: (month) => {
    const state = get()
    return state.sessionDates[month] || []
  },

  getAllSessionDates: () => {
    const state = get()
    return state.sessionDates
  },
}))
