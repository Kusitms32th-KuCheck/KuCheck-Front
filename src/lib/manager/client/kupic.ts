import { KupicData } from '@/types/manager/check-document/types'

export const postKupicClient = async (kupicData: KupicData | undefined) => {
  if (!kupicData) {
    return { success: false, error: 'Kupic data is missing' }
  }

  const queryParams = new URLSearchParams({
    kupickId: kupicData.kupickId.toString(),
    approval: kupicData.approval.toString(),
  }).toString()

  const url = `/api/kupick/manage/approval?${queryParams}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.error || 'Failed to submit' }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
