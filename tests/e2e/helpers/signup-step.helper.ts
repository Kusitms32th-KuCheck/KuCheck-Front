// tests/e2e/helpers/signup-step.helper.ts
/**
 * Step 기반 회원가입 Helper
 * 각 step별 데이터 입력, 유효성 검증, step 진행 로직을 담당합니다
 */

import { Page } from '@playwright/test'
import { SignupStepPage, StepType } from '../pages/signup-step.page'
import { SignUpDataType } from '@/types/sign-up'
import { APIHelper } from './api.helper'

export class SignupStepHelper {
  private signupPage: SignupStepPage
  private apiHelper: APIHelper

  constructor(page: Page) {
    this.signupPage = new SignupStepPage(page)
    this.apiHelper = new APIHelper(page)
  }

  // ==================== Step별 데이터 입력 ====================

  /**
   * Step 1: 이름 입력
   * @param name 사용자 이름
   */
  async fillStep1Name(name: string) {
    await this.signupPage.gotoStep('1')
    await this.signupPage.enterName(name)
  }

  /**
   * Step 3: 학교 선택
   * @param school 학교명
   * @param useSearch 검색 기능 사용 여부 (기본값: false - select 사용)
   */
  async fillStep3School(school: string, useSearch: boolean = false) {
    await this.signupPage.gotoStep('3')
    if (useSearch) {
      await this.signupPage.searchSchool(school)
      await this.signupPage.selectSchoolFromSearchResults(school)
    } else {
      // 드롭다운 없이 직접 입력
      await this.signupPage.enterSchool(school)
    }
  }

  /**
   * Step 4: 학과 입력
   * @param major 학과명
   */
  async fillStep4Major(major: string) {
    await this.signupPage.gotoStep('4')
    await this.signupPage.enterMajor(major)
  }

  /**
   * Step 5: 파트 선택
   * @param part 파트 (FRONTEND, BACKEND, DESIGN, PLANNING)
   */
  async fillStep5Part(part: 'PLANNING' | 'DESIGN' | 'FRONTEND' | 'BACKEND') {
    await this.signupPage.gotoStep('5')
    await this.signupPage.selectPart(part)
  }

  /**
   * Step 6: 학생증 업로드
   * @param filePath 이미지 파일 경로
   */
  async fillStep6StudentCard(filePath: string) {
    await this.signupPage.gotoStep('6')
    await this.signupPage.uploadStudentCard(filePath)
  }

  /**
   * Step 7: 최종 제출 (모달 닫기)
   * Step 7은 자동 제출 모달이므로 별도 액션 불필요
   */
  async fillStep7Submit() {
    await this.signupPage.gotoStep('7')
  }

  // ==================== 전체 회원가입 프로세스 ====================

