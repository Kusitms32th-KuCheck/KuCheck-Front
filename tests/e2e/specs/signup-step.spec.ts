// tests/e2e/specs/signup-step.spec.ts
/**
 * Step 기반 회원가입 E2E 테스트
 *
 * 테스트 범위:
 * 1. Step별 필드 검증
 * 2. Step 진행 흐름 (Next/Prev)
 * 3. 데이터 유지 확인
 * 4. 형식 검증
 * 5. 모바일/반응형
 * 6. 예외 상황 처리
 */

import { test, expect } from '@playwright/test'
import { SignupStepPage } from '../pages/signup-step.page'
import { DataHelper } from '../helpers/data.helper'

test.describe('Step 기반 회원가입 E2E 테스트', () => {
  let signupPage: SignupStepPage
  let dataHelper: DataHelper

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupStepPage(page)
    dataHelper = new DataHelper()
  })

  // ==================== Step별 필드 렌더링 테스트 ====================

  test.describe('Step 렌더링', () => {
    test('✅ Step 1: Name 필드 표시', async () => {
      await signupPage.gotoStep('1')
      const isVisible = await signupPage.isNameFieldVisible()
      expect(isVisible).toBeTruthy()
    })

    test('✅ Step 2: Phone 필드 표시', async () => {
      await signupPage.gotoStep('2')
      const isVisible = await signupPage.isPhoneFieldVisible()
      expect(isVisible).toBeTruthy()
    })

    test('✅ Step 3: School 필드 표시', async () => {
      await signupPage.gotoStep('3')
      const isVisible = await signupPage.isSchoolFieldVisible()
      expect(isVisible).toBeTruthy()
    })

    test('✅ Step 4: Major 필드 표시', async () => {
      await signupPage.gotoStep('4')
      const isVisible = await signupPage.isMajorFieldVisible()
      expect(isVisible).toBeTruthy()
    })

    test('✅ Step 5: Part 필드 표시', async () => {
      await signupPage.gotoStep('5')
      const isVisible = await signupPage.isPartFieldVisible()
      expect(isVisible).toBeTruthy()
    })

    test('✅ Step 6: Student Card 필드 표시', async () => {
      await signupPage.gotoStep('6')
      const isVisible = await signupPage.isCardUploadFieldVisible()
      expect(isVisible).toBeTruthy()
    })

    test('✅ Step 7: Submit Modal 표시', async () => {
      await signupPage.gotoStep('7')
      const isVisible = await signupPage.isSubmitModalVisible()
      expect(isVisible).toBeTruthy()
    })
  })

  // ==================== Step 1: Name Field 테스트 ====================

  test.describe('Step 1: Name Field', () => {
    test('✅ 정상적으로 이름 입력', async () => {
      const testData = dataHelper.createSignupData()

      await signupPage.gotoStep('1')
      await signupPage.enterName(testData.name || '')

      const inputValue = await signupPage.getNameValue()
      expect(inputValue).toBe(testData.name)
    })

    test('Step 1: Name Field - ✅ 이름 필드 비어있으면 버튼 disabled', async () => {
      await signupPage.gotoStep('1')
      const isEnabled = await signupPage.isNextButtonEnabled()
      expect(isEnabled).toBe(false)

      const isErrorVisible = await signupPage.isErrorAlertVisible()
      // 빈 문자열이면 에러메시지가 없어야 함.
      expect(isErrorVisible).toBe(false)
    })

    test('❌ 너무 긴 이름은 에러 발생', async () => {
      const longName = 'A'.repeat(101)

      await signupPage.gotoStep('1')
      await signupPage.enterName(longName)

      // 에러 메시지가 나타날 때까지 추가 대기
      await signupPage.page.locator('p[role="alert"]').waitFor({
        state: 'visible',
        timeout: 3000,
      })

      const isEnabled = await signupPage.isNextButtonEnabled()
      expect(isEnabled).toBe(false)

      const isErrorVisible = await signupPage.isErrorAlertVisible()
      expect(isErrorVisible).toBe(true)
    })

    test('❌ 특수문자가 포함된 이름은 에러 발생', async () => {
      await signupPage.gotoStep('1')
      await signupPage.enterName('@#$%^&*()')
      const isEnabled = await signupPage.isNextButtonEnabled()
      expect(isEnabled).toBe(false)

      // 에러 메시지 표시
      const isErrorVisible = await signupPage.isErrorAlertVisible()
      expect(isErrorVisible).toBe(true)
    })

    test('✅ 최소 길이 이름 (1글자) 입력 가능', async () => {
      await signupPage.gotoStep('1')
      await signupPage.enterName('김')

      const inputValue = await signupPage.getNameValue()
      expect(inputValue).toBe('김')
    })

    test('✅ 최대 길이 이름 (100글자) 입력 가능', async () => {
      const maxName = 'A'.repeat(100)

      await signupPage.gotoStep('1')
      await signupPage.enterName(maxName)

      const inputValue = await signupPage.getNameValue()
      expect(inputValue).toBe(maxName)
    })
  })

  // ==================== Step 2: Phone Field 테스트 ====================

  test.describe('Step 2: Phone Number Field', () => {
    test('✅ 정상적으로 휴대폰 번호 입력', async () => {
      const phoneNumber = '010-1234-5678'

      await signupPage.gotoStep('2')
      await signupPage.enterPhone(phoneNumber)

      const inputValue = await signupPage.getPhoneValue()
      expect(inputValue).toBe(phoneNumber)
    })

    test('❌ 휴대폰 필드 비어있으면 에러 발생', async () => {
      await signupPage.gotoStep('2')
      const isEnabled = await signupPage.isNextButtonEnabled()
      expect(isEnabled).toBe(false)

      const isErrorVisible = await signupPage.isErrorAlertVisible()
      // 빈 문자열이면 에러 메시지가 없어야 함.
      expect(isErrorVisible).toBe(false)
    })

    test('❌ 잘못된 형식의 휴대폰 번호는 에러 발생', async () => {
      await signupPage.gotoStep('2')
      await signupPage.enterPhone('12345')
      const isEnabled = await signupPage.isNextButtonEnabled()
      expect(isEnabled).toBe(false)
    })

    test('✅ 다양한 휴대폰 형식 입력 가능', async () => {
      const phoneFormats = ['010-1234-5678', '01012345678', '010.1234.5678']

      for (const phone of phoneFormats) {
        await signupPage.gotoStep('2')
        await signupPage.enterPhone(phone)
        const inputValue = await signupPage.getPhoneValue()
        expect(inputValue).toBe('010-1234-5678')
      }
    })
  })

  // ==================== Step 3: School Field 테스트 ====================

  test.describe('Step 3: School Field', () => {
    test('✅ 학교 검색 및 선택', async () => {
      await signupPage.gotoStep('3')
      await signupPage.searchSchool('충북')

      // 검색 결과에서 학교 선택
      await signupPage.selectSchoolFromSearchResults('충북대학교')

      // 선택 후 에러가 없는지 확인
      const hasError = await signupPage.isErrorVisible()
      expect(hasError).toBeFalsy()
    })

    test('✅ 학교 직접 입력', async () => {
      await signupPage.gotoStep('3')
      await signupPage.enterSchool('서울대학교')

      const value = await signupPage.getSchoolValue()
      expect(value).toContain('서울대')
    })

    test('✅ 검색 결과 없음 처리', async () => {
      await signupPage.gotoStep('3')
      await signupPage.searchSchool('존재하지않는학교')

      // "검색 결과가 없습니다" 메시지 확인
      const isEmpty = await signupPage.page.locator('text=검색 결과가 없습니다').isVisible()
      expect(isEmpty).toBeTruthy()
    })

    test('❌ 학교를 선택하지 않으면 disabled 처리', async () => {
      await signupPage.gotoStep('3')

      const isEnabled = await signupPage.isNextButtonEnabled()
      expect(isEnabled).toBe(false)
    })
  })

  // ==================== Step 4: Major Field 테스트 ====================

  test.describe('Step 4: Major Field', () => {
    test('✅ 정상적으로 학과 입력', async () => {
      const major = '소프트웨어학과'

      await signupPage.gotoStep('4')
      await signupPage.enterMajor(major)

      const inputValue = await signupPage.getMajorValue()
      expect(inputValue).toBe(major)
    })

    test('❌ 학과 필드 비어있으면 disabled 처리', async () => {
      await signupPage.gotoStep('4')

      const isEnabled = await signupPage.isNextButtonEnabled()
      expect(isEnabled).toBe(false)
    })
  })

  // ==================== Step 5: Part Field 테스트 ====================

  test.describe('Step 5: Part Field', () => {
    test('✅ 파트 선택 (그리드)', async () => {
      await signupPage.gotoStep('5')
      await signupPage.selectPart('FRONTEND')

      const hasError = await signupPage.isErrorVisible()
      expect(hasError).toBeFalsy()
    })

    test('❌ 파트를 선택하지 않으면 disabled 처리', async () => {
      await signupPage.gotoStep('5')

      const isEnabled = await signupPage.isNextButtonEnabled()
      expect(isEnabled).toBe(false)
    })
  })

  // ==================== Step 진행 흐름 테스트 ====================

  test.describe('Step 진행 흐름', () => {
    test('✅ Step 1에서 Step 7까지 순차 진행 (필드 입력 포함)', async () => {
      const testData = dataHelper.createSignupData()

      // Step 1 → 2
      await signupPage.gotoStep('1')
      await signupPage.enterName(testData.name || '황유림')
      await signupPage.clickNext()
      let currentStep = await signupPage.getCurrentStep()
      expect(currentStep).toBe('1')

      // Step 2 → 3
      await signupPage.enterPhone(testData.phoneNumber || '010-7557-9217')
      await signupPage.clickNext()
      currentStep = await signupPage.getCurrentStep()
      expect(currentStep).toBe('2')

      // Step 3 → 4
      await signupPage.searchSchool((testData.school || '충북대학교').substring(0, 2))
      await signupPage.selectSchoolFromSearchResults(testData.school || '충북대학교')
      await signupPage.clickNext()
      currentStep = await signupPage.getCurrentStep()
      expect(currentStep).toBe('3')

      // Step 4 → 5
      await signupPage.enterMajor(testData.major || '')
      await signupPage.clickNext()
      currentStep = await signupPage.getCurrentStep()
      expect(currentStep).toBe('4')
    })

    test('✅ Step 1에서 이전으로 이동 불가 (뒤로가기 없음)', async () => {
      await signupPage.gotoStep('1')
      await signupPage.clickPrev()

      // Step 1에 그대로 있어야 함
      const currentStep = await signupPage.getCurrentStep()
      expect(currentStep).toBe('1')
    })

    test('✅ Step 3에서 Step 2로 뒤로가기', async () => {
      await signupPage.gotoStep('3')
      await signupPage.clickPrev()

      const currentStep = await signupPage.getCurrentStep()
      expect(currentStep).toBe('2')
    })

    test('✅ 진행률 표시 확인 (X/6)', async () => {
      // Step 1 → progress "1/6"
      await signupPage.gotoStep('1')
      let progress = await signupPage.getProgressText()
      expect(progress).toContain('1')
      expect(progress).toContain('6')

      // Step 5 → progress "5/6"
      await signupPage.gotoStep('5')
      progress = await signupPage.getProgressText()
      expect(progress).toContain('5')
      expect(progress).toContain('6')
    })
  })

  // ==================== 데이터 유지 테스트 ====================

  test.describe('데이터 유지', () => {
    test('✅ Step 진행 중 입력 데이터 유지', async () => {
      const testData = dataHelper.createSignupData()

      // Step 1: Name 입력
      await signupPage.gotoStep('1')
      await signupPage.enterName(testData.name || '')
      const nameAfterInput = await signupPage.getNameValue()

      // Step 2로 진행
      await signupPage.clickNext()

      // Step 1로 돌아가서 데이터 확인
      await signupPage.clickPrev()
      const nameAfterReturn = await signupPage.getNameValue()

      expect(nameAfterReturn).toBe(nameAfterInput)
    })
  })

  // ==================== Step 7: Submit Modal 테스트 ====================

  test.describe('Step 7: Submit Modal', () => {
    test('✅ 최종 제출 모달 표시', async () => {
      await signupPage.gotoStep('7')

      const isVisible = await signupPage.isSubmitModalVisible()
      expect(isVisible).toBeTruthy()
    })

    test('✅ 제출 모달 콘텐츠 확인', async () => {
      await signupPage.gotoStep('7')

      const content = await signupPage.getSubmitModalContent()
      expect(content.heading).toContain('승인 절차')
      expect(content.subheading).toContain('승인이 완료')
      expect(content.warning).toContain('일주일')
    })
  })
})
