// tests/e2e/pages/signup.page.ts
import { BasePage } from './base.page'
import { Page } from '@playwright/test'

export class SignupPage extends BasePage {
  // ✅ UI 요소 정의
  private readonly nameInput = 'input[name="name"]'
  private readonly schoolSelect = 'select[name="school"]'
  private readonly majorInput = 'input[name="major"]'
  private readonly partSelect = 'select[name="part"]'
  private readonly phoneInput = 'input[name="phoneNumber"]'
  private readonly submitButton = 'button[type="submit"]:has-text("가입하기")'
  private readonly cancelButton = 'button:has-text("취소")'
  private readonly successMessage = '[role="status"]:has-text("완료")'
  private readonly errorMessage = '[role="alert"]'
  private readonly loadingSpinner = '[data-testid="loading"]'
  private readonly requiredFieldError = '.error-message'
  private readonly formContainer = 'form[data-testid="signup-form"]'
  private readonly nameError = '[data-testid="name-error"]'
  private readonly schoolError = '[data-testid="school-error"]'
  private readonly majorError = '[data-testid="major-error"]'
  private readonly partError = '[data-testid="part-error"]'
  private readonly phoneError = '[data-testid="phone-error"]'
  private readonly agreeCheckbox = 'input[type="checkbox"][name="agree"]'
  private readonly agreeError = '[data-testid="agree-error"]'

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    // ✅ 절대 URL로 테스트
    await this.page.goto('http://localhost:3000/sign-up', {
      waitUntil: 'domcontentloaded', // 혹은 'networkidle'
    })
    await this.waitForVisible(this.formContainer)
  }

  // ✅ 이름 입력
  async enterName(name: string) {
    await this.fill(this.nameInput, name)
  }

  // ✅ 학교 선택
  async selectSchool(school: string) {
    await this.page.locator(this.schoolSelect).selectOption(school)
  }

  // ✅ 학과 입력
  async enterMajor(major: string) {
    await this.fill(this.majorInput, major)
  }

  // ✅ 파트 선택
  async selectPart(part: string) {
    await this.page.locator(this.partSelect).selectOption(part)
  }

  // ✅ 핸드폰 번호 입력
  async enterPhoneNumber(phone: string) {
    await this.fill(this.phoneInput, phone)
  }

  // ✅ 전체 폼 작성 (조합 메서드)
  async fillSignupForm(formData: { name: string; school: string; major: string; part: string; phoneNumber: string }) {
    await this.enterName(formData.name)
    await this.selectSchool(formData.school)
    await this.enterMajor(formData.major)
    await this.selectPart(formData.part)
    await this.enterPhoneNumber(formData.phoneNumber)
  }

  // ✅ 가입 버튼 클릭
  async clickSubmitButton() {
    await this.click(this.submitButton)
  }

  // ✅ 취소 버튼 클릭
  async clickCancelButton() {
    await this.click(this.cancelButton)
  }

  // ✅ 전체 회원가입 프로세스
  async submitSignup(formData: { name: string; school: string; major: string; part: string; phoneNumber: string }) {
    await this.fillSignupForm(formData)
    await this.clickSubmitButton()
    await this.waitForLoadingComplete()
  }

  // ✅ 로딩 완료 대기
  async waitForLoadingComplete() {
    await this.page.locator(this.loadingSpinner).waitFor({
      state: 'hidden',
      timeout: 10000,
    })
  }

  // ✅ 성공 메시지 확인
  async waitForSuccessMessage() {
    await this.page.locator(this.successMessage).waitFor({
      state: 'visible',
      timeout: 5000,
    })
  }

  // ✅ 성공 메시지 텍스트
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage)
  }

  // ✅ 에러 메시지 확인
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage)
  }

  // ✅ 에러 메시지 표시 여부
  async isErrorVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage)
  }

  // ✅ 필드별 에러 메시지
  async getNameError(): Promise<string> {
    return await this.getText(this.nameError)
  }

  async getSchoolError(): Promise<string> {
    return await this.getText(this.schoolError)
  }

  async getMajorError(): Promise<string> {
    return await this.getText(this.majorError)
  }

  async getPartError(): Promise<string> {
    return await this.getText(this.partError)
  }

  async getPhoneError(): Promise<string> {
    return await this.getText(this.phoneError)
  }

  async getAgreeError(): Promise<string> {
    return await this.getText(this.agreeError)
  }

  // ✅ 제출 버튼 비활성화 여부
  async isSubmitButtonDisabled(): Promise<boolean> {
    return await this.isDisabled(this.submitButton)
  }

  // ✅ 입력값 읽기
  async getNameValue(): Promise<string> {
    return await this.getValue(this.nameInput)
  }

  async getMajorValue(): Promise<string> {
    return await this.getValue(this.majorInput)
  }

  async getPhoneValue(): Promise<string> {
    return await this.getValue(this.phoneInput)
  }
  // ✅ 약관 동의 체크
  async agreeToTerms() {
    await this.page.locator(this.agreeCheckbox).check()
  }

  // ✅ 폼 리셋 (새로고침)
  async resetForm() {
    await this.page.reload()
    await this.waitForVisible(this.formContainer)
  }

  // ✅ 모든 입력값 초기화
  async clearAllFields() {
    await this.page.locator(this.nameInput).clear()
    await this.page.locator(this.majorInput).clear()
    await this.page.locator(this.phoneInput).clear()
  }

  // ✅ 회원가입 후 리다이렉트 확인
  async waitForRedirectToHome() {
    await this.page.waitForURL('/', { timeout: 10000 })
  }
}