  /**
   * 전체 회원가입 프로세스 (모든 step 순차 진행)
   * 주의: Step 5에서 postMembersOnboarding API 호출됨
   * @param data 회원가입 데이터
   * @param filePath 학생증 이미지 경로 (Step 6)
   */
  async completeFullSignup(data: SignUpDataType, filePath?: string) {
    try {
      // Step 1: Name
      await this.fillStep1Name(data.name || '')
      await this.signupPage.clickNext()
      let currentStep = await this.signupPage.getCurrentStep()
      if (currentStep !== '2') throw new Error('Step 2 진행 실패')

      // Step 2: Phone
      await this.signupPage.clickNext()
      currentStep = await this.signupPage.getCurrentStep()
      if (currentStep !== '3') throw new Error('Step 3 진행 실패')

      // Step 3: School
      await this.fillStep3School(data.school || '')
      await this.signupPage.clickNext()
      currentStep = await this.signupPage.getCurrentStep()
      if (currentStep !== '4') throw new Error('Step 4 진행 실패')

      // Step 4: Major
      await this.fillStep4Major(data.major || '')
      await this.signupPage.clickNext()
      currentStep = await this.signupPage.getCurrentStep()
      if (currentStep !== '5') throw new Error('Step 5 진행 실패')

      // Step 5: Part (이 단계에서 postMembersOnboarding API 호출됨)
      await this.fillStep5Part(data.part as 'PLANNING' | 'DESIGN' | 'FRONTEND' | 'BACKEND')
      await this.signupPage.clickNext() // handleSubmit 호출 - API 요청

      // API 요청 완료 대기
      await this.signupPage.page.waitForLoadState('networkidle')
      currentStep = await this.signupPage.getCurrentStep()
      if (currentStep !== '6') throw new Error('Step 6 진행 실패')

      // Step 6: Student Card (선택)
      if (filePath) {
        await this.fillStep6StudentCard(filePath)
        await this.signupPage.clickNext()

        // 업로드 완료 대기
        await this.signupPage.page.waitForLoadState('networkidle')
        currentStep = await this.signupPage.getCurrentStep()
        if (currentStep !== '7') throw new Error('Step 7 진행 실패')
      }

      // Step 7: Submit Modal (자동 표시)
      await this.fillStep7Submit()
      currentStep = await this.signupPage.getCurrentStep()
      if (currentStep !== '7') throw new Error('Step 7 확인 실패')

      return { success: true }
    } catch (error) {
      console.error('회원가입 프로세스 오류:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // ==================== Step 진행 테스트 ====================

  /**
   * Step 순차 진행 테스트
   * 각 step에서 다음 button으로 진행되는지 확인
   */
  async testStepProgression() {
    const steps: StepType[] = ['1', '2', '3', '4', '5', '6', '7']
    const results = []

    for (const step of steps) {
      await this.signupPage.gotoStep(step)
      const currentStep = await this.signupPage.getCurrentStep()

      results.push({
        step,
        currentStep,
        isCorrect: step === currentStep,
      })
    }

    return results
  }

  /**
   * Step 뒤로가기 테스트
   * 각 step에서 이전 button으로 돌아가는지 확인
   */
  async testStepBackNavigation(targetStep: StepType) {
    const steps: StepType[] = ['7', '6', '5', '4', '3', '2', '1']
    const results = []

    await this.signupPage.gotoStep(targetStep)

    for (const step of steps) {
      const currentStep = await this.signupPage.getCurrentStep()
      if (currentStep === '1') break // Step 1에서는 뒤로갈 수 없음

      await this.signupPage.clickPrev()
      const previousStep = await this.signupPage.getCurrentStep()

      results.push({
        from: currentStep,
        to: previousStep,
      })
    }

    return results
  }

  // ==================== 데이터 유지 테스트 ====================

  /**
   * Step 진행 중 데이터 유지 확인
   * Name → Phone → School 진행 시 입력 데이터가 유지되는지 확인
   */
  async testDataPersistence(data: SignUpDataType) {
    const results: Record<string, any> = {}

    // Step 1: Name 입력
    await this.fillStep1Name(data.name || '')
    results.nameInput = await this.signupPage.getNameValue()

    // Step 2로 진행
    await this.signupPage.clickNext()
    results.phoneInput = await this.signupPage.getPhoneValue()

    // Step 1로 돌아가서 Name 데이터 확인
    await this.signupPage.clickPrev()
    results.nameAfterReturn = await this.signupPage.getNameValue()

    return results
  }

  // ==================== 유효성 검증 테스트 ====================

  /**
   * 형식 검증 테스트 (예: 휴대폰 번호 형식)
   */
  async testFormatValidation(step: StepType, invalidValue: string) {
    await this.signupPage.gotoStep(step)

    switch (step) {
      case '1':
        await this.signupPage.enterName(invalidValue)
        break
      case '2':
        await this.signupPage.enterPhone(invalidValue)
        break
      case '4':
        await this.signupPage.enterMajor(invalidValue)
        break
      default:
        break
    }

    await this.signupPage.clickNext()

    return {
      step,
      hasError: await this.signupPage.isErrorVisible(),
      error: await this.signupPage.getErrorMessage(),
    }
  }

  // ==================== API 통합 테스트 ====================

  /**
   * 회원가입 완료 후 API 호출 검증
   */
  async testSignupCompletion(data: SignUpDataType) {
    try {
      const response = await this.apiHelper.post('/v1/members/onboarding', data)
      if (!response.ok()) {
        throw new Error(`API Error: ${response.status()}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API 호출 오류:', error)
      return null
    }
  }

  // ==================== 진행률 테스트 ====================

  /**
   * Progress bar 진행률 확인
   */
  async checkProgressBar(step: StepType): Promise<string> {
    await this.signupPage.gotoStep(step)
    return await this.signupPage.getProgressText()
  }

  /**
   * 모든 step의 진행률 확인
   */
  async testAllProgressBars() {
    const steps: StepType[] = ['1', '2', '3', '4', '5', '6', '7']
    const results = []

    for (const step of steps) {
      const progress = await this.checkProgressBar(step)
      results.push({
        step,
        progress,
      })
    }

    return results
  }

  // ==================== 모바일/반응형 테스트 ====================

  /**
   * 모바일 뷰포트에서 회원가입 테스트
   */
  async testMobileSignup(data: SignUpDataType) {
    await this.signupPage.setMobileViewport()
    await this.signupPage.goto()

    const steps: StepType[] = ['1', '2', '3', '4', '5']
    const results = []

    // 각 step이 모바일에서 제대로 표시되는지 확인
    for (const step of steps) {
      await this.signupPage.gotoStep(step)
      const isFieldVisible = await this.signupPage.isStepFieldVisible(step)
      results.push({
        step,
        isVisible: isFieldVisible,
      })
    }

    return results
  }

  /**
   * 데스크톱 뷰포트에서 회원가입 테스트
   */
  async testDesktopSignup(data: SignUpDataType) {
    await this.signupPage.setDesktopViewport()
    await this.signupPage.goto()

    const steps: StepType[] = ['1', '2', '3', '4', '5']
    const results = []

    for (const step of steps) {
      await this.signupPage.gotoStep(step)
      const isFieldVisible = await this.signupPage.isStepFieldVisible(step)
      results.push({
        step,
        isVisible: isFieldVisible,
      })
    }

    return results
  }

  // ==================== 예외 상황 테스트 ====================

  /**
   * 잘못된 step 파라미터 처리 테스트
   */
  async testInvalidStepParameter() {
    await this.signupPage.goto() // 기본값으로 이동
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // 범위를 벗어난 step
    await this.signupPage.page.goto(`${baseUrl}/sign-up?step=99`)
    const step = await this.signupPage.getCurrentStep()

    return {
      invalidStep: '99',
      fallbackStep: step,
      isValid: ['1', '2', '3', '4', '5', '6', '7'].includes(step || ''),
    }
  }

  /**
   * Step 파라미터 없이 접근 테스트
   */
  async testNoStepParameter() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    await this.signupPage.page.goto(`${baseUrl}/sign-up`)
    const step = await this.signupPage.getCurrentStep()

    return {
      step,
      isFallback: step === '1', // 기본값 step 1인지 확인
    }
  }
}
