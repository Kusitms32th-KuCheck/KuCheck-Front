import SessionInfo from '@/components/manager/attendance/SessionInfo'
import AbsenceTable from '@/components/manager/attendance/AbsenceTable'

const sampleAbsenceRecords = [
  {
    name: '이현진',
    part: '프론트엔드',
    sessionDate: '9월 16일',
    attendanceStatus: '지각',
    time: '12:30',
    reason: '코딩테스트 면접',
    documentStatus: '이현진_증빙.pdf',
  },
  {
    name: '강주언',
    part: '디자인',
    sessionDate: '9월 17일',
    attendanceStatus: '조퇴',
    time: '14:00',
    reason: '웹 어렵다',
    documentStatus: '강주언_증빙.pdf',
  },
  {
    name: '김민지',
    part: '백엔드',
    sessionDate: '9월 18일',
    attendanceStatus: '불참',
    time: '-',
    reason: '언어 초밥 맛있겠당',
    documentStatus: '김민지_증빙.pdf',
  },
  {
    name: '박소정',
    part: '디자인',
    sessionDate: '9월 22일',
    attendanceStatus: '불참',
    time: '-',
    reason: '가족 행사 참여',
    documentStatus: '박소정_증빙.pdf',
  },
  {
    name: '이름다섯자',
    part: '기획',
    sessionDate: '12월 12일',
    attendanceStatus: '조퇴',
    time: '12:30',
    reason:
      '연어초밥맛있겠당두줄로늘려봅시다아앙늘려봅시다아앙으아아아아아아늘려봅시다아앙으아아아아아아으아아아아아아늘려봅시다아앙으아아아아아아늘려봅시다아앙으아아아아아아늘려봅시다아앙으아아아아아아아아아아아아아아아아',
    documentStatus: '이름다섯자_증빙.pdf',
  },
  {
    name: '박소정',
    part: '디자인',
    sessionDate: '9월 22일',
    attendanceStatus: '불참',
    time: '-',
    reason: '가족 행사 참여',
    documentStatus: '박소정_증빙.pdf',
  },
  {
    name: '박소정',
    part: '디자인',
    sessionDate: '9월 22일',
    attendanceStatus: '불참',
    time: '-',
    reason: '가족 행사 참여',
    documentStatus: '박소정_증빙.pdf',
  },
  {
    name: '박소정',
    part: '디자인',
    sessionDate: '9월 22일',
    attendanceStatus: '불참',
    time: '-',
    reason: '가족 행사 참여',
    documentStatus: '박소정_증빙.pdf',
  },
  {
    name: '박소정',
    part: '디자인',
    sessionDate: '9월 22일',
    attendanceStatus: '불참',
    time: '-',
    reason: '가족 행사 참여',
    documentStatus: '박소정_증빙.pdf',
  },
  {
    name: '박소정',
    part: '디자인',
    sessionDate: '9월 22일',
    attendanceStatus: '불참',
    time: '-',
    reason: '가족 행사 참여',
    documentStatus: '박소정_증빙.pdf',
  },
]

export default function AttendancePage() {
  return (
    <div className="flex flex-col gap-6">
      <SessionInfo location="마루180 이벤트홀 지하 1층" time="9/22 13:00 - 17:00" />
      <AbsenceTable records={sampleAbsenceRecords} totalCount={5} />
    </div>
  )
}
