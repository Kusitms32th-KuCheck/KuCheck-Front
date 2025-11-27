// hooks/useFileUpload.ts
'use client'

import { useState, useCallback } from 'react'
import { FileInfoType } from '@/types/common'
import { ImageOptimizeOptions, optimizeImage } from '@/utils/imageOptimizer'
import { useDebugStore } from '@/store/member/debugStore'

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
    'pdf',
    'hwp',
    'hwpx',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'txt',
    'csv',
    'odt',
    'ods',
    'odp',
  ]
  const extension = fileName.split('.').pop()?.toLowerCase() || ''
  return documentExtensions.includes(extension)
}

/**
 * data URL을 Blob으로 변환
 */
const dataUrlToBlob = (dataUrl: string): Blob => {
  try {
    const [header, data] = dataUrl.split(',')
    const mimeMatch = header.match(/:(.*?);/)
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg'

    const binaryString = atob(data)
    const bytes = new Uint8Array(binaryString.length)

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    return new Blob([bytes], { type: mimeType })
  } catch (error) {
    throw new Error('이미지 처리 중 오류 발생')
  }
}

/**
 * FileInfoType에서 File 객체로 변환
 */
const createFileFromFileInfo = (fileInfo: FileInfoType): File => {
  try {
    if (!fileInfo.url) {
      throw new Error('파일 URL이 없습니다')
    }

    let fileBlob: Blob

    if (typeof fileInfo.url === 'string' && fileInfo.url.startsWith('data:')) {
      fileBlob = dataUrlToBlob(fileInfo.url)
    } else if (fileInfo.url instanceof ArrayBuffer) {
      fileBlob = new Blob([fileInfo.url])
    } else {
      throw new Error('지원하지 않는 파일 형식입니다')
    }

    const mimeType = fileBlob.type || 'image/jpeg'
    return new File([fileBlob], fileInfo.name, { type: mimeType })
  } catch (error) {
    throw error
  }
}

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const addLog = useDebugStore((state) => state.addLog)

  /**
   * 단일 파일 업로드 (이미지 최적화, 원본 확장자 유지)
   */
  const uploadFile = useCallback(
    async (fileInfo: FileInfoType, options: UploadOptions): Promise<UploadResult> => {
      const { preSignedUrl, onProgress, onError, imageOptimizeOptions } = options

      try {
        setIsLoading(true)
        setUploadProgress(0)

        addLog('파일 업로드 시작', 'info', `파일명: ${fileInfo.name}`)

        // 1️⃣ FileInfoType에서 File 객체로 변환
        const file = createFileFromFileInfo(fileInfo)
        let uploadBlob: Blob = file
        let uploadFileName = fileInfo.name // ✅ 원본 파일명 유지
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

            addLog(
              'WebP 지원 확인',
              'info',
              `WebP 지원: ${shouldConvertToWebP ? '예' : '아니오'}`
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

            // ✅ 파일명은 원본 그대로 유지 (확장자 변경 없음)

            addLog('이미지 최적화 완료', 'log', {
              fileName: fileInfo.name,
              originalSize: `${(originalSize / 1024).toFixed(2)}KB`,
              optimizedSize: `${(optimizedSize / 1024).toFixed(2)}KB`,
              compressionRatio: `${compressionRatio}%`,
              format: optimizedImage.format,
            })
          } catch (optimizeError) {
            const errorMsg = optimizeError instanceof Error ? optimizeError.message : '알 수 없는 오류'
            addLog('이미지 최적화 실패 - 원본으로 업로드', 'warn', errorMsg)
            // 최적화 실패해도 원본으로 계속 진행
          }
        } else if (isDocumentFile(fileInfo.name)) {
          addLog('문서파일 인식', 'info', `${fileInfo.name} - 원본 형식으로 업로드`)
        }

        // 3️⃣ S3에 파일 업로드
        addLog('S3 업로드 시작', 'info',
          `파일명: ${uploadFileName}, 크기: ${(uploadBlob.size / 1024).toFixed(2)}KB`
        )

        const uploadResponse = await fetch(preSignedUrl, {
          method: 'PUT',
          body: uploadBlob,
        })

        if (!uploadResponse.ok) {
          const errorMsg = `S3 업로드 실패 (상태: ${uploadResponse.status})`
          addLog('S3 업로드 실패', 'error', {
            status: uploadResponse.status,
            statusText: uploadResponse.statusText,
          })
          onError?.(errorMsg)
          return { success: false, error: errorMsg }
        }

        setUploadProgress(100)
        onProgress?.(100)

        addLog('파일 업로드 성공', 'log', {
          fileName: uploadFileName,
          originalSize: `${(originalSize / 1024).toFixed(2)}KB`,
          uploadedSize: `${(optimizedSize / 1024).toFixed(2)}KB`,
          compressionRatio: compressionRatio > 0 ? `${compressionRatio}%` : '압축 없음',
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
        addLog('파일 업로드 에러', 'error', errorMsg)
        onError?.(errorMsg)
        return { success: false, error: errorMsg }
      } finally {
        setIsLoading(false)
        setUploadProgress(0)
      }
    },
    [addLog]
  )

  /**
   * 여러 파일 병렬 업로드
   */
  const uploadMultipleFiles = useCallback(
    async (fileInfoList: FileInfoType[], preSignedUrl: string): Promise<UploadResult[]> => {
      try {
        setIsLoading(true)

        addLog('다중 파일 업로드 시작', 'info', `파일 개수: ${fileInfoList.length}`)

        const uploadPromises = fileInfoList.map((fileInfo) =>
          uploadFile(fileInfo, { preSignedUrl })
        )
        const results = await Promise.all(uploadPromises)

        const successCount = results.filter((r) => r.success).length
        const totalOriginalSize = results.reduce((sum, r) => sum + (r.originalSize || 0), 0)
        const totalOptimizedSize = results.reduce((sum, r) => sum + (r.optimizedSize || 0), 0)
        const totalSaved = totalOriginalSize - totalOptimizedSize

        addLog('다중 파일 업로드 완료', 'log', {
          successCount: `${successCount}/${fileInfoList.length}`,
          totalOriginal: `${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`,
          totalOptimized: `${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`,
          totalSaved: `${(totalSaved / 1024 / 1024).toFixed(2)}MB`,
        })

        return results
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류'
        addLog('다중 파일 업로드 에러', 'error', errorMsg)
        return fileInfoList.map(() => ({
          success: false,
          error: '업로드 실패',
        }))
      } finally {
        setIsLoading(false)
      }
    },
    [uploadFile, addLog]
  )

  return {
    uploadFile,
    uploadMultipleFiles,
    isLoading,
    uploadProgress,
  }
}
