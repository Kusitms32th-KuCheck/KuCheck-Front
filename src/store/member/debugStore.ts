// store/member/debugStore.ts
import { create } from 'zustand'

export interface DebugLog {
  id: string
  message: string
  type: 'log' | 'error' | 'warn' | 'info'
  timestamp: number
  details?: string
}

interface DebugStore {
  logs: DebugLog[]
  isDebugOpen: boolean
  // ✅ details 파라미터 타입 수정
  addLog: (
    message: string,
    type: 'log' | 'error' | 'warn' | 'info',
    details?: string | Record<string, any>
  ) => void
  clearLogs: () => void
  toggleDebug: () => void
}

export const useDebugStore = create<DebugStore>((set) => ({
  logs: [],
  isDebugOpen: false,
  addLog: (message, type, details) =>
    set((state) => ({
      logs: [
        {
          id: `${Date.now()}-${Math.random()}`,
          message,
          type,
          timestamp: Date.now(),
          // ✅ 객체를 JSON 문자열로 변환
          details:
            typeof details === 'string'
              ? details
              : details
                ? JSON.stringify(details, null, 2)
                : undefined,
        },
        ...state.logs,
      ].slice(0, 50),
    })),
  clearLogs: () => set({ logs: [] }),
  toggleDebug: () => set((state) => ({ isDebugOpen: !state.isDebugOpen })),
}))
