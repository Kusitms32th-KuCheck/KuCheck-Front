// hooks/useFileUpload.ts
'use client'

import { useState, useCallback } from 'react'
import { FileInfoType } from '@/types/common'
import { ImageOptimizeOptions, optimizeImage } from '@/utils/imageOptimizer'

export interface UploadOptions {
  preSignedUrl: string
  onProgress?: (progress: number) => void
  onError?: (error: string) => void
  imageOptimizeOptions?: ImageOptimizeOptions
}

export interface UploadResult {
  success: boolean
  key?: string
  preSignedUrl?: string
  error?: string
  originalSize?: number
  optimizedSize?: number
  compressionRatio?: number
  originalFileName?: string
  uploadedFileName?: string
  format?: string
}

const isImageFile = (fileName: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'heic', 'avif']
  const extension = fileName.split('.').pop()?.toLowerCase() || ''
  return imageExtensions.includes(extension)
}

const isDocumentFile = (fileName: string): boolean => {
  const documentExtensions = [
    'pdf', 'hwp', 'hwpx', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'odt', 'ods', 'odp',
  ]
  const extension = fileName.split('.').pop()?.toLowerCase() || ''
  return documentExtensions.includes(extension)
}

const changeFileExtensionToWebp = (fileName: string): string => {
  const nameParts = fileName.split('.')
  nameParts.pop()
  return `${nameParts.join('.')}.webp`
}

/**
 * data URL을 Blob으로 변환 (iOS Safari 호환성 개선)
 * "data:image/jpeg;base64,..." 형식의 문자열을 Blob으로 변환
 */
const dataUrlToBlob = (dataUrl: string): Blob => {
  try {
    const [header, data] = dataUrl.split(',')

    // MIME 타입 추출: "data:image/jpeg;base64" -> "image/jpeg"
    const mimeMatch = header.match(/:(.*?);/)
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg'

    // base64 문자열을 바이너리로 변환
    const binaryString = atob(data)
    const bytes = new Uint8Array(binaryString.length)

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    return new Blob([bytes], { type: mimeType })
  } catch (error) {
    console.error('❌ dataUrlToBlob 변환 실패:', error)
    throw new Error('이미지 처리 중 오류 발생')
  }
}

/**
 * FileInfoType에서 File 객체로 변환 (url만 사용)
 */
