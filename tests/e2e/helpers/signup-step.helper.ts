// tests/e2e/helpers/signup-step.helper.ts
/**
 * Step 기반 회원가입 Helper
 * 각 step별 데이터 입력, 유효성 검증, step 진행 로직을 담당합니다
 */

import { Page } from '@playwright/test'
import { SignupStepPage } from '../pages/signup-step.page'
import { APIHelper } from './api.helper'

export class SignupStepHelper {
  private signupPage: SignupStepPage
  private apiHelper: APIHelper

  constructor(page: Page) {
    this.signupPage = new SignupStepPage(page)
    this.apiHelper = new APIHelper(page)
  }
}
