import { PartType, SignUpDataType } from '@/types/sign-up'

// ==================== Type Definitions ====================

/** 배열 요소 타입 추출 */
type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer U)[] ? U : never

/**
 * 테스트에 필요한 다양한 타입의 데이터를 생성하는 헬퍼 클래스
 * 팩토리 패턴을 사용하여 일관된 테스트 데이터를 제공합니다.
 */
export class DataHelper {
  private static readonly KOREAN_SCHOOLS: string[] = [
    '충북대학교',
    '숙명여자대학교',
    '중앙대학교',
    '서울대학교',
    '고려대학교',
    '연세대학교',
    '이화여자대학교',
    '성균관대학교',
  ] as const

  private static readonly MAJORS: string[] = [
    '의류학과',
    '소프트웨어학과',
    'IT공학전공',
    '경영학과',
    '컴퓨터공학과',
    '정보통신공학과',
    '국문학과',
    '영문학과',
  ] as const

  private static readonly PARTS: PartType[] = ['PLANNING', 'FRONTEND', 'BACKEND', 'DESIGN'] as const

  private static readonly KOREAN_NAMES: string[] = [
    '황유림',
    '김',
    '김철수이순신이순신이',
    '김선화',
    '이유정',
    '박지현',
    '최준호',
    '이준석',
    '김민준',
    '이세영',
  ] as const

  /**
   * 고유한 회원가입 데이터 생성 (모든 필드 optional)
   * @param overrides - 기본값을 오버라이드할 필드들
   * @returns 생성된 회원가입 데이터
   */
  createSignupData(overrides?: SignUpDataType): SignUpDataType {
    const baseData: SignUpDataType = {
      name: this.getRandomElement(DataHelper.KOREAN_NAMES),
      school: this.getRandomElement(DataHelper.KOREAN_SCHOOLS),
      major: this.getRandomElement(DataHelper.MAJORS),
      part: this.getRandomElement(DataHelper.PARTS),
      phoneNumber: this.generatePhoneNumber(),
      fcmToken: this.generateFcmToken(),
      ...overrides,
    }

    return baseData
  }

  /**
   * 한국 휴대폰 번호 생성 (010-XXXX-XXXX 형식)
   * @returns 생성된 휴대폰 번호
   */
  generatePhoneNumber(): string {
    const randomNumber = Math.floor(Math.random() * 900000000) + 10000000
    return `010-${String(randomNumber).slice(0, 4)}-${String(randomNumber).slice(4)}`
  }

  /**
   * FCM 토큰 생성
   * @returns 생성된 FCM 토큰
   */
  generateFcmToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    let token = ''
    for (let i = 0; i < 152; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return token
  }

  // ==================== Private Methods ====================

  /**
   * 배열에서 랜덤 요소 선택
   */
  private getRandomElement<T extends readonly unknown[]>(array: T): ArrayElement<T> {
    const index = Math.floor(Math.random() * array.length)
    return array[index] as ArrayElement<T>
  }
}
