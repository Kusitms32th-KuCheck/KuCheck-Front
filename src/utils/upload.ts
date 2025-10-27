import { FileInfoType } from '@/types/common'

/**
 * 파일 크기를 읽기 쉬운 형태로 변환
 */
export const formatFileSize = (bytes: number | undefined): string => {
  if (bytes === 0 || bytes === undefined) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 고유 ID 생성
 */
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

/**
 * File 을 FileInfoType 으로 변환
 */
export const convertFileToFileInfo = (file: File): Promise<FileInfoType> => {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      resolve({
        id: generateId(),
        name: file.name,
        size: file.size,
        url: reader.result as string,
      })
    }

    reader.readAsDataURL(file)
  })
}

/**
 * 파일 유효성 검사 함수
 */
export const isValidFile = (file: File): { valid: boolean; error?: string } => {
  // 허용 확장자
  const allowedExtensions = ['png', 'jpeg', 'jpg', 'pdf', 'heic']
  const fileExtension = file.name.split('.').pop()?.toLowerCase()

  // 1️⃣ 확장자 검증
  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    return {
      valid: false,
      error: `허용되지 않는 파일 형식입니다. (png, jpeg, jpg, pdf, heic만 가능)`,
    }
  }

  // 2️⃣ 파일 크기 검증 (10MB = 10 * 1024 * 1024 bytes)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `파일 크기가 너무 큽니다. (최대 10MB, 현재 ${(file.size / 1024 / 1024).toFixed(2)}MB)`,
    }
  }

  return { valid: true }
}
