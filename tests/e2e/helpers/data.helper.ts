import { PartType, SignUpDataType } from '@/types/sign-up'
import { UserRoleType, UserStatusType, UserType } from '@/types/common'

// ==================== Type Definitions ====================

/** 배열 요소 타입 추출 */
type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer U)[] ? U : never

/** SignUpDataType의 필드 키 */
type SignUpDataTypeKeys = keyof SignUpDataType
/** 테스트 시나리오 데이터 타입 */
interface TestScenarios {
  readonly validSignup: SignUpDataType
  readonly missingName: SignUpDataType
  readonly missingSchool: SignUpDataType
  readonly missingMajor: SignUpDataType
  readonly missingPart: SignUpDataType
  readonly missingPhone: SignUpDataType
  readonly invalidPhone: SignUpDataType
  readonly tooLongName: SignUpDataType
  readonly specialCharInName: SignUpDataType
  readonly duplicateFirstSignup: SignUpDataType
  readonly duplicateSecondSignup: SignUpDataType
  readonly boundaryMinName: SignUpDataType
  readonly boundaryMaxName: SignUpDataType
}

/** Mock 사용자 데이터 */
type MockUserData = Readonly<UserType> & {
  readonly createdAt: string
}

/** Mock 사용자 요약 데이터 */
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
    '김선화',
    '이유정',
    '박지현',
    '최준호',
    '이준석',
    '김민준',
    '이세영',
  ] as const

  private static readonly MALFORMED_VALUES: { phoneNumber: string; major: string; school: string; name: string } = {
    phoneNumber: '12345',
    name: 'A'.repeat(100),
    major: '@#$%^&*()',
    school: '123456789',
  }

  private static readonly BOUNDARY_VALUES: Readonly<Record<'name' | 'phoneNumber' | 'major', readonly string[]>> = {
    name: ['', '가', 'A'.repeat(100)],
    phoneNumber: ['', '123', '010-7777-7777'],
    major: ['', '가', 'A'.repeat(50)],
  }

  private counter: number = 0

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
   * 다중 회원가입 데이터 배치 생성
   * @param count - 생성할 데이터 개수
   * @param overridesArray - 각 데이터별 오버라이드 설정 (옵션)
   * @returns 생성된 회원가입 데이터 배열
   */
  createSignupDataBatch(count: number, overridesArray?: readonly SignUpDataType[]): readonly SignUpDataType[] {
    return Array.from({ length: count }, (_, index) => this.createSignupData(overridesArray?.[index]))
  }

  /**
   * 특정 필드가 undefined인 회원가입 데이터 생성 (유효성 검사 테스트용)
   * @template K - 비워야 할 필드의 키 타입
   * @param missingFields - 비워야 할 필드들
   * @param overrides - 추가 오버라이드
   * @returns 필드가 비어있는 회원가입 데이터
   */
  createInvalidSignupData<K extends readonly SignUpDataTypeKeys[] = readonly SignUpDataTypeKeys[]>(
    missingFields: K = [] as unknown as K,
    overrides?: SignUpDataType
  ): SignUpDataType {
    const baseData = this.createSignupData(overrides)

    // 타입 안전하게 필드를 undefined로 설정
    missingFields.forEach((field: K[number]) => {
      baseData[field] = undefined
    })

    return baseData
  }

  /**
   * 잘못된 형식의 데이터 생성 (형식 검증 테스트용)
   * @param invalidFields - 잘못된 형식을 적용할 필드들
   * @returns 잘못된 형식의 데이터
   */
  createMalformedData(
    invalidFields: readonly (keyof typeof DataHelper.MALFORMED_VALUES)[] = ['phoneNumber']
  ): SignUpDataType {
    const baseData = this.createSignupData()

    invalidFields.forEach((field: keyof typeof DataHelper.MALFORMED_VALUES) => {
      const malformedValue = DataHelper.MALFORMED_VALUES[field]
      if (malformedValue) {
        baseData[field] = malformedValue as never
      }
    })

    return baseData
  }

  /**
   * 고유한 이메일 주소 생성
   * @param prefix - 이메일 프리픽스 (선택)
   * @returns 생성된 이메일
   */
  generateUniqueEmail(prefix: string = 'test'): string {
    this.counter++
    return `${prefix}.${this.counter}@example.com`
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

  /**
   * Mock 사용자 응답 데이터 생성
   * @param overrides - 기본값 오버라이드
   * @returns 생성된 사용자 데이터
   */
  createMockUser(
    overrides?: Partial<{ phoneNumber: string; major: string; school: string; name: string; part: PartType }>
  ): MockUserData {
    const user: MockUserData = {
      memberId: this.generateRandomId(),
      name: this.getRandomElement(DataHelper.KOREAN_NAMES),
      phoneNumber: this.generatePhoneNumber(),
      school: this.getRandomElement(DataHelper.KOREAN_SCHOOLS),
      major: this.getRandomElement(DataHelper.MAJORS),
      part: this.getRandomElement(DataHelper.PARTS),
      status: 'PENDING',
      role: 'GUEST',
      hasInfo: true,
      createdAt: new Date().toISOString(),
      ...overrides,
    }

    return user
  }

  /**
   * Mock 사용자 요약 데이터 생성
   * @param overrides - 기본값 오버라이드
   * @returns 생성된 사용자 요약 데이터
   */
  createMockUserSummary(
    overrides?: Partial<{
      phoneNumber: string
      major: string
      school: string
      name: string
      part: PartType
      status: UserStatusType
      role: UserRoleType
    }>
  ): {
    role: string
    major: string
    school: string
    part: 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLANNING'
    name: string
    status: string
  } {
    return {
      name: this.getRandomElement(DataHelper.KOREAN_NAMES),
      school: this.getRandomElement(DataHelper.KOREAN_SCHOOLS),
      major: this.getRandomElement(DataHelper.MAJORS),
      part: this.getRandomElement(DataHelper.PARTS),
      status: 'PENDING',
      role: 'GUEST',
      ...overrides,
    }
  }

  /**
   * 특정 상태의 다중 Mock 사용자 생성
   * @param count - 생성할 사용자 수
   * @param status - 사용자 상태 (PENDING, APPROVED, REJECTED)
   * @returns 생성된 사용자 배열
   */
  createMockUserBatch(count: number, status?: 'PENDING' | 'APPROVED' | 'REJECTED'): readonly MockUserData[] {
    return Array.from({ length: count }, () => this.createMockUser(status ? { status } : undefined))
  }

  /**
   * 부분 업데이트를 위한 데이터 생성
   * @template K - 선택할 필드의 키 타입
   * @param fieldsToUpdate - 업데이트할 필드들
   * @returns 부분 업데이트 데이터
   */
  createPartialUpdateData<K extends readonly SignUpDataTypeKeys[]>(
    fieldsToUpdate: K
  ): Partial<Pick<SignUpDataType, K[number]>> {
    const baseData = this.createSignupData()
    const partialData: Partial<SignUpDataType> = {}

    fieldsToUpdate.forEach((field: K[number]) => {
      partialData[field] = baseData[field]
    })

    return partialData as Partial<Pick<SignUpDataType, K[number]>>
  }

  /**
   * 임계값 테스트용 경계값 데이터 생성
   * @param fieldName - 테스트할 필드명
   * @returns 경계값 데이터 객체 배열
   */
  createBoundaryTestData(fieldName: 'name' | 'phoneNumber' | 'major'): readonly SignUpDataType[] {
    const boundaries = DataHelper.BOUNDARY_VALUES[fieldName]

    return boundaries.map((value: string) => this.createSignupData({ [fieldName]: value } as SignUpDataType))
  }

  /**
   * 테스트 시나리오용 샘플 데이터 집합 생성
   * @returns 다양한 테스트 케이스를 위한 샘플 데이터 객체
   */
  createTestScenarios(): TestScenarios {
    return {
      // 정상 회원가입
      validSignup: this.createSignupData(),

      // 필드 누락 시나리오
      missingName: this.createInvalidSignupData(['name']),
      missingSchool: this.createInvalidSignupData(['school']),
      missingMajor: this.createInvalidSignupData(['major']),
      missingPart: this.createInvalidSignupData(['part']),
      missingPhone: this.createInvalidSignupData(['phoneNumber']),

      // 형식 오류 시나리오
      invalidPhone: this.createMalformedData(['phoneNumber']),
      tooLongName: this.createMalformedData(['name']),
      specialCharInName: this.createSignupData({ name: '@#$%^' }),

      // 중복 가입 시나리오
      duplicateFirstSignup: this.createSignupData({
        name: '김민준',
        phoneNumber: '010-1234-5678',
      }),
      duplicateSecondSignup: this.createSignupData({
        name: '김민준',
        phoneNumber: '010-1234-5678',
      }),

      // 경계값 시나리오
      boundaryMinName: this.createSignupData({ name: '가' }),
      boundaryMaxName: this.createSignupData({ name: 'A'.repeat(50) }),
    }
  }

  /**
   * 테스트 코드에서 데이터 초기화 (counter 리셋)
   */
  reset(): void {
    this.counter = 0
  }

  // ==================== Private Methods ====================

  /**
   * 배열에서 랜덤 요소 선택
   */
  private getRandomElement<T extends readonly unknown[]>(array: T): ArrayElement<T> {
    const index = Math.floor(Math.random() * array.length)
    return array[index] as ArrayElement<T>
  }

  /**
   * 1 ~ 10000 사이의 임의의 사용자 ID 생성
   */
  private generateRandomId(): number {
    return Math.floor(Math.random() * 10000) + 1
  }
}

/**
 * DataHelper의 빌더 패턴 버전
 */
export class SignupDataBuilder {
  private data: SignUpDataType = {}

  /**
   * 이름 필드 설정
   */
  withName(name: string): this {
    this.data.name = name
    return this
  }

  /**
   * 학교 필드 설정
   */
  withSchool(school: string): this {
    this.data.school = school
    return this
  }

  /**
   * 학과 필드 설정
   */
  withMajor(major: string): this {
    this.data.major = major
    return this
  }

  /**
   * 파트 필드 설정
   */
  withPart(part: PartType): this {
    this.data.part = part
    return this
  }

  /**
   * 휴대폰 번호 필드 설정
   */
  withPhoneNumber(phoneNumber: string): this {
    this.data.phoneNumber = phoneNumber
    return this
  }

  /**
   * FCM 토큰 필드 설정
   */
  withFcmToken(fcmToken: string): this {
    this.data.fcmToken = fcmToken
    return this
  }

  /**
   * 회원가입 데이터 생성 (모든 필드가 optional이므로 부분 입력 가능)
   */
  build(): SignUpDataType {
    return { ...this.data }
  }

  /**
   * 빌더 초기화
   */
  reset(): this {
    this.data = {}
    return this
  }
}
