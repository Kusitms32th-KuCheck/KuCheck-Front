// tests/e2e/helpers/signup.helper.ts
import { Page } from '@playwright/test'
import { SignupPage } from '../pages/signup.page'
import { APIHelper } from './api.helper'
import { SignUpDataType } from '@/types/sign-up'
import { signupFormData } from '../fixtures/users'
import { UserSummaryType } from '@/types/member/user'
import { UserType } from '@/types/common'

export class SignupHelper {
  private signupPage: SignupPage
  private apiHelper: APIHelper

  constructor(page: Page) {
    this.signupPage = new SignupPage(page)
    this.apiHelper = new APIHelper(page)
  }

  // ✅ 정상 회원가입 프로세스 (UI)
  async performValidSignup(formData = signupFormData.validSignup) {
    await this.signupPage.goto()
    await this.signupPage.fillSignupForm(formData)
    await this.signupPage.clickSubmitButton()
    await this.signupPage.waitForLoadingComplete()

    return {
      success: true,
      message: await this.signupPage.getSuccessMessage(),
    }
  }

  // ✅ 회원 가입 API 호출
  async postMembersOnboarding(data: SignUpDataType): Promise<UserType | null> {
    try {
      const response = await this.apiHelper.post('/v1/members/onboarding', data)
      if (!response.ok()) {
        throw new Error(`API Error: ${response.status()}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Failed to post members onboarding:', error)
      return null
    }
  }

  // ✅ 회원 요약 정보 조회 (프로필)
  async getMembersProfileSummary(): Promise<UserSummaryType | null> {
    try {
      const response = await this.apiHelper.get('/v1/members/profile/summary')
      if (!response.ok()) {
        throw new Error(`API Error: ${response.status()}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Failed to get members profile summary:', error)
      return null
    }
  }

  // ✅ 회원가입 후 사용자 정보 조회
  async getUserInfoAfterSignup() {
    try {
      return await this.getMembersProfileSummary()
    } catch (error) {
      console.error('회원 요약 정보 에러:', error)
      return null
    }
  }

  // ✅ 회원 상태 확인 (PENDING, APPROVED 등)
  async checkUserStatus(data: SignUpDataType): Promise<UserType | string> {
    const userInfo = await this.postMembersOnboarding(data)
    return userInfo?.status || 'UNKNOWN'
  }

  // ✅ 회원 역할 확인 (GUEST, USER, STAFF 등)
  async checkUserRole(data: SignUpDataType): Promise<UserType | string> {
    const userInfo = await this.postMembersOnboarding(data)
    return userInfo?.role || 'UNKNOWN'
  }

  // ✅ 여러 번 회원가입 (중복 테스트용)
  async signupMultipleUsers(
    formDataArray: Array<{
      name: string
      school: string
      major: string
      part: string
      phoneNumber: string
    }>
  ) {
    const results = []

    for (const formData of formDataArray) {
      await this.signupPage.goto()
      await this.signupPage.fillSignupForm(formData)
      await this.signupPage.clickSubmitButton()

      const isError = await this.signupPage.isErrorVisible()

      results.push({
        name: formData.name,
        success: !isError,
        error: isError ? await this.signupPage.getErrorMessage() : null,
      })

      // 다음 회원가입 전 잠깐 대기
      await this.signupPage.page.waitForTimeout(1000)
    }

    return results
  }

  // ✅ 필드별 에러 검증
  async validateFieldErrors(formData: Record<string, string>): Promise<Record<string, string>> {
    await this.signupPage.goto()
    await this.signupPage.fillSignupForm(
      formData as {
        name: string
        school: string
        major: string
        part: string
        phoneNumber: string
      }
    )
    await this.signupPage.clickSubmitButton()

    const errors: Record<string, string> = {}

    if (await this.signupPage.isVisible('input[name="name"]')) {
      const nameError = await this.signupPage.getNameError()
      if (nameError) errors.name = nameError
    }

    const schoolError = await this.signupPage.getSchoolError()
    if (schoolError) errors.school = schoolError

    const majorError = await this.signupPage.getMajorError()
    if (majorError) errors.major = majorError

    const partError = await this.signupPage.getPartError()
    if (partError) errors.part = partError

    const phoneError = await this.signupPage.getPhoneError()
    if (phoneError) errors.phone = phoneError

    return errors
  }

  // ✅ 회원가입 폼 유효성 검사
  async validateFormBeforeSubmit(formData: Record<string, string>) {
    await this.signupPage.goto()
    await this.signupPage.fillSignupForm(
      formData as {
        name: string
        school: string
        major: string
        part: string
        phoneNumber: string
      }
    )

    // 제출 버튼이 활성화되어 있는지 확인
    const isDisabled = await this.signupPage.isSubmitButtonDisabled()
    return !isDisabled // 활성화되면 true 반환
  }

  // ✅ 약관 동의 없이 제출 시도
  async trySubmitWithoutAgreement(formData = signupFormData.validSignup) {
    await this.signupPage.goto()
    await this.signupPage.enterName(formData.name)
    await this.signupPage.selectSchool(formData.school)
    await this.signupPage.enterMajor(formData.major)
    await this.signupPage.selectPart(formData.part)
    await this.signupPage.enterPhoneNumber(formData.phoneNumber)
    // 약관 동의 안 함
    await this.signupPage.clickSubmitButton()

    return {
      error: await this.signupPage.getAgreeError(),
      isError: await this.signupPage.isErrorVisible(),
    }
  }

  // ✅ 관리자가 회원 승인
  async approveUserAsAdmin(memberId: number) {
    try {
      const response = await this.apiHelper.post(`/v1/admin/members/${memberId}/approve`, {})
      if (!response.ok()) {
        throw new Error(`API Error: ${response.status()}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Failed to approve user:', error)
      return null
    }
  }

  // ✅ 회원 거절
  async rejectUserAsAdmin(memberId: number) {
    try {
      const response = await this.apiHelper.post(`/v1/admin/members/${memberId}/reject`, {})
      if (!response.ok()) {
        throw new Error(`API Error: ${response.status()}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Failed to reject user:', error)
      return null
    }
  }

  // ✅ 페이지에서 회원 정보 추출
  async extractSignupDataFromPage(): Promise<Record<string, string>> {
    return {
      name: await this.signupPage.getNameValue(),
      major: await this.signupPage.getMajorValue(),
      phone: await this.signupPage.getPhoneValue(),
    }
  }
}
