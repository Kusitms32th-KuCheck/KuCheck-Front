import { AttendanceEnumType } from '@/types/member/attendance'

export const switchAttendanceTypeToKor = (attendanceEnumType: AttendanceEnumType) => {
  switch (attendanceEnumType) {
    case 'KUPICK':
      return '큐픽 활동'
    case 'TF':
      return 'TF 활동'
    case 'STAFF':
      return '운영진 활동'
    case 'STUDY':
      return '스터디 활동'
    case 'KUPORTERS':
      return '큐포터즈 활동'
    case 'PRESENT_HOLIDAY':
      return '출석(공휴일 세션)'
    case 'PRESENT':
      return '출석(정시)'
    case 'EXCUSED':
      return '사유서 인정(공결)'
    case 'ABSENT':
      return '결석(미제출)'
    case 'ABSENT_WITH_DOC':
      return '결석(사유서 제출)'
    case 'LATE':
      return '지각'
    case 'EARLY_LEAVE':
      return '조퇴'
  }
}

export const calculatePoints = (attendanceEnumType: AttendanceEnumType) => {
  switch (attendanceEnumType) {
    case 'KUPICK':
      return '+1'
    case 'TF':
      return '+2'
    case 'STAFF':
      return '+1'
    case 'STUDY':
      return '+1'
    case 'KUPORTERS':
      return '+1'
    case 'PRESENT_HOLIDAY':
      return '+1'
    case 'PRESENT':
      return '0'
    case 'EXCUSED':
      return '0'
    case 'ABSENT':
      return '-3'
    case 'ABSENT_WITH_DOC':
      return '-2'
    case 'LATE':
      return '-1'
    case 'EARLY_LEAVE':
      return '-1'
  }
}
