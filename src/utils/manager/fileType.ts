/**
 * 파일 URL에서 확장자를 추출하여 파일 타입을 구분하는 유틸리티 함수들
 */

/**
 * URL에서 파일 확장자를 추출하는 함수
 */
export const getFileExtension = (url: string): string => {
  if (!url) return ''

  try {
    // URL에서 파일명 부분 추출
    const urlPath = new URL(url).pathname
    const fileName = urlPath.split('/').pop() || ''
    const extension = fileName.split('.').pop()?.toLowerCase()

    return extension || ''
  } catch {
    // URL 파싱 실패 시 빈 문자열 반환
    return ''
  }
}

/**
 * 파일이 이미지인지 확인하는 함수
 */
export const isImageFile = (url: string): boolean => {
  const extension = getFileExtension(url)
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp']
  return imageExtensions.includes(extension)
}

/**
 * 파일이 PDF인지 확인하는 함수
 */
export const isPdfFile = (url: string): boolean => {
  const extension = getFileExtension(url)
  return extension === 'pdf'
}

/**
 * 파일 타입을 구분하는 함수
 */
export const getFileType = (url: string): 'image' | 'pdf' | 'other' => {
  if (isImageFile(url)) return 'image'
  if (isPdfFile(url)) return 'pdf'
  return 'other'
}
