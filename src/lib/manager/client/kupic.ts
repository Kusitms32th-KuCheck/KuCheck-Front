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

export const getKupicClient = async (year?: number, month?: number) => {
  const queryParams = new URLSearchParams()
  if (year) queryParams.append('year', year.toString())
  if (month) queryParams.append('month', month.toString())

  const url = `/api/kupick/manage/update?${queryParams.toString()}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.error || 'Failed to fetch' }
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
