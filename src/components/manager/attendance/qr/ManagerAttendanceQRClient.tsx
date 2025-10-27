'use client'
import { useEffect, useState } from 'react'
import QRScanner from './QRScanner'
import FocusSessionCard from './FocusSessionCard'

type ApiSuccess = {
  code: number
  message: string
  result: { memberId: number; memberName: string; sessionId: number; state: string; scannedAt: string }
  isSuccess: true
}
type ApiFail = { code: string; message: string; result: unknown; isSuccess: false }

export default function ManagerAttendanceQRClient() {
  const [apiResult, setApiResult] = useState<ApiSuccess | ApiFail | null>(null)
  const [successPulseUntil, setSuccessPulseUntil] = useState<number | null>(null)
  const [pulseStatus, setPulseStatus] = useState<'success' | 'error' | null>(null)
  const [resultPayload, setResultPayload] = useState<{ name: string; avatarUrl?: string } | null>(null)
  const [scannedSet, setScannedSet] = useState<Set<string>>(new Set())

  const mockAttendanceApi = async (qrData: string) => {
    await new Promise((r) => setTimeout(r, 600))
    console.log('[mockAttendanceApi] qrData:', qrData)
    return {
      code: 1,
      message: '성공하였습니다.',
      result: {
        memberId: 123,
        memberName: '테스트회원',
        sessionId: 999,
        state: 'PRESENT',
        scannedAt: new Date().toISOString(),
      },
      isSuccess: true as const,
    }
  }

  const handleDetect = async (data: string) => {
    console.log('[QR] detected:', data)
    setApiResult(null)
    if (scannedSet.has(data)) {
      const errMsg = '이미 출석 처리되어 있습니다.'
      setApiResult({ code: 'ALREADY', message: errMsg, result: null, isSuccess: false })
      setPulseStatus('error')
      setResultPayload({ name: '테스트회원' })
      setSuccessPulseUntil(Date.now() + 2000)
      return
    }

    const res = await mockAttendanceApi(data)
    setApiResult(res)
    if (res.isSuccess) {
      setPulseStatus('success')
      setResultPayload({ name: res.result.memberName })
      setSuccessPulseUntil(Date.now() + 2000)
      setScannedSet((s) => new Set(s).add(data))
    }
  }

  useEffect(() => {
    if (!successPulseUntil) return
    const id = window.setTimeout(
      () => {
        setPulseStatus(null)
        setResultPayload(null)
        setSuccessPulseUntil(null)
      },
      Math.max(0, successPulseUntil - Date.now())
    )
    return () => clearTimeout(id)
  }, [successPulseUntil])

  return (
    <main className="flex max-h-full flex-col items-center justify-start gap-5 p-6">
      <FocusSessionCard />
      <QRScanner
        onDetect={handleDetect}
        successPulseUntil={successPulseUntil}
        pulseStatus={pulseStatus}
        resultPayload={resultPayload}
        errorMessage={apiResult && !apiResult.isSuccess ? apiResult.message : undefined}
      />
    </main>
  )
}
