import { create } from 'zustand'
import type { ApiCallResult } from '@/types/common'
import type { AttendanceScanResponseType } from '@/types/manager/check-document/types'

// API 전체 응답 그대로 저장
interface AttendanceState {
  latestScanResult: ApiCallResult<AttendanceScanResponseType> | null
  setLatestScanResult: (result: ApiCallResult<AttendanceScanResponseType> | null) => void
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  latestScanResult: null,
  setLatestScanResult: (result) => set({ latestScanResult: result }),
}))
