import { AbsenceDataType } from '@/types/member/absence'

export const postAbsence = async (absenceData: AbsenceDataType | undefined) => {
  try {
    const response = await fetch('/api/absence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(absenceData),
      credentials: 'include', // 쿠키 자동 포함 (httpOnly)
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
