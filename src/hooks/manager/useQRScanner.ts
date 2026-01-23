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
  const streamRef = useRef<MediaStream | null>(null)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [maskRect, setMaskRect] = useState<MaskRect | null>(null)
  const [guideState, setGuideState] = useState<'idle' | 'detected' | 'success'>('idle')
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false)

  const pausedRef = useRef(false)
  const resumeDecoding = () => {
    pausedRef.current = false
  }

  // 사용 가능한 카메라 개수 체크 함수
  const checkCameraAvailability = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter((device) => device.kind === 'videoinput')
      setHasMultipleCameras(videoDevices.length > 1)
    } catch (error) {
      console.warn('카메라 장치를 확인할 수 없습니다:', error)
      setHasMultipleCameras(false)
    }
  }

  // 카메라 전환 함수
  const switchCamera = async () => {
    const newFacingMode = facingMode === 'environment' ? 'user' : 'environment'

    // 기존 스트림 정지
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode },
      })

      const video = videoRef.current
      if (video) {
        video.srcObject = newStream
        streamRef.current = newStream
        setFacingMode(newFacingMode)
        setError(null)
      }
    } catch {
      setError('카메라를 전환할 수 없습니다.')
    }
  }

  const updateMask = () => {
    const container = containerRef.current
    const guide = guideRef.current
    const MASK_PADDING = 0

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

  useEffect(() => {
    window.addEventListener('resize', updateMask)

    const startScanner = async () => {
      try {
        await loadJsQR()
        await checkCameraAvailability()

        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } })
        const video = videoRef.current
        if (!video) return
        video.srcObject = stream
        streamRef.current = stream
        video.setAttribute('playsinline', 'true')
        await video.play()
        setScanning(true)
        setTimeout(updateMask, 50)

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return

        const SCAN_INTERVAL = 600

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

          canvas.width = sw
          canvas.height = sh
          ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh)

          if (pausedRef.current) return

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
              pausedRef.current = true

              if (onDetect) onDetect(code.data)
            } else {
              setGuideState((s) => (s === 'detected' ? 'idle' : s))
            }
          } catch {
            // ignore decode errors
          }
        }, SCAN_INTERVAL)
      } catch {
        setError('카메라 접근 권한이 필요합니다.')
      }
    }

    startScanner()
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      if (intervalRef.current) clearInterval(intervalRef.current)
      window.removeEventListener('resize', updateMask)
    }
  }, [onDetect, facingMode])

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
    resumeDecoding,
    switchCamera,
    facingMode,
    hasMultipleCameras,
  }
}
