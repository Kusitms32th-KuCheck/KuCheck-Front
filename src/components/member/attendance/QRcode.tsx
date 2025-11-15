'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'

import { postClientAttendanceToken } from '@/lib/member/client/attendance'
import { ArrowRotateLeftIcon } from '@/assets/svgComponents/member'

// LCP 최적화: QRCode를 dynamic import로 번들 크기 감소
// ssr: false로 설정하여 서버 렌더링 스킵
const QRCodeSVG = dynamic(() => import('qrcode.react').then((mod) => ({ default: mod.QRCodeSVG })), {
  ssr: false,
  loading: () => <div className="h-[192px] w-[192px] animate-pulse rounded bg-gray-200" />,
})

interface QRcodeProps {
  expAt: string | undefined
  token: string | undefined
}

export default function QRcode({ expAt, token }: QRcodeProps) {
  const [tokenData, setTokenData] = useState<{ expAt: string | undefined; token: string | undefined } | undefined>(
    undefined
  )
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const expirationTimeRef = useRef<Date | null>(null)

  // 초기 데이터 설정
  useEffect(() => {
    if (expAt && token) {
      setTokenData({ expAt, token })
      startTimer(expAt)
    }
  }, [expAt, token])

  // 타이머 로직 최적화
  const startTimer = useCallback((expAtValue: string | undefined) => {
    if (!expAtValue) {
      console.warn('expAtValue가 없습니다:', expAtValue)
      return
    }

    if (timerRef.current) clearInterval(timerRef.current)

    const normalizedExpAt = expAtValue.includes('.') ? expAtValue.split('.')[0] : expAtValue
    expirationTimeRef.current = new Date(normalizedExpAt)

    const calculateRemaining = () => {
      const now = new Date()
      const expirationTime = expirationTimeRef.current

      if (!expirationTime) return 0

      const diffSeconds = Math.max(0, Math.floor((expirationTime.getTime() - now.getTime()) / 1000))
      setRemainingSeconds(diffSeconds)

      if (diffSeconds === 0) {
        setIsExpired(true)
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      }

      return diffSeconds
    }

    const remaining = calculateRemaining()

    if (remaining > 0) {
      timerRef.current = setInterval(calculateRemaining, 1000)
    }
  }, [])

  // 토큰 재발급 로직
  const handleReissueToken = useCallback(async () => {
    setIsLoading(true)
    try {
      const newTokenData = await postClientAttendanceToken()

      if (!newTokenData.success) {
        console.error('API 에러:', newTokenData.error)
        alert(`재발급 실패: ${newTokenData.error}`)
        return
      }

      const responseData = newTokenData.data
      const newToken = responseData?.data?.token
      const newExpAt = responseData?.data?.expAt

      if (newToken && newExpAt) {
        setIsExpired(false)
        setRemainingSeconds(0)
        setTokenData({ token: newToken, expAt: newExpAt })
        startTimer(newExpAt)
      } else {
        console.error('토큰 데이터 불완전:', { hasToken: !!newToken, hasExpAt: !!newExpAt })
        alert('토큰 데이터가 불완전합니다.')
      }
    } catch (error) {
      console.error('재발급 중 오류:', error)
      alert('토큰 재발급에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }, [startTimer])

  // 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // QR 데이터 메모이제이션 - 불필요한 리렌더링 방지
  const qrData = useMemo(() => (tokenData?.token ? JSON.stringify({ token: tokenData.token }) : ''), [tokenData?.token])

  return (
    <section className="flex flex-col gap-y-[40px]">
      <p className="body-lg-regular text-center text-gray-500">
        {!isExpired ? (
          <>
            출석체크를 위해
            <br /> 운영진에게 QR코드를 보여주세요.
          </>
        ) : (
          <>
            해당 QR코드의 유효시간이 지났어요 <br />
            재시도를 눌러주세요
          </>
        )}
      </p>

      <div className="flex flex-col items-center justify-center gap-y-4">
        <div className="h-[200px] w-[200px] rounded-lg border border-gray-200 bg-gray-100 p-2">
          {!isExpired && tokenData?.token ? (
            <div className="flex h-full w-full items-center justify-center">
              <QRCodeSVG value={qrData} size={192} level="H" />
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100">
              <button
                onClick={handleReissueToken}
                disabled={isLoading}
                className="text-primary-400 hover:bg-primary-50 flex flex-col gap-y-1 rounded-[20px] px-[17px] py-[7px] text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowRotateLeftIcon width={40} height={40} />
                <p className="body-md-semibold text-gray-500">재시도</p>
              </button>
            </div>
          )}
        </div>

        <div className="flex w-fit gap-x-1 rounded-[20px] border border-gray-100 bg-white px-[17px] py-[7px]">
          <p className="body-sm-medium text-gray-400">남은시간</p>
          <p className={`body-sm-semibold ${remainingSeconds === 0 ? 'text-gray-400' : 'text-primary-400'}`}>
            {remainingSeconds > 0 ? `${remainingSeconds}초` : '0초'}
          </p>
        </div>
      </div>
    </section>
  )
}
