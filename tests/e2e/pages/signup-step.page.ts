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
  private readonly schoolHeading = 'text=대학교를 입력해 주세요'
  private readonly schoolDropdown = '.absolute.top-full' // 드롭다운 메뉴
  private readonly schoolDropdownItem = '.border-b.border-gray-100' // 드롭다운 아이템
  private readonly schoolDropdownEmpty = 'text=검색 결과가 없습니다'

  // ==================== Step 4: Major Field ====================
  private readonly majorInput = 'input[placeholder="학과"]'
  private readonly majorHeading = 'text=학과를 알려주세요'
  private readonly majorHint = 'text=복수 전공이 있다면'

  // ==================== Step 5: Part Field ====================
  private readonly partHeading = 'text=파트를 선택해 주세요'
  private readonly partButton = '.grid.grid-cols-2 div' // 2x2 그리드의 파트 버튼
  private readonly partButtonSelected = '.bg-primary-50.border-primary-500'
  private readonly partNames = {
    planning: 'text=기획',
    design: 'text=디자인',
    frontend: 'text=프론트엔드',
    backend: 'text=백엔드',
  }

  // ==================== Step 6: Student Card Upload ====================
  private readonly cardHeading = 'text=사진을 업로드 해주세요'
  private readonly cardUploadInput = 'input[type="file"]'
  private readonly cardUploadArea = '.flex.h-\\[232px\\]' // 업로드 영역
  private readonly cardPreview = 'img[alt="프로필"]'
  private readonly cardPreviewContainer = '.border.border-gray-200.bg-gray-100'
  private readonly cardUploadIcon = 'svg' // ImageUploaderIcon
  private readonly cardReuploadButton = 'button:has-text("다시 선택하기")'

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
   * 학교 드롭다운 표시 여부
   */
  async isSchoolDropdownVisible(): Promise<boolean> {
    return await this.isVisible(this.schoolDropdown)
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
   * 선택된 파트 조회
   */
  async getSelectedPart(): Promise<string | null> {
    // 선택된 파트의 텍스트 조회
    return await this.page
      .locator(`.bg-primary-50.border-primary-500 + div, .bg-primary-50.border-primary-500`)
      .textContent()
  }

  /**
   * 파트 필드 표시 여부
   */
  async isPartFieldVisible(): Promise<boolean> {
    return await this.isVisible(this.partHeading)
  }

  // ==================== Step 6: Student Card Upload ====================

  /**
   * 학생증 이미지 업로드
   */
  async uploadStudentCard(filePath: string) {
    await this.page.locator(this.cardUploadInput).setInputFiles(filePath)
    // 이미지 로드 대기
    await this.page.waitForTimeout(500)
  }

  /**
   * 이미지 업로드 입력 필드 클릭 (파일 선택 다이얼로그 열기)
   */
  async clickUploadArea() {
    await this.click(this.cardUploadArea)
  }

  /**
   * 학생증 카드 미리보기 표시 여부
   */
  async isCardPreviewVisible(): Promise<boolean> {
    return await this.isVisible(this.cardPreview)
  }

  /**
   * 학생증 업로드 필드 표시 여부
   */
  async isCardUploadFieldVisible(): Promise<boolean> {
    return await this.isVisible(this.cardHeading)
  }

  /**
   * "다시 선택하기" 버튼 클릭
   */
  async clickReuploadButton() {
    await this.click(this.cardReuploadButton)
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
   * 에러 메시지 조회
   */
  async getErrorMessage(): Promise<string> {
    try {
      return await this.getText(this.errorAlert)
    } catch {
      return ''
    }
  }

  /**
   * 특정 step 필드 표시 여부 확인
   */
  async isStepFieldVisible(step: StepType): Promise<boolean> {
    switch (step) {
      case '1':
        return await this.isNameFieldVisible()
      case '2':
        return await this.isPhoneFieldVisible()
      case '3':
        return await this.isSchoolFieldVisible()
      case '4':
        return await this.isMajorFieldVisible()
      case '5':
        return await this.isPartFieldVisible()
      case '6':
        return await this.isCardUploadFieldVisible()
      case '7':
        return await this.isSubmitModalVisible()
      default:
        return false
    }
  }

  /**
   * 페이지 뷰포트 설정 (모바일/데스크톱)
   */
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 812 })
  }

  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1280, height: 720 })
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
