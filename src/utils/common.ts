// 전화번호 포맷팅 함수
import { PartType } from '@/types/common'

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
 * 한국 시간대(KST, UTC+9) 기준
 */
export const convertISODateTimeToTime = (isoDateTime: string): string => {
  if (!isoDateTime) return ''

  try {
    const date = new Date(isoDateTime)

    // toLocaleString을 사용하여 한국 시간대로 변환
    const koreaTime = date.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    return koreaTime
  } catch (error) {
    console.error('Invalid ISO datetime:', error)
    return ''
  }
}

/**
 * YYYY-MM-DD 형식을 MM/DD로 변환
 * @param dateString - "2025-11-11" 형식의 날짜 문자열
 * @returns "11/11" 형식의 문자열
 */
export const formatToMonthDay = (dateString: string): string => {
  if (!dateString) return ''

  const [, month, day] = dateString.split('-')
  return `${month}/${day}`
}

/**
 * ISO 8601 타임스탬프에서 MM/DD 형식으로 추출
 * @param timestamp - ISO 8601 형식의 타임스탬프 (예: 2025-10-28T11:36:11.668882)
 * @returns MM/DD 형식의 문자열 (예: 10/28)
 */
export function formatMonthDay(timestamp: string): string {
  const date = new Date(timestamp)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}/${day}`
}

/**
 * ISO 8601 형식의 타임스탬프를 "M/D HH:mm" 형식으로 변환
 * @param isoString - ISO 8601 형식의 날짜 문자열 (예: "2025-11-01T03:18:38.482258")
 * @returns 포맷된 날짜 문자열 (예: "11/1 03:18")
 */
export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString)

  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${month}/${day} ${hours}:${minutes}`
}

export const changePartEnumToContent = (part: PartType) => {
  switch (part) {
    case 'BACKEND':
      return '백엔드'
    case 'DESIGN':
      return '디자인'
    case 'FRONTEND':
      return '프론트엔드'
    default:
      return '기획'
  }
}
