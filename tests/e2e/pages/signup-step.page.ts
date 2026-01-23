// tests/e2e/pages/signup-step.page.ts
/**
 * Step 기반 회원가입 페이지 객체
 * URL의 step 파라미터에 따라 다른 컴포넌트가 렌더링되는 구조
 * /sign-up?step=1 → NameField
 * /sign-up?step=2 → PhoneNumberField
 * /sign-up?step=3 → SchoolField
 * /sign-up?step=4 → MajorField
 * /sign-up?step=5 → PartField
 * /sign-up?step=6 → StudentCardUploadField
 * /sign-up?step=7 → SignUpDataSubmitModal
 */

import { BasePage } from './base.page'
import { Page } from '@playwright/test'

export type StepType = '1' | '2' | '3' | '4' | '5' | '6' | '7'

export class SignupStepPage extends BasePage {
  // ==================== 공통 UI 요소 ====================
  private readonly header = 'header' // MemberHeader
  private readonly progressIndicator = '.body-lg-medium' // SignUpStepIndicator (X/6 형식)
  private readonly nextButton = 'button:has-text("다음")'
  private readonly submitButton = 'button:has-text("완료")'
  private readonly errorAlert = '.body-sm-medium.text-red-500[role="alert"]'
  private readonly loadingSpinner = '.animate-spin' // 로딩 스피너

  // ==================== Step 1: Name Field ====================
  private readonly nameInput = 'input[placeholder="이름"]'

  // ==================== Step 2: Phone Number Field ====================
  private readonly phoneInput = 'input[placeholder="휴대폰 번호"]'

  // ==================== Step 3: School Field ====================
  private readonly schoolInput = 'input[placeholder="학교 이름 입력"]'

  // ==================== Step 4: Major Field ====================
  private readonly majorInput = 'input[placeholder="학과"]'

  // ==================== Step 5: Part Field ====================
  private readonly partHeading = 'text=파트를 선택해 주세요'

  // ==================== Step 6: Student Card Upload ====================
  private readonly cardHeading = 'text=사진을 업로드 해주세요'

  // ==================== Step 7: Submit Modal ====================
  private readonly submitModalHeading = 'text=승인 절차를 진행 중이에요'
  private readonly submitModalSubheading = 'text=승인이 완료되면 바로 알려드릴게요'
  private readonly submitModalWarning = 'text=일주일 이상 승인되지 않을 시'

  constructor(page: Page) {
    super(page)
  }

  // ==================== 페이지 네비게이션 ====================

  /**
   * 특정 step으로 이동
   * @param step 이동할 step (1-7)
   */
  async gotoStep(step: StepType) {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    await this.page.goto(`${baseUrl}/sign-up?step=${step}`, {
      waitUntil: 'domcontentloaded',
    })
    await this.waitForLoadingComplete()
  }

  /**
   * 회원가입 페이지 진입 (기본값 step=1)
   */
  async goto() {
    await this.gotoStep('1')
    await this.waitForVisible(this.header)
  }

  /**
   * 현재 URL의 step 파라미터 조회
   */
  async getCurrentStep(): Promise<StepType | null> {
    const url = await this.getCurrentURL()
    const params = new URLSearchParams(url.split('?')[1])
    const step = params.get('step') as StepType | null
    return step && ['1', '2', '3', '4', '5', '6', '7'].includes(step) ? step : null
  }

  // ==================== Step 이동 ====================

  /**
   * 다음 버튼 클릭 (단계별로 다름)
   * - Step 1-5: "다음" 버튼 → 다음 단계 제목 대기
   * - Step 6: "완료" 버튼 → 승인 모달 대기
   */
  async clickNext() {
    const step = await this.getCurrentStep()

    if (step === '6') {
      // Step 6: 이미지 업로드 후 완료
      await this.click(this.submitButton)

      // 승인 모달이 나타날 때까지 대기
      await this.page.locator(this.submitModalHeading).waitFor({ state: 'visible' })
    } else {
      // Step 1-5: 다음 단계로 이동
      await this.click(this.nextButton)

      // 다음 단계의 제목이 보일 때까지 대기
      // (네트워크 요청 완료 + UI 렌더링 완료)
      await this.page.locator(this.progressIndicator).waitFor({ state: 'visible' })
    }
  }

  /**
   * 이전 step으로 이동 (뒤로가기)
   * 실제 컴포넌트에는 prev 버튼이 없으므로 직접 URL 변경
   */
  async clickPrev() {
    const currentStep = await this.getCurrentStep()
    if (!currentStep || currentStep === '1') return

    const stepNum = parseInt(currentStep)
    const prevStep = (stepNum - 1).toString() as StepType

    await this.gotoStep(prevStep)
  }

  /**
   * Step 진행 진행률 조회 (예: "1/6")
   */
  async getProgressText(): Promise<string> {
    return await this.getText(this.progressIndicator)
  }

  // ==================== Step 1: Name Field ====================

