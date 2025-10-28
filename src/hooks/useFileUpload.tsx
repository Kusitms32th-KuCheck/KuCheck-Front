// hooks/useFileUpload.ts
'use client'

import { useState, useCallback } from 'react'
import { FileInfoType } from '@/types/common'

export interface UploadOptions {
  preSignedUrl: string
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
   * FileInfoType을 File 객체로 변환하여 업로드
   */
  const uploadFile = useCallback(async (fileInfo: FileInfoType, options: UploadOptions): Promise<UploadResult> => {
    const { preSignedUrl, onProgress, onError } = options

    try {
      setIsLoading(true)
      setUploadProgress(0)

      // 1. FileInfoType에서 Blob으로 변환
      let fileBlob: Blob

      if (typeof fileInfo.url === 'string' && fileInfo.url.startsWith('data:')) {
        // data URL인 경우 Blob으로 변환
        const response = await fetch(fileInfo.url)
        fileBlob = await response.blob()
      } else if (fileInfo.url instanceof ArrayBuffer) {
        // ArrayBuffer인 경우 Blob으로 변환
        fileBlob = new Blob([fileInfo.url])
      } else {
        throw new Error('유효하지 않은 파일 형식')
      }

      // // 2. Presigned URL 요청
      // const presignedResponse = await getS3PostUrl(folderName, fileInfo.name)
      // console.log('presignedResponse', presignedResponse)
      //
      // if (!presignedResponse.success || !presignedResponse.data) {
      //   const errorMsg = 'Presigned URL 생성 실패'
      //   onError?.(errorMsg)
      //   return { success: false, error: errorMsg }
      // }
      //
      // // ✅ presignedResponse.data.data 구조 처리
      // const presignedData = presignedResponse.data.data
      //
      // if (!presignedData) {
      //   const errorMsg = 'Presigned URL 데이터 없음'
      //   onError?.(errorMsg)
      //   return { success: false, error: errorMsg }
      // }
      //
      // const { preSignedUrl, key } = presignedData

      // 3. S3에 파일 업로드 (presigned URL 사용)
      const uploadResponse = await fetch(preSignedUrl, {
        method: 'PUT',
        body: fileBlob,
      })

      console.log('uploadResponse', uploadResponse)

      if (!uploadResponse.ok) {
        const errorMsg = `S3 업로드 실패: ${uploadResponse.status}`
        onError?.(errorMsg)
        return { success: false, error: errorMsg }
      }

      setUploadProgress(100)
      onProgress?.(100)

      console.log('✅ 파일 업로드 성공:', {
        fileName: fileInfo.name,
        fileId: fileInfo.id,
        size: fileInfo.size,
      })

      return {
        success: true,
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
    async (fileInfoList: FileInfoType[], preSignedUrl: string): Promise<UploadResult[]> => {
      try {
        setIsLoading(true)

        const uploadPromises = fileInfoList.map((fileInfo) => uploadFile(fileInfo, { preSignedUrl }))

        const results = await Promise.all(uploadPromises)

        const successCount = results.filter((r) => r.success).length
        console.log(`업로드 완료: ${successCount}/${fileInfoList.length}`)

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
