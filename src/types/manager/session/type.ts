//세션 일정 저장
export interface SessionScheduleParams {
  week: number
  sessionDate: string
  title: string
  category: string
  isHoliday: boolean
}

export type SessionScheduleRequest = SessionScheduleParams[]

//세션 정보 가져오기
export interface SessionScheduleData {
  sessionId: number
  startDate: string
  title: string
  category: string
  sessionDetailId: number | null
}

export type SessionScheduleResponse = SessionScheduleData[]

//세션 상세정보 upsert
export interface SessionDetailRequest {
  sessionId: number
  place: string
  startTime: string
  endTime: string
  content: string
}
export interface SessionDetailResponse {
  sessionDetailId: number
}

//세션 detail 상세정보 조회
interface SessionImage {
  sessionImageId: number
  sessionImagePreSignedUrl: string
}

export interface SessionDetailResponse {
  sessionDetailId: number
  place: string
  startTime: string
  endTime: string
  content: string
  sessionImages: SessionImage[]
}

//세션 상세 이미지 업로드
interface SessionDetailImage {
  fileName: string
}
export interface SessionDetailImageRequest {
  sessionDetailId: number
  imageFileName: SessionDetailImage[]
}

//세션 상세 이미지 업로드 응답
export interface SessionDetailImageResponse {
  sessionImageId: number
  sessionImagePreSignedUrl: string
}
