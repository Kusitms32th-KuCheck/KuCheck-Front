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

/**
 * 파일명의 확장자를 .webp로 변경
 * 예: "image.jpg" -> "image.webp"
 */
const changeFileExtensionToWebp = (fileName: string): string => {
  const nameParts = fileName.split('.')
  nameParts.pop() // 기존 확장자 제거
  return `${nameParts.join('.')}.webp`
}

const createFileFromFileInfo = async (fileInfo: FileInfoType): Promise<File> => {
  let fileBlob: Blob

  if (typeof fileInfo.url === 'string' && fileInfo.url.startsWith('data:')) {
    const response = await fetch(fileInfo.url)
    fileBlob = await response.blob()
  } else if (fileInfo.url instanceof ArrayBuffer) {
    fileBlob = new Blob([fileInfo.url])
  } else {
    throw new Error('유효하지 않은 파일 형식')
  }

  return new File([fileBlob], fileInfo.name, { type: fileBlob.type })
}

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  /**
   * 단일 파일 업로드 (이미지는 자동으로 WebP로 변환)
   *
   * LCP 개선 효과:
   * - WebP 변환으로 JPEG 대비 25~35% 크기 감소
   * - 리사이징(1920x1080 이하)으로 추가 최적화
   * - HEIC, AVIF 등 무거운 형식도 WebP로 통일
   * - 확장자를 .webp로 변경하여 S3 저장
   */
  const uploadFile = useCallback(async (fileInfo: FileInfoType, options: UploadOptions): Promise<UploadResult> => {
    const { preSignedUrl, onProgress, onError, imageOptimizeOptions } = options

    try {
      setIsLoading(true)
      setUploadProgress(0)

      // 1. FileInfoType에서 File 객체로 변환
      const file = await createFileFromFileInfo(fileInfo)
      let uploadBlob: Blob = file
      let uploadFileName = fileInfo.name
      const originalSize = file.size
      let optimizedSize = file.size
      let compressionRatio = 0
      let format = 'original'

      // 2. 이미지 파일이면 WebP로 변환
      if (isImageFile(fileInfo.name)) {
        try {
          const optimizedImage = await optimizeImage(file, {
            maxWidth: 1920,
            maxHeight: 1080,
            quality: 0.8, // WebP quality (0.7~0.85 권장)
            convertToWebP: true, // ✅ WebP 변환 활성화
            ...imageOptimizeOptions,
          })

          uploadBlob = optimizedImage.blob
          optimizedSize = optimizedImage.size
          compressionRatio = optimizedImage.compressionRatio
          format = optimizedImage.format

          // ✅ 파일명 확장자를 .webp로 변경
          uploadFileName = changeFileExtensionToWebp(fileInfo.name)

          console.log('✅ 이미지 WebP 변환 완료:', {
            originalFileName: fileInfo.name,
            convertedFileName: uploadFileName,
            originalSize: `${(originalSize / 1024).toFixed(2)}KB`,
            optimizedSize: `${(optimizedSize / 1024).toFixed(2)}KB`,
            compressionRatio: `${compressionRatio}%`,
            savedSize: `${((originalSize - optimizedSize) / 1024).toFixed(2)}KB`,
          })
        } catch (optimizeError) {
          console.warn('⚠️ WebP 변환 실패, 원본으로 업로드:', optimizeError)
          // 변환 실패 시 원본으로 계속
        }
      }

      // 3. S3에 파일 업로드 (presigned URL 사용)
      // Content-Type 헤더 제거 - presigned URL 서명 불일치 방지
      const uploadResponse = await fetch(preSignedUrl, {
        method: 'PUT',
        body: uploadBlob,
      })

      if (!uploadResponse.ok) {
        const errorMsg = `S3 업로드 실패: ${uploadResponse.status}`
        onError?.(errorMsg)
        return { success: false, error: errorMsg }
      }

      setUploadProgress(100)
      onProgress?.(100)

      console.log('✅ 파일 업로드 성공:', {
        fileId: fileInfo.id,
        fileName: uploadFileName,
        originalSize: `${(originalSize / 1024).toFixed(2)}KB`,
        uploadedSize: `${(optimizedSize / 1024).toFixed(2)}KB`,
        compressionRatio: `${compressionRatio}%`,
        format,
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
      console.error('파일 업로드 에러:', error)
      onError?.(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
    }
  }, [])

  /**
   * 여러 파일 병렬 업로드 (모두 WebP로 변환)
   */
  const uploadMultipleFiles = useCallback(
    async (fileInfoList: FileInfoType[], preSignedUrl: string): Promise<UploadResult[]> => {
      try {
        setIsLoading(true)

        const uploadPromises = fileInfoList.map((fileInfo) => uploadFile(fileInfo, { preSignedUrl }))
        const results = await Promise.all(uploadPromises)

        const successCount = results.filter((r) => r.success).length
        const totalOriginalSize = results.reduce((sum, r) => sum + (r.originalSize || 0), 0)
        const totalOptimizedSize = results.reduce((sum, r) => sum + (r.optimizedSize || 0), 0)
        const totalSaved = totalOriginalSize - totalOptimizedSize
        const avgCompressionRatio = Math.round(
          results.reduce((sum, r) => sum + (r.compressionRatio || 0), 0) / results.length
        )

        console.log(`✅ 다중 업로드 완료: ${successCount}/${fileInfoList.length}`, {
          totalOriginal: `${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`,
          totalOptimized: `${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`,
          totalSaved: `${(totalSaved / 1024 / 1024).toFixed(2)}MB`,
          avgCompressionRatio: `${avgCompressionRatio}%`,
        })

        return results
      } catch (error) {
        console.error('다중 파일 업로드 에러:', error)
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
