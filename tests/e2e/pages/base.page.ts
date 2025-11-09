// tests/e2e/pages/base.page.ts
import { Page, Locator } from '@playwright/test'

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // 페이지 이동
  async goto(path: string) {
    await this.page.goto(path)
  }

  // 요소가 보일 때까지 대기
  async waitForVisible(selector: string, timeout = 5000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout })
  }

  // 요소를 찾기
  protected getLocator(selector: string): Locator {
    return this.page.locator(selector)
  }

  // 클릭
  async click(selector: string) {
    await this.page.locator(selector).click()
  }

  // 입력
  async fill(selector: string, value: string) {
    await this.page.locator(selector).fill(value)
  }

  // 값 읽기
  async getValue(selector: string): Promise<string> {
    return await this.page.locator(selector).inputValue()
  }

  // 텍스트 읽기
  async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) || ''
  }

  // 요소 표시 여부
  async isVisible(selector: string): Promise<boolean> {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout: 1000 })
      return true
    } catch {
      return false
    }
  }

  // 요소 비활성화 여부
  async isDisabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isDisabled()
  }

  // URL 확인
  async getCurrentURL(): Promise<string> {
    return this.page.url()
  }

  // 페이지 제목
  async getPageTitle(): Promise<string> {
    return await this.page.title()
  }

  // 스크린샷 (디버깅용)
  async screenshot(name: string) {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
    })
  }

  // 새 탭 열기
  async openNewTab() {
    return await this.page.context().newPage()
  }
}