const createFileFromFileInfo = (fileInfo: FileInfoType): File => {
  try {
    if (!fileInfo.url) {
      throw new Error('파일 URL이 없습니다')
    }

    let fileBlob: Blob

    // URL이 data URL 형식인 경우
    if (typeof fileInfo.url === 'string' && fileInfo.url.startsWith('data:')) {
      fileBlob = dataUrlToBlob(fileInfo.url)
    }
    // URL이 ArrayBuffer인 경우
    else if (fileInfo.url instanceof ArrayBuffer) {
      fileBlob = new Blob([fileInfo.url])
    }
    // 기타 형식
    else {
      throw new Error('지원하지 않는 파일 형식입니다')
    }

    // MIME 타입이 없으면 파일명에서 추출
    const mimeType = fileBlob.type || 'image/jpeg'

    return new File([fileBlob], fileInfo.name, { type: mimeType })
  } catch (error) {
    console.error('❌ File 생성 실패:', error)
    throw error
  }
}

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  /**
   * 단일 파일 업로드 (iOS 호환성 개선)
   * 이미지는 자동 최적화, 문서파일은 원본 유지
   */
  const uploadFile = useCallback(
    async (fileInfo: FileInfoType, options: UploadOptions): Promise<UploadResult> => {
      const { preSignedUrl, onProgress, onError, imageOptimizeOptions } = options

      try {
        setIsLoading(true)
        setUploadProgress(0)

        // 1️⃣ FileInfoType에서 File 객체로 변환
        const file = createFileFromFileInfo(fileInfo)
        let uploadBlob: Blob = file
        let uploadFileName = fileInfo.name
        const originalSize = file.size
        let optimizedSize = file.size
        let compressionRatio = 0
        let format = 'original'

        // 2️⃣ 이미지 파일이고 문서파일이 아니면 최적화 시도
        if (isImageFile(fileInfo.name) && !isDocumentFile(fileInfo.name)) {
          try {
            // iOS Safari WebP 지원 여부 확인
            const isWebPSupported = () => {
              try {
                const canvas = document.createElement('canvas')
                canvas.width = 1
                canvas.height = 1
                return canvas.toDataURL('image/webp').includes('image/webp')
              } catch {
                return false
              }
            }

            const shouldConvertToWebP = isWebPSupported()

            console.log(
              `🔍 WebP 지원 여부: ${shouldConvertToWebP ? '예' : '아니오'} (iOS Safari는 미지원)`
            )

            const optimizedImage = await optimizeImage(file, {
              maxWidth: 1920,
              maxHeight: 1080,
              quality: 0.8,
              convertToWebP: shouldConvertToWebP,
              ...imageOptimizeOptions,
            })

            uploadBlob = optimizedImage.blob
            optimizedSize = optimizedImage.size
            compressionRatio = optimizedImage.compressionRatio
            format = optimizedImage.format

            // WebP로 변환된 경우에만 확장자 변경
            if (shouldConvertToWebP && optimizedImage.format === 'webp') {
              uploadFileName = changeFileExtensionToWebp(fileInfo.name)
            }

            console.log('✅ 이미지 최적화 완료:', {
              originalFileName: fileInfo.name,
              uploadFileName,
              originalSize: `${(originalSize / 1024).toFixed(2)}KB`,
              optimizedSize: `${(optimizedSize / 1024).toFixed(2)}KB`,
              compressionRatio: `${compressionRatio}%`,
              format: optimizedImage.format,
            })
          } catch (optimizeError) {
            console.warn('⚠️ 이미지 최적화 실패, 원본으로 업로드:', optimizeError)
            // 최적화 실패해도 원본으로 계속 진행
          }
        }

        // 3️⃣ S3 presigned URL로 파일 업로드
        console.log(`📤 S3 업로드 시작: ${uploadFileName} (${(uploadBlob.size / 1024).toFixed(2)}KB)`)

        const uploadResponse = await fetch(preSignedUrl, {
          method: 'PUT',
          body: uploadBlob,
          // ⚠️ Content-Type 헤더 제거 - presigned URL 서명과 불일치 방지
        })

        if (!uploadResponse.ok) {
          const errorMsg = `S3 업로드 실패 (상태: ${uploadResponse.status})`
          console.error('❌ 업로드 응답 오류:', {
            status: uploadResponse.status,
            statusText: uploadResponse.statusText,
          })
          onError?.(errorMsg)
          return { success: false, error: errorMsg }
        }

        setUploadProgress(100)
        onProgress?.(100)

        console.log('✅ 파일 업로드 성공:', {
          originalFileName: fileInfo.name,
          uploadFileName,
          originalSize: `${(originalSize / 1024).toFixed(2)}KB`,
          uploadedSize: `${(optimizedSize / 1024).toFixed(2)}KB`,
        })

        return {
          success: true,
          preSignedUrl,
          originalSize,
          optimizedSize,
          compressionRatio,
          originalFileName: fileInfo.name,
          uploadedFileName: uploadFileName,
          format,
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : '파일 업로드 중 오류 발생'
        console.error('❌ 파일 업로드 에러:', errorMsg, error)
        onError?.(errorMsg)
        return { success: false, error: errorMsg }
      } finally {
        setIsLoading(false)
        setUploadProgress(0)
      }
    },
    []
  )

  /**
   * 여러 파일 병렬 업로드
   */
  const uploadMultipleFiles = useCallback(
    async (fileInfoList: FileInfoType[], preSignedUrl: string): Promise<UploadResult[]> => {
      try {
        setIsLoading(true)

        const uploadPromises = fileInfoList.map((fileInfo) => uploadFile(fileInfo, { preSignedUrl }))
        const results = await Promise.all(uploadPromises)

        const successCount = results.filter((r) => r.success).length
        console.log(`✅ 다중 업로드 완료: ${successCount}/${fileInfoList.length}`)

        return results
      } catch (error) {
        console.error('❌ 다중 파일 업로드 에러:', error)
        return fileInfoList.map(() => ({
          success: false,
          error: '업로드 실패',
        }))
      } finally {
        setIsLoading(false)
      }
    },
    [uploadFile]
  )

  return {
    uploadFile,
    uploadMultipleFiles,
    isLoading,
    uploadProgress,
  }
}
