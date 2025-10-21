// hooks/useFileUpload.ts
'use client'

import { useState, useCallback } from 'react'
import { getS3PostUrl } from '@/lib/common'

export interface UploadOptions {
  folderName: string
  onProgress?: (progress: number) => void
  onError?: (error: string) => void
}

export interface UploadResult {
  success: boolean
  key?: string
  preSignedUrl?: string
  error?: string
}

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  /**
   * 단일 파일 업로드
   */
  const uploadFile = useCallback(async (file: File, options: UploadOptions): Promise<UploadResult> => {
    const { folderName, onProgress, onError } = options

    try {
      setIsLoading(true)
      setUploadProgress(0)

      // 1. Presigned URL 요청
      const response = await getS3PostUrl(folderName, file.name)

      if (!response.isSuccess || !response.result) {
        const errorMsg = response.message || 'Presigned URL 생성 실패'
        onError?.(errorMsg)
        return { success: false, error: errorMsg }
      }

      const { preSignedUrl, key } = response.result

      // 2. S3에 파일 업로드 (presigned URL 사용)
      const uploadResponse = await fetch(preSignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
        },
      })

      if (!uploadResponse.ok) {
        const errorMsg = `S3 업로드 실패: ${uploadResponse.status}`
        onError?.(errorMsg)
        return { success: false, error: errorMsg }
      }

      setUploadProgress(100)
      onProgress?.(100)

      console.log('✅ 파일 업로드 성공:', { fileName: file.name, key })

      return {
        success: true,
        key,
        preSignedUrl,
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
   * 여러 파일 병렬 업로드
   */
  const uploadMultipleFiles = useCallback(
    async (files: File[], folderName: string): Promise<UploadResult[]> => {
      try {
        setIsLoading(true)

        const uploadPromises = files.map((file) => uploadFile(file, { folderName }))

        const results = await Promise.all(uploadPromises)

        const successCount = results.filter((r) => r.success).length
        console.log(`업로드 완료: ${successCount}/${files.length}`)

        return results
      } catch (error) {
        console.error('다중 파일 업로드 에러:', error)
        return files.map(() => ({
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
