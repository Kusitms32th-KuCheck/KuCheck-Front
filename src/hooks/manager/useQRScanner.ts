import { useEffect, useRef, useState } from 'react'
import loadJsQR from '../../utils/manager/loadJsQR'

type JsQrFunc = (data: Uint8ClampedArray, width: number, height: number) => { data: string } | null

type MaskRect = {
  cw: number
  ch: number
  x: number
  y: number
  w: number
  h: number
}

export default function useQRScanner(onDetect?: (decodedText: string) => void) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const guideRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<number | null>(null)
  const pauseTimeoutRef = useRef<number | null>(null)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [maskRect, setMaskRect] = useState<MaskRect | null>(null)
  const [guideState, setGuideState] = useState<'idle' | 'detected' | 'success'>('idle')
  const pausedRef = useRef(false)

  useEffect(() => {
    let stream: MediaStream | null = null

    const MASK_PADDING = 0
    const updateMask = () => {
      const container = containerRef.current
      const guide = guideRef.current
      if (!container || !guide) return
      const crect = container.getBoundingClientRect()
      const grect = guide.getBoundingClientRect()

      const rawX = grect.left - crect.left - MASK_PADDING
      const rawY = grect.top - crect.top - MASK_PADDING
      const rawW = grect.width + MASK_PADDING * 2
      const rawH = grect.height + MASK_PADDING * 2

      const x = Math.max(0, Math.round(rawX))
      const y = Math.max(0, Math.round(rawY))
      const w = Math.max(0, Math.round(Math.min(rawW, crect.width - x)))
      const h = Math.max(0, Math.round(Math.min(rawH, crect.height - y)))

      setMaskRect({
        cw: Math.round(crect.width),
        ch: Math.round(crect.height),
        x,
        y,
        w,
        h,
      })
    }

    window.addEventListener('resize', updateMask)

    const startScanner = async () => {
      try {
        await loadJsQR()

        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        const video = videoRef.current
        if (!video) return
        video.srcObject = stream
        video.setAttribute('playsinline', 'true')
        await video.play()
        setScanning(true)
        setTimeout(updateMask, 50)
        const canvas = canvasRef.current
        if (canvas) {
          const ctx = canvas.getContext('2d', { willReadFrequently: true })
          const scanIntervalMs = 300
          intervalRef.current = window.setInterval(() => {
            try {
              if (pausedRef.current) return

              const c = containerRef.current
              const g = guideRef.current
              if (!c || !g || !video || !ctx) return

              const crect = c.getBoundingClientRect()
              const grect = g.getBoundingClientRect()

              const vw = video.videoWidth || 0
              const vh = video.videoHeight || 0
              if (vw === 0 || vh === 0) return

              const scaleX = vw / crect.width
              const scaleY = vh / crect.height

              const pad = MASK_PADDING
              const paddedLeft = Math.max(crect.left, grect.left - pad)
              const paddedTop = Math.max(crect.top, grect.top - pad)
              const paddedRight = Math.min(crect.right, grect.right + pad)
              const paddedBottom = Math.min(crect.bottom, grect.bottom + pad)

              const sx = Math.max(0, Math.floor((paddedLeft - crect.left) * scaleX))
              const sy = Math.max(0, Math.floor((paddedTop - crect.top) * scaleY))
              const sw = Math.max(16, Math.floor((paddedRight - paddedLeft) * scaleX))
              const sh = Math.max(16, Math.floor((paddedBottom - paddedTop) * scaleY))

              canvas.width = sw
              canvas.height = sh
              ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh)
              let imageData: ImageData | null = null
              try {
                imageData = ctx.getImageData(0, 0, sw, sh)
              } catch {
                imageData = null
              }
              if (!imageData) return

              const win = window as Window & { jsQR?: JsQrFunc }
              const jsQR = win.jsQR
              if (!jsQR) return

              try {
                const code = jsQR(imageData.data, imageData.width, imageData.height)
                if (code && code.data) {
                  setGuideState('detected')
                  pausedRef.current = true
                  if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
                  pauseTimeoutRef.current = window.setTimeout(() => {
                    pausedRef.current = false
                    setGuideState('idle')
                  }, 1500)
                  if (onDetect) onDetect(code.data)
                }
              } catch {
                // ignore decode errors
              }
            } catch {
              // guard
            }
          }, scanIntervalMs)
        }
      } catch {
        setError('카메라 접근 권한이 필요합니다.')
      }
    }

    startScanner()
    return () => {
      stream?.getTracks().forEach((t) => t.stop())
      if (intervalRef.current) clearInterval(intervalRef.current)
      window.removeEventListener('resize', updateMask)
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    }
  }, [onDetect])

  return {
    videoRef,
    canvasRef,
    containerRef,
    guideRef,
    scanning,
    error,
    maskRect,
    guideState,
    setGuideState,
  }
}
