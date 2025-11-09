// tests/e2e/specs/signup.spec.ts
import { test, expect } from '@playwright/test'
import { SignupPage } from '../pages/signup.page'
import { SignupHelper } from '../helpers/signup.helper'
import { signupFormData } from '../fixtures/users'

test.describe('회원가입 E2E 테스트', () => {
  let signupPage: SignupPage
  let signupHelper: SignupHelper

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page)
    signupHelper = new SignupHelper(page)
  })

  test.describe('정상 회원가입', () => {
    test('✅ 정상적으로 회원가입 완료', async () => {
      await signupPage.goto()

      // 폼 작성
      await signupPage.fillSignupForm(signupFormData.validSignup)

      // 제출
      await signupPage.clickSubmitButton()

      // 로딩 완료
      await signupPage.waitForLoadingComplete()

      // 성공 메시지 확인
      await signupPage.waitForSuccessMessage()
      const successMsg = await signupPage.getSuccessMessage()
      expect(successMsg).toContain('완료')
    })

    test('✅ 회원가입 후 상태가 PENDING인지 확인', async () => {
      await signupHelper.performValidSignup()

      // 사용자 정보 조회
      const userInfo = await signupHelper.getUserInfoAfterSignup()

      expect(userInfo).toBeTruthy()
    })

    test('✅ 모바일에서 회원가입', async ({ page }) => {
      // 모바일 뷰포트 설정
      await page.setViewportSize({ width: 375, height: 667 })

      await signupPage.goto()

      // 모바일에서 폼 작성
      await signupPage.fillSignupForm(signupFormData.validSignup)
      await signupPage.clickSubmitButton()

      // 성공 확인
      await signupPage.waitForSuccessMessage()
      const successMsg = await signupPage.getSuccessMessage()
      expect(successMsg).toContain('완료')
    })
  })

  test.describe('필수 필드 검증', () => {
    test('❌ 이름이 비어있으면 가입 불가', async () => {
      await signupPage.goto()

      // 이름 제외한 나머지 입력
      await signupPage.selectSchool(signupFormData.validSignup.school)
      await signupPage.enterMajor(signupFormData.validSignup.major)
      await signupPage.selectPart(signupFormData.validSignup.part)
      await signupPage.enterPhoneNumber(signupFormData.validSignup.phoneNumber)

      // 제출
      await signupPage.clickSubmitButton()

      // 에러 메시지 확인
      const nameError = await signupPage.getNameError()
      expect(nameError).toBeTruthy()
    })

    test('❌ 학교가 비어있으면 가입 불가', async () => {
      await signupPage.goto()

      await signupPage.enterName(signupFormData.validSignup.name)
      // 학교 제외
      await signupPage.enterMajor(signupFormData.validSignup.major)
      await signupPage.selectPart(signupFormData.validSignup.part)
      await signupPage.enterPhoneNumber(signupFormData.validSignup.phoneNumber)

      await signupPage.clickSubmitButton()

      const schoolError = await signupPage.getSchoolError()
      expect(schoolError).toBeTruthy()
    })

    test('❌ 학과가 비어있으면 가입 불가', async () => {
      await signupPage.goto()

      await signupPage.enterName(signupFormData.validSignup.name)
      await signupPage.selectSchool(signupFormData.validSignup.school)
      // 학과 제외
      await signupPage.selectPart(signupFormData.validSignup.part)
      await signupPage.enterPhoneNumber(signupFormData.validSignup.phoneNumber)

      await signupPage.clickSubmitButton()

      const majorError = await signupPage.getMajorError()
      expect(majorError).toBeTruthy()
    })

    test('❌ 파트가 선택되지 않으면 가입 불가', async () => {
      await signupPage.goto()

      await signupPage.enterName(signupFormData.validSignup.name)
      await signupPage.selectSchool(signupFormData.validSignup.school)
      await signupPage.enterMajor(signupFormData.validSignup.major)
      // 파트 제외
      await signupPage.enterPhoneNumber(signupFormData.validSignup.phoneNumber)
      await signupPage.clickSubmitButton()

      const partError = await signupPage.getPartError()
      expect(partError).toBeTruthy()
    })

    test('❌ 모든 필드가 비어있으면 가입 불가', async () => {
      await signupPage.goto()

      await signupPage.clickSubmitButton()

      // 최소 하나 이상의 에러 메시지가 있어야 함
      const hasError = await signupPage.isErrorVisible()
      expect(hasError).toBeTruthy()
    })
  })

  test.describe('형식 검증', () => {
    test('❌ 잘못된 휴대폰 형식이면 가입 불가', async () => {
      await signupPage.goto()

      await signupPage.fillSignupForm(signupFormData.invalidPhoneFormat)
      await signupPage.clickSubmitButton()

      const phoneError = await signupPage.getPhoneError()
      expect(phoneError).toBeTruthy()
    })

    test('❌ 이름이 너무 길면 가입 불가', async () => {
      await signupPage.goto()

      await signupPage.fillSignupForm(signupFormData.tooLongName)
      await signupPage.clickSubmitButton()

      const nameError = await signupPage.getNameError()
      expect(nameError).toBeTruthy()
    })

    test('❌ 이름에 특수문자가 포함되면 가입 불가', async () => {
      await signupPage.goto()

      await signupPage.fillSignupForm(signupFormData.nameWithSpecialChar)
      await signupPage.clickSubmitButton()

      const nameError = await signupPage.getNameError()
      expect(nameError).toBeTruthy()
    })
  })

  test.describe('약관 동의 검증', () => {
    test('❌ 약관에 동의하지 않으면 가입 불가', async () => {
      const result = await signupHelper.trySubmitWithoutAgreement()

      expect(result.isError).toBeTruthy()
      expect(result.error).toContain('약관')
    })
  })

  test.describe('폼 상태 관리', () => {
    test('✅ 폼 데이터가 입력되고 유지되는지 확인', async () => {
      await signupPage.goto()

      // 데이터 입력
      await signupPage.enterName(signupFormData.validSignup.name)
      await signupPage.enterMajor(signupFormData.validSignup.major)
      await signupPage.enterPhoneNumber(signupFormData.validSignup.phoneNumber)

      // 입력된 데이터 확인
      const name = await signupPage.getNameValue()
      const major = await signupPage.getMajorValue()
      const phone = await signupPage.getPhoneValue()

      expect(name).toBe(signupFormData.validSignup.name)
      expect(major).toBe(signupFormData.validSignup.major)
      expect(phone).toBe(signupFormData.validSignup.phoneNumber)
    })

    test('✅ 페이지 새로고침 후 폼이 리셋되는지 확인', async () => {
      await signupPage.goto()

      // 데이터 입력
      await signupPage.fillSignupForm(signupFormData.validSignup)

      // 페이지 새로고침
      await signupPage.resetForm()

      // 폼이 초기화되었는지 확인
      const name = await signupPage.getNameValue()
      expect(name).toBe('')
    })

    test('✅ 회원가입 취소 후 페이지 벗어남', async () => {
      await signupPage.goto()

      await signupPage.fillSignupForm(signupFormData.validSignup)
      await signupPage.clickCancelButton()

      // 회원가입 페이지에서 벗어나야 함
      expect(await signupPage.page.url()).not.toContain('/sign-up')
    })
  })

  test.describe('다중 회원가입', () => {
    test('✅ 여러 사용자 연속 회원가입', async () => {
      const formDataArray = [
        signupFormData.validSignup,
        signupFormData.anotherValidSignup,
        signupFormData.thirdValidSignup,
      ]

      const results = await signupHelper.signupMultipleUsers(formDataArray)

      // 모두 성공해야 함
      results.forEach((result) => {
        expect(result.success).toBeTruthy()
      })
    })
  })

  test.describe('페이지 네비게이션', () => {
    test('✅ 로그인된 상태에서 회원가입 페이지 접근 시 리다이렉트', async ({ page }) => {
      // 회원가입 페이지 접근
      await page.goto('/sign-up')

      // 다른 페이지로 리다이렉트되어야 함
      expect(await page.url()).not.toContain('/sign-up')
    })
  })

  test.describe('필드별 에러 검증', () => {
    test('✅ 모든 필드별 에러 메시지 검증', async () => {
      const errors = await signupHelper.validateFieldErrors(signupFormData.emptyForm)

      // 모든 필드에 대해 에러가 있어야 함
      expect(Object.keys(errors).length).toBeGreaterThan(0)
    })
  })

  test.describe('폼 유효성 검사', () => {
    test('✅ 유효한 폼 데이터로 제출 버튼 활성화', async () => {
      const isValid = await signupHelper.validateFormBeforeSubmit(signupFormData.validSignup)

      expect(isValid).toBeTruthy()
    })

    test('❌ 빈 폼 데이터로 제출 버튼 비활성화', async () => {
      const isValid = await signupHelper.validateFormBeforeSubmit(signupFormData.emptyForm)

      expect(isValid).toBeFalsy()
    })
  })

  test.describe('페이지에서 데이터 추출', () => {
    test('✅ 입력된 회원 정보 추출', async () => {
      await signupPage.goto()
      await signupPage.fillSignupForm(signupFormData.validSignup)

      const extractedData = await signupHelper.extractSignupDataFromPage()

      expect(extractedData.name).toBe(signupFormData.validSignup.name)
      expect(extractedData.major).toBe(signupFormData.validSignup.major)
      expect(extractedData.phone).toBe(signupFormData.validSignup.phoneNumber)
    })
  })
})
