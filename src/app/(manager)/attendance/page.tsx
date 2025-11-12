import SessionInfo from '@/components/manager/attendance/SessionInfo'
import AbsenceTable from '@/components/manager/attendance/AbsenceTable'
import { getSessionScheduleServer, getSessionDetailServer } from '@/lib/manager/session'
import { findUpcomingOrCurrentSession, formatDateToMD, formatTimeToHM } from '@/utils/manager/attendance'

export default async function AttendancePage() {
  // 세션 스케줄 가져오기
  const sessionScheduleResult = await getSessionScheduleServer(1, 40)
  console.log('AttendancePage - session schedule result:', sessionScheduleResult)
  const sessionInfo = {
    title: '집중협업시간',
    location: '마루180 이벤트홀 지하 1층',
    time: '9/22 13:00 - 17:00',
  }

  let currentSessionId = 2131 // 기본값 (fallback)
  // 가장 가까운 세션 찾기
  if (sessionScheduleResult.success && sessionScheduleResult.data) {
    const upcomingSession = findUpcomingOrCurrentSession(sessionScheduleResult.data)
    console.log('AttendancePage - upcoming session:', upcomingSession)
    if (upcomingSession) {
      currentSessionId = upcomingSession.sessionId // 동적으로 세션 ID 설정
      sessionInfo.title = upcomingSession.title
      // 세션 상세 정보 가져오기 (장소, 시간 정보)
      if (upcomingSession.sessionDetailId) {
        const sessionDetailResult = await getSessionDetailServer(upcomingSession.sessionDetailId)
        if (sessionDetailResult.success && sessionDetailResult.data) {
          const { place, startTime, endTime } = sessionDetailResult.data
          const formattedDate = formatDateToMD(upcomingSession.startDate)
          const formattedStartTime = formatTimeToHM(startTime)
          const formattedEndTime = formatTimeToHM(endTime)
          sessionInfo.location = place || sessionInfo.location
          sessionInfo.time = `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`
        }
      } else {
        // 세션 상세 정보가 없는 경우 기본 정보만 표시
        const formattedDate = formatDateToMD(upcomingSession.startDate)
        sessionInfo.time = `${formattedDate} (시간 미정)`
      }
    }
  }

  return (
    <main className="flex flex-col gap-6 p-6">
      <SessionInfo sessionTitle={sessionInfo.title} location={sessionInfo.location} time={sessionInfo.time} />
      <AbsenceTable
        sessionId={currentSessionId}
        sessions={sessionScheduleResult.success ? sessionScheduleResult.data : undefined}
      />
    </main>
  )
}
