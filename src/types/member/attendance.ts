export interface AttendanceCheckResponseType {
  memberId: number
  name: string
  plusPoints: number
  minusPoints: number
  totalPoints: number
  records: AttendanceCheckRecordType[]
}

export interface AttendanceCheckRecordType {
  date: string
  type: AttendanceEnumType
  points: number
  week: number
  attendanceTime: string
  earlyLeaveTime: string
}

export type AttendanceEnumType =
  | 'KUPICK'
  | 'TF'
  | 'STAFF'
  | 'STUDY'
  | 'KUPORTERS'
  | 'PRESENT_HOLIDAY'
  | 'PRESENT'
  | 'EXCUSED'
  | 'ABSENT'
  | 'ABSENT_WITH_DOC'
  | 'LATE'
  | 'EARLY_LEAVE'

export type AttendanceContentType =
  | '큐픽 활동(상점 +1)'
  | 'TF 활동(상점 +2)'
  | '운영진 활동(상점 +1)'
  | '스터디 활동(상점 +1)'
  | '큐포터즈 활동(상점 +1)'
  | '출석(공휴일 세션, +1점)'
  | '출석(정시, 0점)'
  | '사유서 인정(공결, 0점)'
  | '결석(미제출, -3점)'
  | '결석(사유서 제출, -2점)'
  | '지각(-1점)'
  | '조퇴(-1점)'
