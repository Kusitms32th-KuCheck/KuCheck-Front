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

      const x = Math.max(0, Math.round(grect.left - crect.left - MASK_PADDING))
      const y = Math.max(0, Math.round(grect.top - crect.top - MASK_PADDING))
      const w = Math.max(0, Math.round(Math.min(grect.width + MASK_PADDING * 2, crect.width - x)))
      const h = Math.max(0, Math.round(Math.min(grect.height + MASK_PADDING * 2, crect.height - y)))

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
        if (!canvas) return
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return

        intervalRef.current = window.setInterval(() => {
          if (!video || !ctx) return
          const c = containerRef.current
          const g = guideRef.current
          if (!c || !g) return

          const crect = c.getBoundingClientRect()
          const grect = g.getBoundingClientRect()
          const vw = video.videoWidth || 0
          const vh = video.videoHeight || 0
          if (vw === 0 || vh === 0) return

          const scaleX = vw / crect.width
          const scaleY = vh / crect.height

          const sx = Math.max(0, Math.floor((grect.left - crect.left) * scaleX))
          const sy = Math.max(0, Math.floor((grect.top - crect.top) * scaleY))
          const sw = Math.max(16, Math.floor(grect.width * scaleX))
          const sh = Math.max(16, Math.floor(grect.height * scaleY))

          // 항상 그리기 → 화면 유지
          canvas.width = sw
          canvas.height = sh
          ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh)

          if (pausedRef.current) return // QR 디코딩만 잠시 멈춤

          const win = window as Window & { jsQR?: JsQrFunc }
          const jsQR = win.jsQR
          if (!jsQR) return

          let imageData: ImageData | null = null
          try {
            imageData = ctx.getImageData(0, 0, sw, sh)
          } catch {
            imageData = null
          }
          if (!imageData) return

          try {
            const code = jsQR(imageData.data, imageData.width, imageData.height)
            if (code && code.data) {
              setGuideState('detected')
              pausedRef.current = true // 1.5초 동안 중복 방지
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
        }, 300)
      } catch {
        setError('카메라 접근 권한이 필요합니다.')
      }
    }

    startScanner()
    return () => {
      stream?.getTracks().forEach((t) => t.stop())
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
      window.removeEventListener('resize', updateMask)
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
