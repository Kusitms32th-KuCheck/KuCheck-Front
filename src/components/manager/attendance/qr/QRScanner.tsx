'use client'
import { useEffect, useRef } from 'react'
import AttendanceSuccess from './AttendanceSuccess'
import useQRScanner from '@/hooks/manager/useQRScanner'

interface QRScannerProps {
  onDetect?: (decodedText: string) => void
  successPulseUntil?: number | null
  pulseStatus?: 'success' | 'error' | null
  resultPayload?: { name: string; avatarUrl?: string } | null
  errorMessage?: string | null
}

export default function QRScanner({
  onDetect,
  successPulseUntil,
  pulseStatus = null,
  resultPayload = null,
  errorMessage = null,
}: QRScannerProps) {
  const { videoRef, canvasRef, containerRef, guideRef, scanning, error, maskRect, guideState, setGuideState } =
    useQRScanner(onDetect)

  const cornerColor =
    guideState === 'detected' ? 'bg-yellow-400' : guideState === 'success' ? 'bg-green-500' : 'bg-white'
  const borderClass =
    pulseStatus === 'error'
      ? 'border-red-300'
      : guideState === 'detected'
        ? 'border-yellow-300'
        : guideState === 'success'
          ? 'border-green-200'
          : 'border-white/30'
  const cornerPositions = [
    ['top', 'left'],
    ['top', 'right'],
    ['bottom', 'left'],
    ['bottom', 'right'],
  ] as const

  const prevSuccessPulseRef = useRef<number | null>(null)
  useEffect(() => {
    if (!successPulseUntil) return
    let raf = 0
    const tick = () => {
      const now = Date.now()
      if (successPulseUntil && now < successPulseUntil) {
        setGuideState('success')
        raf = requestAnimationFrame(tick)
      } else {
        setGuideState((s) => (s === 'success' ? 'idle' : s))
        if (raf) cancelAnimationFrame(raf)
      }
    }
    tick()
    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [successPulseUntil, setGuideState])

  useEffect(() => {
    const prev = prevSuccessPulseRef.current
    if (prev && !successPulseUntil) {
      setGuideState('idle')
    }
    prevSuccessPulseRef.current = successPulseUntil ?? null
  }, [successPulseUntil, setGuideState])

  return (
    <div className="relative w-full max-w-[1260px] overflow-hidden rounded-[12px] bg-black shadow-md">
      <video ref={videoRef} className="h-[581px] w-full object-cover" />

      <div ref={containerRef} className="pointer-events-none absolute inset-0">
        {maskRect ? (
          <svg
            className="h-full w-full"
            viewBox={`0 0 ${maskRect.cw} ${maskRect.ch}`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="overlay-mask">
                <rect x={0} y={0} width={maskRect.cw} height={maskRect.ch} fill="white" />
                <rect x={maskRect.x} y={maskRect.y} width={maskRect.w} height={maskRect.h} fill="black" />
              </mask>
            </defs>
            <rect
              x={0}
              y={0}
              width={maskRect.cw}
              height={maskRect.ch}
              fill="rgba(0,0,0,0.5)"
              mask="url(#overlay-mask)"
            />
          </svg>
        ) : (
          <svg
            className="h-full w-full"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" y="0" width="1" height="1" fill="rgba(0,0,0,0.5)" />
          </svg>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div ref={guideRef} className="relative h-[360px] w-[360px]">
          {cornerPositions.map(([vpos, hpos]) => (
            <div key={`${vpos}-${hpos}`} className={`absolute ${vpos}-0 ${hpos}-0 h-12 w-12`}>
              <div className={`absolute ${vpos}-0 ${hpos}-0 h-[5px] w-9 ${cornerColor}`} />
              <div className={`absolute ${vpos}-0 ${hpos}-0 h-9 w-[5px] ${cornerColor}`} />
            </div>
          ))}

          <div className={`pointer-events-none absolute inset-0 border ${borderClass}`} />
        </div>
      </div>

      <div className="absolute bottom-6 w-full text-center text-sm font-medium text-white drop-shadow-md">
        {successPulseUntil ? (
          <div className="flex items-center justify-center">
            {resultPayload ? (
              <AttendanceSuccess
                name={resultPayload.name}
                errorMessage={errorMessage ?? undefined}
                status={pulseStatus === 'error' ? 'error' : 'success'}
              />
            ) : (
              <span>{pulseStatus === 'error' ? '오류 발생' : '출석 완료'}</span>
            )}
          </div>
        ) : guideState === 'detected' ? (
          '인식중'
        ) : (
          '사각형에 QR코드가 꼭 차도록 맞춰주세요'
        )}
      </div>

      {!scanning && error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm text-white">{error}</div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
