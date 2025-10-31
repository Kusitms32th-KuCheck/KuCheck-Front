'use client'

import { useState, useEffect, useCallback } from 'react'
import QRScanner from './QRScanner'
import FocusSessionCard from './FocusSessionCard'
import { postClientAttendanceScan, getClientAttendanceSummary } from '@/lib/manager/client/attendance'
import type { AttendanceScanResponseType, AttendanceSummaryType } from '@/types/manager/check-document/types'
import type { ApiCallResult } from '@/types/common'
import { useAttendanceStore } from '@/store/attendanceStore'

export default function ManagerAttendanceQRClient() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successPulseUntil, setSuccessPulseUntil] = useState<number | null>(null)
  const [pulseStatus, setPulseStatus] = useState<'success' | 'error' | null>(null)
  const [resultPayload, setResultPayload] = useState<{ name: string; avatarUrl?: string } | null>(null)
  const { setLatestScanResult } = useAttendanceStore()

  const [summary, setSummary] = useState<AttendanceSummaryType | null>(null)

  const setPulseState = useCallback(
    (status: 'success' | 'error', payload: { name: string; avatarUrl?: string }, message: string | null = null) => {
      setPulseStatus(status)
      setResultPayload(payload)
      setErrorMessage(message)
      setSuccessPulseUntil(Date.now() + 4000)
    },
    []
  )

  const fetchSummary = useCallback(async () => {
    try {
      const result = await getClientAttendanceSummary()
      if (result.success && result.data) {
        const summaryData = result.data as AttendanceSummaryType
        setSummary(summaryData)
      } else {
        console.error('Summary Fetch 실패. 오류:', result.error)
      }
    } catch (e) {
      console.error('Summary Fetch 통신 오류:', e)
    }
  }, [])

  // 4초 후 UI 상태 초기화
  useEffect(() => {
    if (!successPulseUntil) return
    const timer = setTimeout(() => {
      console.log('[Timer] 4초 경과, 상태 초기화')
      setSuccessPulseUntil(null)
      setPulseStatus(null)
      setResultPayload(null)
      setErrorMessage(null)
    }, 4000)
    return () => clearTimeout(timer)
  }, [successPulseUntil])

  // 컴포넌트 마운트 시 최초 1회 호출
  useEffect(() => {
    fetchSummary()
  }, [fetchSummary])

  // QR 감지 시 처리
  const handleDetect = useCallback(
    async (data: string) => {
      setLatestScanResult(null)
      let actualToken: string
      try {
        const parsed = JSON.parse(data)
        actualToken = parsed.token
      } catch (e) {
        console.error('QR data parsing failed:', e)
        setPulseState('error', { name: 'QR 오류' }, 'QR 데이터 형식이 잘못되었습니다.')
        return
      }
      try {
        const response: ApiCallResult<AttendanceScanResponseType> = await postClientAttendanceScan(actualToken)
        setLatestScanResult(response)

        if (!response.success) {
          const errMsg = typeof response.error === 'string' ? response.error : '알 수 없는 출석 실패 오류'
          setPulseState('error', { name: '출석 실패' }, errMsg)
          console.error('[QR Scan] POST 실패:', errMsg)
          return
        }

        const resultData = response.data
        if (resultData) {
          fetchSummary()

          setPulseState('success', { name: resultData.memberName ?? '회원' }, null)
        } else {
          setPulseState('error', { name: '데이터 오류' }, 'API 응답에서 출석 결과를 찾을 수 없습니다.')
        }
      } catch (error) {
        console.error('[QR Scan] 통신 오류:', error)
        setPulseState('error', { name: '서버 오류' }, '서버와의 통신에 실패했습니다.')
      }
    },
    [setLatestScanResult, setPulseState, fetchSummary]
  )

  return (
    <main className="flex max-h-full flex-col items-center justify-start gap-5 p-6">
      <FocusSessionCard summary={summary} />
      <QRScanner
        onDetect={handleDetect}
        successPulseUntil={successPulseUntil}
        pulseStatus={pulseStatus}
        resultPayload={resultPayload}
        errorMessage={pulseStatus === 'error' ? errorMessage : null}
      />
    </main>
  )
}
