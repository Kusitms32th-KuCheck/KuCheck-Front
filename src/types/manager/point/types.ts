// 출석 상태 enum
export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  ABSENT_WITH_DOC = 'ABSENT_WITH_DOC',
  ABSENT_WITHOUT_DOC = 'ABSENT_WITHOUT_DOC',
  ABSENT_NO_SUBMISSION = 'ABSENT_NO_SUBMISSION',
  LATE = 'LATE',
  EARLY_LEAVE = 'EARLY_LEAVE',
}

// 출석 상태별 표시 텍스트 맵핑
export const attendanceStatusDisplayMap: Record<AttendanceStatus, (point: number) => string> = {
  [AttendanceStatus.PRESENT]: (point) => {
    if (point === 0) return '출석(0)'
    if (point === 1) return '출석(1)'
    return `출석(${point})`
  },
  [AttendanceStatus.ABSENT]: (point) => `결석(${point})`,
  [AttendanceStatus.ABSENT_WITH_DOC]: (point) => {
    if (point === -1) return '결석(사유 -1)'
    return `결석(${point})`
  },
  [AttendanceStatus.ABSENT_WITHOUT_DOC]: (point) => {
    if (point === -2) return '결석(무단 -2)'
    return `결석(${point})`
  },
  [AttendanceStatus.ABSENT_NO_SUBMISSION]: (point) => {
    if (point === -3) return '결석(미제출 -3)'
    return `결석(${point})`
  },
  [AttendanceStatus.LATE]: () => '지각(-1)',
  [AttendanceStatus.EARLY_LEAVE]: () => '조퇴(-1)',
}

export interface PointMemberStatus {
  memberId: number
  name: string
  part: string
  //개인정보
  phoneNumber: string
  school: string
  major: string
  // 활동 정보
  isTf: boolean
  isStaff: boolean
  //월별 총점
  attendanceMonthlyTotals: {
    8: number
    9: number
    10: number
    11: number
    12: number
  }
  //큐픽제출
  kupickParticipation: {
    8: boolean
    9: boolean
    10: boolean
    11: boolean
    12: boolean
  }
  kuportersPoints: number
  memo: string | null
  sessions?: Record<string, string>
}

export interface AttendanceMonthly {
  year: number
  month: number
  sessionDates: string[]
}

export interface AttendanceRecord {
  date: string
  attendanceId: number
  status: string
  point: number
}

export interface MemberData {
  memberId: number
  name: string
  records: AttendanceRecord[]
}

export interface AttendanceMonthlyResult {
  year: number
  month: number
  sessionDates: number[] | string[]
  members: MemberData[]
}

//상벌점 수정 reques body
export interface MemoModification {
  memberId: number
  memo: string | null
}
export interface kupportersModification {
  memberId: number
  kuportersPoints: number
}
export interface kupickModification {
  memberId: number
  yearMonth: string
}
export interface tfModification {
  memberId: number
  yearMonth: string
}
export interface staffModification {
  memberId: number
  yearMonth: string
}
//이번달 큐픽 승인 토글 응답
export interface KupickToggleResponse {
  memberId: number
  kupickId: number
  isKupick: boolean
}
//TF 토글 응답
export interface TfToggleResponse {
  memberId: number
  isTf: boolean
}
//스태프 토글 응답
export interface StaffToggleResponse {
  memberId: number
  isStaff: boolean
}

export interface VisibleDate {
  month?: string
  date: string
}

export interface DropdownOption {
  label: string
  value: string
}

// 월별 출결 조회 전용 타입
export interface MonthlyAttendanceRecord {
  date: string
  attendanceId: number | null
  status: string | null
  point: number | null
}

export interface MonthlyMemberData {
  memberId: number
  name: string
  records: MonthlyAttendanceRecord[]
}

export interface MonthlyAttendanceResult {
  year: number
  month: number
  sessionDates: number[]
  members: {
    data: MonthlyMemberData[]
    totalPages: number
    isLastPage: boolean
  }
}
