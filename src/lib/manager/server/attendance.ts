import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { AttendanceScanResponseType } from '@/types/manager/check-document/types'

export const postServerAttendanceScan = async (): Promise<ApiCallResult<AttendanceScanResponseType>> => {
  try {
    const { data, error } = await apiCallServer('/v1/attendance/scan', {
      method: 'POST',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to fetch session absence:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
