// store/debugStore.ts
import { create } from 'zustand'

export interface DebugLog {
  id: string
  message: string
  type: 'log' | 'error' | 'warn' | 'info'
  timestamp: number
  details?: string| Record<string, any> // ✅ 객체도 허용
}

interface DebugStore {
  logs: DebugLog[]
  isDebugOpen: boolean
  addLog: (message: string, type: 'log' | 'error' | 'warn' | 'info', details?: string) => void
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
          details,
        },
        ...state.logs,
      ].slice(0, 50), // 최대 50개 로그만 유지
    })),
  clearLogs: () => set({ logs: [] }),
  toggleDebug: () => set((state) => ({ isDebugOpen: !state.isDebugOpen })),
}))
