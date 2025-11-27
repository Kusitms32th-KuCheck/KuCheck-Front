// utils/imageOptimizer.ts
/**
 * 이미지 압축 및 리사이징 유틸리티 (iOS 호환성 개선)
 */

export interface ImageOptimizeOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  convertToWebP?: boolean
}

export interface OptimizedImage {
  blob: Blob
  width: number
  height: number
  size: number
  originalSize: number
  compressionRatio: number
  format: string
  originalFormat: string
}

const getMimeTypeFromFileName = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase()

  const mimeTypeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    heic: 'image/heic',
    avif: 'image/avif',
  }

  return mimeTypeMap[ext || ''] || 'image/jpeg'
}

const getFormatFromMimeType = (mimeType: string): string => {
  if (mimeType.includes('png')) return 'png'
  if (mimeType.includes('gif')) return 'gif'
  if (mimeType.includes('webp')) return 'webp'
  if (mimeType.includes('heic')) return 'heic'
  if (mimeType.includes('avif')) return 'avif'
  return 'jpeg'
}

/**
 * Canvas를 Blob으로 변환 (iOS 호환성 개선)
 * toBlob 미지원 시 toDataURL로 폴백
 */
const canvasToBlob = (canvas: HTMLCanvasElement, mimeType: string, quality: number = 0.8): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // ✅ 현대 브라우저: toBlob 사용 (권장)
    if (canvas.toBlob) {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Blob 변환 실패'))
          }
        },
        mimeType,
        quality
      )
    } else {
      // ✅ Fallback: toDataURL 사용 (구형 브라우저/iOS)
      try {
        const dataUrl = canvas.toDataURL(mimeType, quality)
        const [header, data] = dataUrl.split(',')

        const binaryString = atob(data)
        const bytes = new Uint8Array(binaryString.length)

        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }

        const blob = new Blob([bytes], { type: mimeType })
        resolve(blob)
      } catch (error) {
        reject(new Error('Canvas 변환 실패'))
      }
    }
  })
}

/**
 * 이미지를 최적화 및 변환 (WebP 또는 원본 포맷)
 */
export const optimizeImage = async (file: File, options: ImageOptimizeOptions = {}): Promise<OptimizedImage> => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    convertToWebP: shouldConvertToWebP = true,
  } = options

  const originalMimeType = getMimeTypeFromFileName(file.name)
  const originalFormat = getFormatFromMimeType(originalMimeType)

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const img = new Image()

        img.onload = async () => {
          try {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            if (!ctx) {
              throw new Error('Canvas context를 가져올 수 없습니다')
            }

            // 🔄 이미지 비율 유지하면서 리사이징할 크기 계산
            let { width, height } = img
            const aspectRatio = width / height

            if (width > maxWidth) {
              width = maxWidth
              height = width / aspectRatio
            }

            if (height > maxHeight) {
              height = maxHeight
              width = height * aspectRatio
            }

            canvas.width = Math.round(width)
            canvas.height = Math.round(height)

            // 🎨 이미지 품질 설정
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'

            // 캔버스에 이미지 그리기
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            // 💾 Blob으로 변환
            let blob: Blob
            let resultFormat = originalFormat

            if (shouldConvertToWebP) {
              try {
                // WebP 변환 시도
                blob = await canvasToBlob(canvas, 'image/webp', quality)
                resultFormat = 'webp'
                console.log('✅ WebP 변환 성공')
              } catch (webpError) {
                // WebP 실패 시 원본 포맷으로 폴백
                console.warn('⚠️ WebP 변환 실패, 원본 포맷으로 저장:', webpError)
                blob = await canvasToBlob(canvas, originalMimeType, quality)
              }
            } else {
              // WebP 변환하지 않으면 원본 포맷 유지
              blob = await canvasToBlob(canvas, originalMimeType, quality)
            }

            const compressionRatio = Math.round(((file.size - blob.size) / file.size) * 100)

            console.log('📊 이미지 최적화 완료:', {
              fileName: file.name,
              originalFormat,
              resultFormat,
              dimension: `${canvas.width}x${canvas.height}`,
              originalSize: `${(file.size / 1024).toFixed(2)}KB`,
              optimizedSize: `${(blob.size / 1024).toFixed(2)}KB`,
              compressionRatio: `${compressionRatio}%`,
            })

            resolve({
              blob,
              width: canvas.width,
              height: canvas.height,
              size: blob.size,
              originalSize: file.size,
              compressionRatio,
              format: resultFormat,
              originalFormat,
            })
          } catch (error) {
            console.error('❌ Canvas 처리 오류:', error)
            reject(error)
          }
        }

        img.onerror = () => {
          reject(new Error('이미지 로드 실패'))
        }

        img.src = event.target?.result as string
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error('파일 읽기 실패'))
    }

    reader.readAsDataURL(file)
  })
}

export const optimizeMultipleImages = async (
  files: File[],
  options?: ImageOptimizeOptions
): Promise<OptimizedImage[]> => {
  return Promise.all(files.map((file) => optimizeImage(file, options)))
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
