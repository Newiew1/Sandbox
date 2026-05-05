import { APIRequestContext, expect } from '@playwright/test';

/**
 * APIService - Centralized API request handling
 * Handles all HTTP requests, responses, and validations
 */
export class APIService {
  private request: APIRequestContext;
  private baseURL: string;
  private defaultHeaders: Record<string, string> = {};

  constructor(request: APIRequestContext, baseURL: string = '') {
    this.request = request;
    this.baseURL = baseURL;
  }

  /**
   * Set default headers for all requests
   */
  setDefaultHeaders(headers: Record<string, string>) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * Add authorization header
   */
  setAuthToken(token: string, type: string = 'Bearer') {
    this.defaultHeaders['Authorization'] = `${type} ${token}`;
  }

  /**
   * GET request
   */
  async get(endpoint: string, options: any = {}) {
    const url = this.buildURL(endpoint);
    return await this.request.get(url, {
      ...options,
      headers: { ...this.defaultHeaders, ...options.headers },
    });
  }

  /**
   * POST request
   */
  async post(endpoint: string, data?: any, options: any = {}) {
    const url = this.buildURL(endpoint);
    return await this.request.post(url, {
      ...options,
      data,
      headers: { ...this.defaultHeaders, ...options.headers },
    });
  }

  /**
   * PUT request
   */
  async put(endpoint: string, data?: any, options: any = {}) {
    const url = this.buildURL(endpoint);
    return await this.request.put(url, {
      ...options,
      data,
      headers: { ...this.defaultHeaders, ...options.headers },
    });
  }

  /**
   * PATCH request
   */
  async patch(endpoint: string, data?: any, options: any = {}) {
    const url = this.buildURL(endpoint);
    return await this.request.patch(url, {
      ...options,
      data,
      headers: { ...this.defaultHeaders, ...options.headers },
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint: string, options: any = {}) {
    const url = this.buildURL(endpoint);
    return await this.request.delete(url, {
      ...options,
      headers: { ...this.defaultHeaders, ...options.headers },
    });
  }

  /**
   * Validate response status
   */
  async validateStatus(response: any, expectedStatus: number) {
    expect(response.status()).toBe(expectedStatus);
    return response;
  }

  /**
   * Get JSON response body
   */
  async getJsonBody(response: any) {
    return await response.json();
  }

  /**
   * Validate JSON response contains expected properties
   */
  async validateJsonResponse(response: any, expectedProperties: string[]) {
    const body = await this.getJsonBody(response);
    expectedProperties.forEach((prop) => {
      expect(body).toHaveProperty(prop);
    });
    return body;
  }

  /**
   * Validate response headers
   */
  async validateHeaders(response: any, expectedHeaders: Record<string, string>) {
    const headers = response.headers();
    Object.entries(expectedHeaders).forEach(([key, value]) => {
      expect(headers[key.toLowerCase()]).toBe(value);
    });
  }

  /**
   * Get response body as text
   */
  async getTextBody(response: any) {
    return await response.text();
  }

  /**
   * Build full URL
   */
  private buildURL(endpoint: string): string {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    return this.baseURL ? `${this.baseURL}${endpoint}` : endpoint;
  }

  /**
   * Check if response is successful (2xx status)
   */
  isSuccess(statusCode: number): boolean {
    return statusCode >= 200 && statusCode < 300;
  }

  /**
   * Check if response is error (4xx or 5xx status)
   */
  isError(statusCode: number): boolean {
    return statusCode >= 400;
  }
}