  /**
   * 이름 입력 + 상태 업데이트
   */
  async enterName(name: string) {
    const input = this.page.locator(this.nameInput)

    // 1️⃣ 입력 필드 포커스
    await input.focus()

    // 2️⃣ 기존 값 제거
    await input.clear()

    // 3️⃣ 값 입력
    await input.fill(name)

    // 4️⃣ 상태 업데이트 대기
    await this.page.waitForTimeout(300)

    // 5️⃣ ✅ blur 추가 (검증 트리거)
    await input.blur()

    // 6️⃣ 추가 대기
    await this.page.waitForTimeout(100)
  }

  /**
   * 입력된 이름 조회
   */
  async getNameValue(): Promise<string> {
    return await this.getValue(this.nameInput)
  }

  /**
   * 이름 입력 필드 표시 여부
   */
  async isNameFieldVisible(): Promise<boolean> {
    return await this.isVisible(this.nameInput)
  }

  // ==================== Step 2: Phone Number Field ====================

  /**
   * 휴대폰 번호 입력
   */
  async enterPhone(phone: string) {
    await this.fill(this.phoneInput, phone)
  }

  /**
   * 입력된 휴대폰 번호 조회
   */
  async getPhoneValue(): Promise<string> {
    return await this.getValue(this.phoneInput)
  }

  /**
   * 휴대폰 입력 필드 표시 여부
   */
  async isPhoneFieldVisible(): Promise<boolean> {
    return await this.isVisible(this.phoneInput)
  }

  // ==================== Step 3: School Field ====================

  /**
   * 학교 검색
   */
  async searchSchool(keyword: string) {
    await this.fill(this.schoolInput, keyword)
    // 검색 결과 대기
    await this.page.waitForTimeout(300)
  }

  /**
   * 학교 입력 필드에 값 입력
   */
  async enterSchool(school: string) {
    await this.fill(this.schoolInput, school)
  }

  /**
   * 입력된 학교 조회
   */
  async getSchoolValue(): Promise<string> {
    return await this.getValue(this.schoolInput)
  }

  /**
   * 검색된 학교 옵션 선택
   */
  async selectSchoolFromSearchResults(schoolName: string) {
    // 드롭다운에서 해당 학교 찾아 클릭
    const schoolOption = this.page.locator(`.border-b.border-gray-100:has-text("${schoolName}")`)
    await schoolOption.first().click()
  }

  /**
   * 학교 필드 표시 여부
   */
  async isSchoolFieldVisible(): Promise<boolean> {
    return await this.isVisible(this.schoolInput)
  }

  // ==================== Step 4: Major Field ====================

  /**
   * 학과 입력
   */
  async enterMajor(major: string) {
    await this.fill(this.majorInput, major)
  }

  /**
   * 입력된 학과 조회
   */
  async getMajorValue(): Promise<string> {
    return await this.getValue(this.majorInput)
  }

  /**
   * 학과 필드 표시 여부
   */
  async isMajorFieldVisible(): Promise<boolean> {
    return await this.isVisible(this.majorInput)
  }

  // ==================== Step 5: Part Field ====================

  /**
   * 파트 선택 (클릭)
   * @param partName 파트명 (기획, 디자인, 프론트엔드, 백엔드)
   */
  async selectPart(partName: 'PLANNING' | 'DESIGN' | 'FRONTEND' | 'BACKEND') {
    const partTextMap = {
      PLANNING: '기획',
      DESIGN: '디자인',
      FRONTEND: '프론트엔드',
      BACKEND: '백엔드',
    }

    const text = partTextMap[partName]
    await this.page.locator(`.grid.grid-cols-2 div:has-text("${text}")`).click()
  }
  /**
   * 파트 필드 표시 여부
   */
  async isPartFieldVisible(): Promise<boolean> {
    return await this.isVisible(this.partHeading)
  }

  /**
   * 학생증 업로드 필드 표시 여부
   */
  async isCardUploadFieldVisible(): Promise<boolean> {
    return await this.isVisible(this.cardHeading)
  }

  // ==================== Step 7: Submit Modal ====================

  /**
   * 최종 제출 모달 표시 여부
   */
  async isSubmitModalVisible(): Promise<boolean> {
    return await this.isVisible(this.submitModalHeading)
  }

  /**
   * 제출 모달 콘텐츠 확인
   */
  async getSubmitModalContent(): Promise<{
    heading: string
    subheading: string
    warning: string
  }> {
    const heading = await this.getText(this.submitModalHeading)
    const subheading = await this.getText(this.submitModalSubheading)
    const warning = await this.getText(this.submitModalWarning)

    return { heading, subheading, warning }
  }

  // ==================== 공통 메서드 ====================

  /**
   * 에러 메시지 표시 여부
   */
  async isErrorVisible(): Promise<boolean> {
    return await this.isVisible(this.errorAlert)
  }

  /**
   * 로딩 완료 대기
   */
  async waitForLoadingComplete() {
    try {
      await this.page.locator(this.loadingSpinner).waitFor({
        state: 'hidden',
        timeout: 5000,
      })
    } catch {
      // 로딩 스피너가 없을 수도 있음
    }
  }

  /**
   * 다음 버튼의 활성화 상태 확인
   */
  async isNextButtonEnabled(): Promise<boolean> {
    return await this.page.locator(this.nextButton).isEnabled()
  }

  /**
   * 에러 메시지 표시 여부
   */
  async isErrorAlertVisible(): Promise<boolean> {
    return await this.isErrorVisible()
  }
}
