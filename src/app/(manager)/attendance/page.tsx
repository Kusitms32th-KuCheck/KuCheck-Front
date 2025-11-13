import SessionInfo from '@/components/manager/attendance/SessionInfo'
import AbsenceTable from '@/components/manager/attendance/AbsenceTable'
import { getSessionScheduleServer, getSessionDetailServer } from '@/lib/manager/session'
import { findUpcomingOrCurrentSession, formatDateToMD, formatTimeToHM } from '@/utils/manager/attendance'

export default async function AttendancePage() {
  // 기본값 설정
  let currentSessionId: number | undefined
  let title: string | undefined
  let location: string | undefined
  let time: string | undefined
  let isHoliday: boolean | undefined
  let category: string | undefined

  // 세션 스케줄 가져오기
  const sessionScheduleResult = await getSessionScheduleServer(1, 20)

  // 가장 가까운 세션 찾기
  if (sessionScheduleResult.success && sessionScheduleResult.data) {
    const upcomingSession = findUpcomingOrCurrentSession(sessionScheduleResult.data)
    if (upcomingSession) {
      currentSessionId = upcomingSession.sessionId // 동적으로 세션 ID 설정
      title = upcomingSession.title
      isHoliday = upcomingSession.isHoliday
      category = upcomingSession.category

      // 세션 상세 정보 가져오기 (장소, 시간 정보)
      if (upcomingSession.sessionDetailId) {
        const sessionDetailResult = await getSessionDetailServer(upcomingSession.sessionDetailId)
        if (sessionDetailResult.success && sessionDetailResult.data) {
          const { place, startTime, endTime } = sessionDetailResult.data
          const formattedDate = formatDateToMD(upcomingSession.startDate)
          const formattedStartTime = formatTimeToHM(startTime)
          const formattedEndTime = formatTimeToHM(endTime)
          location = place
          time = `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`
        }
      }
    }
  }

  return (
    <main className="flex h-full flex-col gap-6 p-6">
      <SessionInfo sessionTitle={title} location={location} time={time} isHoliday={isHoliday} category={category} />
      {currentSessionId ? (
        <AbsenceTable
          sessionId={currentSessionId}
          sessions={sessionScheduleResult.success ? sessionScheduleResult.data : undefined}
        />
      ) : (
        <div className="flex items-center justify-center p-8">
          <p className="text-gray-500">세션 정보를 불러올 수 없습니다.</p>
        </div>
      )}
    </main>
  )
}
