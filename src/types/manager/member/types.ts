export const MEMBER_OPTIONS = [
  { label: '기획', value: '기획' },
  { label: '디자인', value: '디자인' },
  { label: '프론트엔드', value: '프론트엔드' },
  { label: '백엔드', value: '백엔드' },
]

//승인된 회원 명단 페이징 조회 응답
export interface MemberApprovedResponse {
  memberId: number
  name: string
  profileImageUrl: string | null
  part: string
  school: string
  major: string
  phoneNumber: string
  socialType: 'KAKAO' | 'APPLE'
  email: string
  role: 'USER' | 'MANAGEMENT' | 'STAFF' | 'ADMIN'
  isStaff: boolean
  approval: 'PENDING' | 'APPROVED' | 'REJECTED'
}

export interface MemberListResult {
  pendingCount: number
  approvedCount: number
  rejectedCount: number
  members: {
    data: MemberApprovedResponse[]
    totalPages: number
    isLastPage: boolean
  }
}

//승인 요청 목록 조회 응답
export interface MemberApprovalRequestResponse {
  memberId: number
  name: string
  profileImageUrl: string | null
  part: string
  school: string
  major: string
  phoneNumber: string
  socialType: 'KAKAO' | 'APPLE'
  email: string
  role: 'USER' | 'MANAGEMENT' | 'STAFF' | 'ADMIN'
  isStaff: boolean
  approval: 'PENDING' | 'APPROVED' | 'REJECTED'
  rejectionReason?: string | null
}

export interface MemberApprovalRequestListResponse {
  pendingCount: number
  approvedCount: number
  rejectedCount: number
  members: {
    data: MemberApprovalRequestResponse[]
    totalPages: number
    isLastPage: boolean
  }
}