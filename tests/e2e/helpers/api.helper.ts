// tests/e2e/helpers/api.helper.ts
// ✅ API 호출 관련 공통 로직 (수정 버전)
import { Page, APIRequestContext } from '@playwright/test'

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export class APIHelper {
  private apiContext: APIRequestContext
  private baseURL: string

  constructor(page: Page, baseURL: string = NEXT_PUBLIC_BASE_URL) {
    this.apiContext = page.request
    this.baseURL = baseURL
  }

  // GET 요청
  async get(endpoint: string, headers?: Record<string, string>) {
    const response = await this.apiContext.get(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
    return response
  }

  // POST 요청
  async post(endpoint: string, data: any, headers?: Record<string, string>) {
    const response = await this.apiContext.post(`${this.baseURL}${endpoint}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
    return response
  }

  // PUT 요청
  async put(endpoint: string, data: any, headers?: Record<string, string>) {
    const response = await this.apiContext.put(`${this.baseURL}${endpoint}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
    return response
  }

  // DELETE 요청
  async delete(endpoint: string, headers?: Record<string, string>) {
    const response = await this.apiContext.delete(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
    return response
  }
}
