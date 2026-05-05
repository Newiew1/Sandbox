# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.ts >> API Tests >> TC-API-004: GET /users/:id returns specific user
- Location: tests\api.spec.ts:73:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1   | import { APIRequestContext, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * APIService - Centralized API request handling
  5   |  * Handles all HTTP requests, responses, and validations
  6   |  */
  7   | export class APIService {
  8   |   private request: APIRequestContext;
  9   |   private baseURL: string;
  10  |   private defaultHeaders: Record<string, string> = {};
  11  | 
  12  |   constructor(request: APIRequestContext, baseURL: string = '') {
  13  |     this.request = request;
  14  |     this.baseURL = baseURL;
  15  |   }
  16  | 
  17  |   /**
  18  |    * Set default headers for all requests
  19  |    */
  20  |   setDefaultHeaders(headers: Record<string, string>) {
  21  |     this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  22  |   }
  23  | 
  24  |   /**
  25  |    * Add authorization header
  26  |    */
  27  |   setAuthToken(token: string, type: string = 'Bearer') {
  28  |     this.defaultHeaders['Authorization'] = `${type} ${token}`;
  29  |   }
  30  | 
  31  |   /**
  32  |    * GET request
  33  |    */
  34  |   async get(endpoint: string, options: any = {}) {
  35  |     const url = this.buildURL(endpoint);
  36  |     return await this.request.get(url, {
  37  |       ...options,
  38  |       headers: { ...this.defaultHeaders, ...options.headers },
  39  |     });
  40  |   }
  41  | 
  42  |   /**
  43  |    * POST request
  44  |    */
  45  |   async post(endpoint: string, data?: any, options: any = {}) {
  46  |     const url = this.buildURL(endpoint);
  47  |     return await this.request.post(url, {
  48  |       ...options,
  49  |       data,
  50  |       headers: { ...this.defaultHeaders, ...options.headers },
  51  |     });
  52  |   }
  53  | 
  54  |   /**
  55  |    * PUT request
  56  |    */
  57  |   async put(endpoint: string, data?: any, options: any = {}) {
  58  |     const url = this.buildURL(endpoint);
  59  |     return await this.request.put(url, {
  60  |       ...options,
  61  |       data,
  62  |       headers: { ...this.defaultHeaders, ...options.headers },
  63  |     });
  64  |   }
  65  | 
  66  |   /**
  67  |    * PATCH request
  68  |    */
  69  |   async patch(endpoint: string, data?: any, options: any = {}) {
  70  |     const url = this.buildURL(endpoint);
  71  |     return await this.request.patch(url, {
  72  |       ...options,
  73  |       data,
  74  |       headers: { ...this.defaultHeaders, ...options.headers },
  75  |     });
  76  |   }
  77  | 
  78  |   /**
  79  |    * DELETE request
  80  |    */
  81  |   async delete(endpoint: string, options: any = {}) {
  82  |     const url = this.buildURL(endpoint);
  83  |     return await this.request.delete(url, {
  84  |       ...options,
  85  |       headers: { ...this.defaultHeaders, ...options.headers },
  86  |     });
  87  |   }
  88  | 
  89  |   /**
  90  |    * Validate response status
  91  |    */
  92  |   async validateStatus(response: any, expectedStatus: number) {
> 93  |     expect(response.status()).toBe(expectedStatus);
      |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  94  |     return response;
  95  |   }
  96  | 
  97  |   /**
  98  |    * Get JSON response body
  99  |    */
  100 |   async getJsonBody(response: any) {
  101 |     return await response.json();
  102 |   }
  103 | 
  104 |   /**
  105 |    * Validate JSON response contains expected properties
  106 |    */
  107 |   async validateJsonResponse(response: any, expectedProperties: string[]) {
  108 |     const body = await this.getJsonBody(response);
  109 |     expectedProperties.forEach((prop) => {
  110 |       expect(body).toHaveProperty(prop);
  111 |     });
  112 |     return body;
  113 |   }
  114 | 
  115 |   /**
  116 |    * Validate response headers
  117 |    */
  118 |   async validateHeaders(response: any, expectedHeaders: Record<string, string>) {
  119 |     const headers = response.headers();
  120 |     Object.entries(expectedHeaders).forEach(([key, value]) => {
  121 |       expect(headers[key.toLowerCase()]).toBe(value);
  122 |     });
  123 |   }
  124 | 
  125 |   /**
  126 |    * Get response body as text
  127 |    */
  128 |   async getTextBody(response: any) {
  129 |     return await response.text();
  130 |   }
  131 | 
  132 |   /**
  133 |    * Build full URL
  134 |    */
  135 |   private buildURL(endpoint: string): string {
  136 |     if (endpoint.startsWith('http')) {
  137 |       return endpoint;
  138 |     }
  139 |     return this.baseURL ? `${this.baseURL}${endpoint}` : endpoint;
  140 |   }
  141 | 
  142 |   /**
  143 |    * Check if response is successful (2xx status)
  144 |    */
  145 |   isSuccess(statusCode: number): boolean {
  146 |     return statusCode >= 200 && statusCode < 300;
  147 |   }
  148 | 
  149 |   /**
  150 |    * Check if response is error (4xx or 5xx status)
  151 |    */
  152 |   isError(statusCode: number): boolean {
  153 |     return statusCode >= 400;
  154 |   }
  155 | }
  156 | 
```