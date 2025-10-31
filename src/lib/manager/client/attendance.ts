import { AttendanceScanResponseType, AttendanceSummaryType } from '@/types/manager/check-document/types'
import { ApiCallResult } from '@/types/common'

// 출석 스캔 API 호출 함수
export const postClientAttendanceScan = async (token: string): Promise<ApiCallResult<AttendanceScanResponseType>> => {
  try {
    const response = await fetch('/api/attendance/manage/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token }),
    })

    const json = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: json.error || `HTTP ${response.status}`,
      }
    }

    const data: AttendanceScanResponseType = json.data

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// 주간 출석 요약 API 호출 함수
export const getClientAttendanceSummary = async (): Promise<ApiCallResult<AttendanceSummaryType>> => {
  try {
    const response = await fetch('/api/attendance/manage/weekly-summary', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    const json = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: json.error || `HTTP ${response.status}`,
      }
    }

    const data = json.data

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
