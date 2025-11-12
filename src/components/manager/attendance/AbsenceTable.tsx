'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import AbsenceTableHeader from './AbsenceTableHeader'
import AbsenceTableRow from './AbsenceTableRow'
import { AbsenceReportItem } from '@/types/manager/attendance/type'
import Dropdown from '../common/ManagerdropDown'
import { CalendarIcon, CalendarOnIcon, UpIcon, DownIcon } from '@/assets/svgComponents/manager'
import { SessionScheduleData } from '@/types/manager/session/type'
import { AbsenceIcon } from '@/assets/svgComponents/manager'
import {
  generateDateOptionsFromSessions,
  getDefaultSelectedDate,
  transformAbsenceReportItem,
} from '@/utils/manager/attendance'
import { getAbsenceClient } from '@/lib/manager/client/absence'

interface AbsenceTableProps {
  sessionId: number
  sessions?: SessionScheduleData[]
}

export default function AbsenceTable({ sessionId, sessions = [] }: AbsenceTableProps) {
  const dateOptions = useMemo(() => generateDateOptionsFromSessions(sessions), [sessions])
  const defaultSelectedDate = useMemo(() => getDefaultSelectedDate(sessions), [sessions])
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate)
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(sessionId)
  const [currentRecords, setCurrentRecords] = useState<AbsenceReportItem[]>()
  const currentTotalCount = useMemo(() => {
    return currentRecords?.length || 0
  }, [currentRecords])

  const fetchAbsenceRecords = useCallback(async (sessionId: number) => {
    try {
      const result = await getAbsenceClient(sessionId)
      if (result.success) {
        setCurrentRecords(result.data)
      }
    } catch (error) {
      console.error('❌ Error fetching absence records:', error)
    }
  }, [])

  // 초기 데이터 로드
  useEffect(() => {
    if (sessionId) {
      console.log('🚀 Initial fetch for sessionId:', sessionId)
      fetchAbsenceRecords(sessionId)
    }
  }, [sessionId, fetchAbsenceRecords])
  // 선택된 날짜에 해당하는 세션 ID 찾기
  const handleDateChange = useCallback(
    (date: string) => {
      setSelectedDate(date)
      const selectedOption = dateOptions.find((option) => option.value === date)
      if (selectedOption) {
        setSelectedSessionId(selectedOption.sessionId)
        console.log('선택된 세션 ID:', selectedOption.sessionId, '날짜:', date)
        // API 호출하여 불참사유서 리스트 가져오기
        fetchAbsenceRecords(selectedOption.sessionId)
      }
    },
    [dateOptions, fetchAbsenceRecords]
  )

  // 초기 데이터 로드
  useEffect(() => {
    if (sessionId) {
      console.log('🚀 Initial fetch for sessionId:', sessionId)
      fetchAbsenceRecords(sessionId)
    }
  }, [sessionId, fetchAbsenceRecords])

  // 초기 세션 ID 설정
  useEffect(() => {
    const defaultOption = dateOptions.find((option) => option.value === defaultSelectedDate)
    if (defaultOption && selectedSessionId === null) {
      setSelectedSessionId(defaultOption.sessionId)
      console.log('초기 세션 ID 설정:', defaultOption.sessionId, '날짜:', defaultSelectedDate)
    }
  }, [dateOptions, defaultSelectedDate, selectedSessionId])
  return (
    <div className="flex h-full flex-col rounded-[12px] bg-white py-7">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <p className="heading-md-semibold m-0 p-0">불참 사유서</p>
            <p className="body-lg-semibold m-0 flex h-6 w-[30px] items-center justify-center rounded-full bg-black p-0 text-white">
              {currentTotalCount}
            </p>
          </div>
          <Dropdown
            size="lg"
            options={dateOptions}
            selected={selectedDate}
            onChange={handleDateChange}
            leftIcon={<CalendarIcon width={24} height={24} />}
            leftIconActive={<CalendarOnIcon width={24} height={24} />}
            rightIcon={<DownIcon width={24} height={24} />}
            rightIconActive={<UpIcon width={24} height={24} />}
          />
        </div>
      </div>

      <div className="h-full w-full overflow-x-auto">
        {currentRecords?.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <AbsenceIcon width={50} height={50} />
            <p className="body-lg-medium text-gray-400">아직 불참 사유서가 등록되지 않았어요</p>
          </div>
        ) : (
          <div className="min-w-[960px]">
            <AbsenceTableHeader />
            <div>
              {currentRecords?.map((record, index) => (
                <AbsenceTableRow
                  key={record.absenceReportId}
                  record={transformAbsenceReportItem(record)}
                  isEven={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
