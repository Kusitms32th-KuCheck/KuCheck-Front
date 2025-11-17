'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import AddHeader from '../add-post/AddHeader'
import AddBody from '../add-post/AddBody'
import { postClientSessionDetail, postDetailImage } from '@/lib/manager/client/session'
import { useSessionEdit } from '../session-table/SessionEditContext'

export default function SessionDetailAdd() {
  const { sessionId } = useParams()
  const searchParams = useSearchParams()
  const date = searchParams.get('date')
  const { registerSaveHandler } = useSessionEdit()
  const [place, setPlace] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isImageProcessing, setIsImageProcessing] = useState(false)
  const [imageProcessingError, setImageProcessingError] = useState<string | null>(null)
  const [error, setError] = useState(false)

  // 파일이 변경될 때마다 에러 상태 초기화
  const handleFilesChange = (newFiles: File[] | ((prev: File[]) => File[])) => {
    setFiles(newFiles)
    setImageProcessingError(null) // 파일 변경 시 에러 상태 초기화
  }

  const handleSave = async () => {
    if (!sessionId) {
      console.log('sessionId가 없습니다.')
      alert('세션 ID가 없습니다.')
      return false
    }
    if (!place || !startTime || !endTime || !content) {
      setError(true)

      return false
    } else {
      setError(false)
    }

    // 이미지 처리 중이면 저장 방지
    if (isImageProcessing) {
      console.log('이미지 처리 중입니다.')
      alert('이미지 처리 중입니다. 잠시 후 다시 시도해주세요.')
      return false
    }

    // 이미지 처리 에러가 있으면 저장 방지
    if (imageProcessingError) {
      console.log('이미지 처리 에러:', imageProcessingError)
      alert(`이미지 처리 중 오류가 발생했습니다: ${imageProcessingError}`)
      return false
    }

    // 파일 확장자 재검증
    if (files.length > 0) {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
      const invalidFiles = files.filter((file) => {
        const extension = file.name.split('.').pop()?.toLowerCase()
        return !extension || !allowedExtensions.includes(extension)
      })

      if (invalidFiles.length > 0) {
        const invalidNames = invalidFiles.map((f) => f.name).join(', ')
        console.log('올바르지 않은 파일 형식:', invalidNames)
        alert(`올바르지 않은 파일 형식입니다: ${invalidNames}\n허용된 형식: JPG, JPEG, PNG, GIF, WEBP`)
        return false
      }
    }

    console.log('세션 상세 저장 플로우 시작')

    try {
      // Step 1: 세션 상세 정보 저장
      const detailData = {
        sessionId: Number(sessionId),
        place,
        startTime,
        endTime,
        content,
      }

      console.log('Step 1 - 세션 상세 정보 저장:', detailData)
      const detailResult = await postClientSessionDetail(detailData)
      console.log('Step 1 결과:', detailResult)

      if (!detailResult.success) {
        console.log('세션 상세 정보 저장 실패:', detailResult.error)
        return false
      }

      const sessionDetailId = detailResult.data?.sessionDetailId
      if (!sessionDetailId) {
        console.log('sessionDetailId를 받지 못했습니다.')
        return false
      }

      console.log('세션 상세 정보 저장 성공! sessionDetailId:', sessionDetailId)

      // Step 2: 이미지가 있으면 이미지 업로드
      if (files.length > 0) {
        console.log('Step 2 - 이미지 업로드 시작. 파일 수:', files.length)

        setIsImageProcessing(true)
        setImageProcessingError(null)

        try {
          const imageFileNames = files.map((file) => ({
            fileName: file.name,
          }))

          const imageData = {
            sessionDetailId,
            imageFileName: imageFileNames,
          }

          console.log('Step 2-1 - presigned URL 요청:', imageData)
          const imageResult = await postDetailImage(imageData)
          console.log('Step 2-1 결과:', imageResult)

          if (!imageResult.success) {
            const errorMsg = `presigned URL 요청 실패: ${imageResult.error || '알 수 없는 오류'}`
            console.log(errorMsg)
            setImageProcessingError(errorMsg)
            alert(`${errorMsg}\n\n세션 상세 정보는 저장되었습니다.`)
          } else if (imageResult.data && imageResult.data.length > 0) {
            console.log('presigned URL 요청 성공! 실제 파일 업로드 시작')

            // Step 2-2: 받은 presigned URL로 실제 파일들을 S3에 업로드
            const uploadPromises = files.map(async (file, index) => {
              const presignedData = imageResult.data![index]
              const presignedUrl = presignedData.sessionImagePreSignedUrl

              console.log(`파일 "${file.name}" S3 업로드 시작:`, presignedUrl)

              try {
                const uploadResponse = await fetch(presignedUrl, {
                  method: 'PUT',
                  body: file,
                  headers: {
                    'Content-Type': file.type,
                  },
                })

                if (!uploadResponse.ok) {
                  throw new Error(`S3 업로드 실패: ${uploadResponse.status} ${uploadResponse.statusText}`)
                }

                console.log(`파일 "${file.name}" S3 업로드 성공`)
                return { success: true, fileName: file.name }
              } catch (error) {
                console.error(`파일 "${file.name}" S3 업로드 실패:`, error)
                return { success: false, fileName: file.name, error }
              }
            })

            const uploadResults = await Promise.all(uploadPromises)
            const failedUploads = uploadResults.filter((result) => !result.success)

            if (failedUploads.length > 0) {
              const failedNames = failedUploads.map((result) => result.fileName).join(', ')
              const errorMsg = `일부 파일 업로드 실패: ${failedNames}`
              console.log(errorMsg)
              setImageProcessingError(errorMsg)
              alert(`${errorMsg}\n\n세션 상세 정보는 저장되었습니다.`)
            } else {
              console.log('모든 파일 S3 업로드 성공!')
              setImageProcessingError(null)
            }
          } else {
            console.log('presigned URL을 받지 못했습니다.')
            setImageProcessingError('presigned URL을 받지 못했습니다.')
          }
        } catch (error) {
          const errorMsg = `이미지 업로드 중 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
          console.log(errorMsg)
          setImageProcessingError(errorMsg)
          alert(`${errorMsg}\n\n세션 상세 정보는 저장되었습니다.`)
        } finally {
          setIsImageProcessing(false)
        }
      }

      // Step 3: 완료 후 페이지 이동
      const dateParam = date ? `?date=${encodeURIComponent(date)}&sessionId=${sessionId}` : `?sessionId=${sessionId}`
      const targetUrl = `/session-schedule/detail/${sessionDetailId}${dateParam}`
      console.log('저장 완료! 이동할 URL:', {
        sessionId: sessionId,
        sessionDetailId: sessionDetailId,
        targetUrl: targetUrl,
      })

      // 전체 페이지 리로드를 사용하여 최신 데이터 확실히 로드
      setTimeout(() => {
        window.location.href = targetUrl
      }, 500) // 딜레이를 줄여서 더 빠른 이동

      return true
    } catch (error) {
      console.log('세션 상세 저장 에러:', error)
      return false
    }
  }

  useEffect(() => {
    console.log('SessionDetailAdd - sessionId:', sessionId, 'date:', date)
    const unregister = registerSaveHandler(handleSave)
    return () => {
      if (typeof unregister === 'function') unregister()
    }
  }, [
    registerSaveHandler,
    sessionId,
    place,
    startTime,
    endTime,
    content,
    files,
    isImageProcessing,
    imageProcessingError,
  ])

  return (
    <div className="mt-6 mb-6 w-[854px] space-y-6">
      <AddHeader
        place={place}
        setPlace={setPlace}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        date={date}
        files={files}
        setFiles={handleFilesChange}
        error={error}
      />
      <AddBody content={content} setContent={setContent} error={error} />
    </div>
  )
}
