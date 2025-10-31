import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { CheckDocumentRecord } from '@/types/manager/check-document/types'

export const getKupicServer = async (year?: number, month?: number): Promise<ApiCallResult<CheckDocumentRecord[]>> => {
  try {
    const now = new Date()
    const y = year ?? now.getFullYear()
    const m = month ?? now.getMonth() + 1
    const endpoint = `/v1/kupick/manage/update?year=${y}&month=${m}`

    const { data, error } = await apiCallServer<CheckDocumentRecord[]>(endpoint, {
      method: 'GET',
    })

    if (error) return { success: false, error }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to fetch kupick records:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
