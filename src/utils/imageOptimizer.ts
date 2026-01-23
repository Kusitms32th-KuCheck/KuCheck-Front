// utils/imageOptimizer.ts
/**
 * 이미지 압축 및 리사이징 유틸리티
 * 이미지를 WebP로 변환하여 LCP 성능 개선
 */

export interface ImageOptimizeOptions {
  maxWidth?: number // 최대 너비 (기본값: 1920)
  maxHeight?: number // 최대 높이 (기본값: 1080)
  quality?: number // WebP 품질 (0~1, 기본값: 0.8)
  convertToWebP?: boolean // WebP 변환 여부 (기본값: true)
}

export interface OptimizedImage {
  blob: Blob
  width: number
  height: number
  size: number // bytes
  originalSize: number // bytes
  compressionRatio: number // 압축률 (%)
  format: string // 포맷 (webp)
  originalFormat: string // 원본 포맷 (jpeg, png 등)
}

/**
 * 파일 확장자에서 MIME 타입 추출
 */
const getMimeTypeFromFileName = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase()

  const mimeTypeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    bmp: 'image/bmp',
    svg: 'image/svg+xml',
    heic: 'image/heic',
    avif: 'image/avif',
  }

  return mimeTypeMap[ext || ''] || 'image/jpeg'
}

/**
 * MIME 타입에서 format 추출
 */
const getFormatFromMimeType = (mimeType: string): string => {
  if (mimeType.includes('png')) return 'png'
  if (mimeType.includes('gif')) return 'gif'
  if (mimeType.includes('webp')) return 'webp'
  if (mimeType.includes('heic')) return 'heic'
  if (mimeType.includes('avif')) return 'avif'
  if (mimeType.includes('svg')) return 'svg'
  return 'jpeg'
}

/**
 * Canvas에서 WebP로 변환
 */
const convertToWebP = (canvas: HTMLCanvasElement, quality: number = 0.8): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('WebP 변환 실패'))
        }
      },
      'image/webp',
      quality
    )
  })
}

/**
 * Canvas에서 원본 포맷으로 변환
 */
const convertToOriginalFormat = (canvas: HTMLCanvasElement, mimeType: string, quality: number = 0.8): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('포맷 변환 실패'))
        }
      },
      mimeType,
      quality
    )
  })
}

/**
 * 이미지를 WebP로 변환하여 최적화
 * @param file - 입력 이미지 파일
 * @param options - 최적화 옵션
 */
export const optimizeImage = async (file: File, options: ImageOptimizeOptions = {}): Promise<OptimizedImage> => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8, // WebP 기본 quality (0.7~0.85 권장)
    convertToWebP: shouldConvertToWebP = true, // 기본 WebP 변환
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
            // 캔버스 생성
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            if (!ctx) {
              throw new Error('Canvas context를 가져올 수 없습니다')
            }

            // 가로세로 비율 유지하면서 리사이징할 크기 계산
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

            // 캔버스 크기 설정 (정수로 반올림)
            canvas.width = Math.round(width)
            canvas.height = Math.round(height)

            // 🎨 이미지 품질 개선을 위한 캔버스 설정
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'

            // 이미지를 캔버스에 그리기
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            // 캔버스를 Blob으로 변환 (WebP 또는 원본 포맷)
            let blob: Blob

            if (shouldConvertToWebP) {
              // ✅ WebP로 변환 (20~30% 추가 크기 감소)
              blob = await convertToWebP(canvas, quality)
            } else {
              // 원본 포맷 유지
              blob = await convertToOriginalFormat(canvas, originalMimeType, quality)
            }

            const compressionRatio = Math.round(((file.size - blob.size) / file.size) * 100)
            const resultFormat = shouldConvertToWebP ? 'webp' : originalFormat

            // 성능 측정용 로그
            console.log('📊 이미지 최적화:', {
              fileName: file.name,
              originalFormat,
              convertedFormat: resultFormat,
              dimension: `${canvas.width}x${canvas.height}`,
              originalSize: `${(file.size / 1024).toFixed(2)}KB`,
              optimizedSize: `${(blob.size / 1024).toFixed(2)}KB`,
              compressionRatio: `${compressionRatio}%`,
              quality,
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

/**
 * 여러 이미지를 한 번에 최적화
 */
export const optimizeMultipleImages = async (
  files: File[],
  options?: ImageOptimizeOptions
): Promise<OptimizedImage[]> => {
  return Promise.all(files.map((file) => optimizeImage(file, options)))
}

/**
 * 파일 크기를 사람이 읽을 수 있는 형식으로 변환
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
