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
  studyPoints: number
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

//

export interface VisibleDate {
  month?: string
  date: string
}

export interface DropdownOption {
  label: string
  value: string
}
