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

export const getKupicGroupedMonths = async (
  year: number,
  months: number[]
): Promise<ApiCallResult<Record<number, CheckDocumentRecord[]>>> => {
  try {
    const calls = months.map((m) => {
      const endpoint = `/v1/kupick/manage/update?year=${year}&month=${m}`
      return apiCallServer<CheckDocumentRecord[]>(endpoint, { method: 'GET' }).then((r) => ({ month: m, result: r }))
    })

    const results = await Promise.all(calls)
    const grouped: Record<number, CheckDocumentRecord[]> = {}

    for (const { month, result } of results) {
      if (result.error) {
        return { success: false, error: result.error }
      }

      grouped[month] = result.data ?? []
    }

    return { success: true, data: grouped }
  } catch (error) {
    console.error('Failed to fetch grouped kupic records:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
