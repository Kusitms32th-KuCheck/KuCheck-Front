// 전화번호 포맷팅 함수
export const formatPhoneNumber = (value: string) => {
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, '')

  // 길이에 따라 포맷팅
  if (numbers.length <= 3) {
    return numbers
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
  } else if (numbers.length <= 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
  } else {
    // 11자리 초과시 11자리까지만
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
  }
}

/**
 * input 에 입력된 시간을 ISO 8601 형식으로 변환하는 함수
 * 예: "17:47" → "2025-10-22T17:47:00.000Z"
 */
export const convertTimeToISODateTime = (timeInput: string): string => {
  if (!timeInput) return ''

  const now = new Date()
  const [hours, minutes] = timeInput.split(':')

  // 오늘 날짜에 입력된 시간을 설정
  const dateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes), 0, 0)

  return dateTime.toISOString()
}

/**
 * ISO 8601 형식의 DateTime을 time input 형식으로 변환 (오전/오후 포함)
 * 예: "2025-10-22T17:47:00.000Z" → "오후 5:47"
 */
export const convertISODateTimeToTime = (isoDateTime: string): string => {
  if (!isoDateTime) return ''

  try {
    const date = new Date(isoDateTime)
    const hours = date.getUTCHours()
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')

    // 오전/오후 구분
    const period = hours >= 12 ? '오후' : '오전'

    // 12시간 형식으로 변환
    const displayHours = hours % 12 === 0 ? 12 : hours % 12

    return `${period} ${displayHours}:${minutes}`
  } catch (error) {
    console.error('Invalid ISO datetime:', error)
    return ''
  }
}
