'use client'

import { GrayPaperclipIcon } from '@/assets/svgComponents/member'

interface FileItemProps {
  fileUrl: string
}

export default function FileItem({ fileUrl }: FileItemProps) {
  /**
   * URL에서 파일명 추출 (query string 제거)
   * S3 URL 형식에 대응: https://bucket.s3.region.amazonaws.com/path/filename?param=value
   */
  const extractFileNameFromUrl = (url: string): string => {
    try {
      const pathname = new URL(url).pathname
      const fileName = pathname.split('/').pop() || 'download'
      return decodeURIComponent(fileName)
    } catch {
      return 'download'
    }
  }

  /**
   * 파일을 다운로드
   */
  const downloadImage = async (imageUrl: string): Promise<void> => {
    try {
      const filename = extractFileNameFromUrl(imageUrl)
      const response = await fetch(imageUrl)

      if (!response.ok) {
        throw new Error(`다운로드 실패: ${response.status} ${response.statusText}`)
      }

      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('다운로드 실패:', error)
      throw error
    }
  }

  const handleDownload = async () => {
    try {
      await downloadImage(fileUrl)
    } catch {
      alert('다운로드에 실패했습니다.')
    }
  }

  /**
   * 파일명을 20자 기준으로 ellipsis 처리
   * "very_long_filename_here.pdf" -> "very_long_filename_..."
   */
  const truncateFileName = (fileName: string, maxLength: number = 30): string => {
    if (fileName.length <= maxLength) return fileName

    // 확장자 추출
    const lastDotIndex = fileName.lastIndexOf('.')
    const extension = lastDotIndex > -1 ? fileName.slice(lastDotIndex) : ''
    const nameWithoutExtension = lastDotIndex > -1 ? fileName.slice(0, lastDotIndex) : fileName

    // 확장자를 포함한 길이가 maxLength가 되도록 조정
    const availableLength = maxLength - 3 - extension.length // 3은 "..."의 길이
    const truncatedName = nameWithoutExtension.slice(0, availableLength)

    return truncatedName + '...' + extension
  }

  // 컴포넌트 마운트 시 파일 용량 조회
  // HEAD 요청으로 가벼운 조회
  const displayFileName = extractFileNameFromUrl(fileUrl)
  const truncatedFileName = truncateFileName(displayFileName, 30)

  return (
    <div
      onClick={handleDownload}
      className="body-sm-regular flex min-w-0 flex-1 cursor-pointer gap-x-2 rounded-[4px] bg-gray-100 px-2 py-3 transition-colors hover:bg-gray-200"
    >
      <GrayPaperclipIcon width={24} height={24} />
      <div className="flex min-w-0 flex-1 gap-x-1">
        <p className="body1 truncate" title={displayFileName}>
          {truncatedFileName}
        </p>
      </div>
    </div>
  )
}
