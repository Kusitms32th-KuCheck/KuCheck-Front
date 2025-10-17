export interface PointMemberStatus {
  name: string
  point: string
  part: string
  sessions: Record<string, string>
  score: {
    august: number
    september: number
    october: number
    november: number
    december: number
  }
  // 큐픽 참여 여부
  qpick_september: string
  qpick_october: string
  qpick_november: string
  // 활동 정보
  tf: string
  study: string
  qporters: string
  is_manager: boolean
  // 개인 정보
  phone: string
  school: string
  major: string
}

export interface VisibleDate {
  month?: string
  date: string
}

export interface DropdownOption {
  label: string
  value: string
}
