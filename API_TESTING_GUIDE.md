# API Testing Guide

This guide explains how to use the API testing setup with Playwright in this project.

## Overview

Playwright includes built-in `APIRequestContext` for making HTTP requests and testing APIs. We've created a reusable `APIService` class that wraps this functionality to make API testing easier and more consistent with your Page Object Model pattern.

## Setup

### 1. APIService Class
The `APIService` class (`utils/APIService.ts`) provides methods for all HTTP operations:
- `get()` - GET requests
- `post()` - POST requests  
- `put()` - PUT requests
- `patch()` - PATCH requests
- `delete()` - DELETE requests
- Response validation helpers

### 2. Test File
The `tests/api.spec.ts` file contains example tests demonstrating each HTTP method and common patterns.

## Quick Start

### Basic GET Request
```typescript
import { test } from '@playwright/test';
import { APIService } from '../utils/APIService';

test('Get users', async ({ request }) => {
  const apiService = new APIService(request, 'https://api.example.com');
  const response = await apiService.get('/users');
  
  await apiService.validateStatus(response, 200);
  const body = await apiService.getJsonBody(response);
  expect(Array.isArray(body)).toBeTruthy();
});
```

### POST Request with Data
```typescript
test('Create user', async ({ request }) => {
  const apiService = new APIService(request, 'https://api.example.com');
  
  const newUser = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  };
  
  const response = await apiService.post('/users', newUser);
  await apiService.validateStatus(response, 201);
  const body = await apiService.getJsonBody(response);
  expect(body.name).toBe(newUser.name);
});
```

### With Authentication
```typescript
test.beforeEach(async ({ request }) => {
  const apiService = new APIService(request, 'https://api.example.com');
  apiService.setAuthToken('your-jwt-token');
  // or: apiService.setAuthToken('your-token', 'Bearer'); // default
});
```

### With Default Headers
```typescript
test.beforeEach(async ({ request }) => {
  const apiService = new APIService(request, 'https://api.example.com');
  apiService.setDefaultHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'MyTestSuite/1.0'
  });
});
```

## APIService Methods

### HTTP Methods
```typescript
// GET request
const response = await apiService.get('/endpoint');

// GET with query parameters
const response = await apiService.get('/users', {
  params: { page: 1, limit: 10 }
});

// POST with data
const response = await apiService.post('/users', { name: 'John' });

// PUT (full update)
const response = await apiService.put('/users/1', { name: 'Jane' });

// PATCH (partial update)
const response = await apiService.patch('/users/1', { name: 'Jane' });

// DELETE
const response = await apiService.delete('/users/1');
```

### Validation Methods
```typescript
// Validate HTTP status
await apiService.validateStatus(response, 200);

// Get response as JSON
const body = await apiService.getJsonBody(response);

// Validate JSON properties
const body = await apiService.validateJsonResponse(response, ['id', 'name', 'email']);

// Get response as text
const text = await apiService.getTextBody(response);

// Validate headers
await apiService.validateHeaders(response, {
  'content-type': 'application/json'
});

// Check response status
const isSuccess = apiService.isSuccess(response.status()); // 200-299
const isError = apiService.isError(response.status()); // 400+
```

## Running API Tests

```bash
# Run only API tests
npm run test:api

# Run all tests including API
npm test

# Run with UI mode
npm run test:ui

# Run with debug mode
npm run test:debug

# Run and show report
npm run test:all
```

## Common Patterns

### Test Data Setup
Use API calls to create test data before running UI tests:

```typescript
test('Complete user workflow', async ({ page, request }) => {
  // Setup: Create user via API
  const apiService = new APIService(request, 'https://api.example.com');
  const createResponse = await apiService.post('/users', { 
    name: 'Test User',
    email: 'test@example.com'
  });
  const userId = (await apiService.getJsonBody(createResponse)).id;
  
  // Act: Test UI with created user
  const homePage = new HomePage(page);
  await homePage.goto();
  // ... UI test
  
  // Cleanup: Delete user via API
  await apiService.delete(`/users/${userId}`);
});
```

### Error Handling Tests
```typescript
test('Handle API errors', async ({ request }) => {
  const apiService = new APIService(request, 'https://api.example.com');
  
  const response = await apiService.get('/users/invalid-id');
  expect(response.status()).toBe(404);
  
  const body = await apiService.getJsonBody(response);
  expect(body.error).toBeDefined();
});
```

### Testing with Multiple Endpoints
Create separate instances for different services:

```typescript
test('User and Post interaction', async ({ request }) => {
  const userAPI = new APIService(request, 'https://api.example.com/users');
  const postAPI = new APIService(request, 'https://api.example.com/posts');
  
  const userResponse = await userAPI.get('/1');
  const postsResponse = await postAPI.get('?userId=1');
  
  const user = await userAPI.getJsonBody(userResponse);
  const posts = await postAPI.getJsonBody(postsResponse);
  
  expect(posts.length).toBeGreaterThan(0);
});
```

### Response Time Testing
```typescript
test('API responds within timeout', async ({ request }) => {
  const apiService = new APIService(request, 'https://api.example.com');
  
  const startTime = Date.now();
  const response = await apiService.get('/users');
  const duration = Date.now() - startTime;
  
  expect(duration).toBeLessThan(1000); // Should respond in < 1 second
  await apiService.validateStatus(response, 200);
});
```

## Configuration Tips

### Base URL Management
Update the `BASE_URL` in your test files:

```typescript
// Development
const BASE_URL = 'http://localhost:3000/api';

// Staging
const BASE_URL = 'https://staging-api.example.com';

// Production
const BASE_URL = 'https://api.example.com';
```

Or use environment variables:
```typescript
const BASE_URL = process.env.API_BASE_URL || 'https://api.example.com';
```

### Authentication Management
Store tokens securely:

```typescript
test.beforeEach(async ({ request }) => {
  const apiService = new APIService(request, BASE_URL);
  
  // Option 1: From environment variable
  const token = process.env.API_TOKEN;
  if (token) apiService.setAuthToken(token);
  
  // Option 2: Obtain token from login endpoint
  const loginResponse = await request.post('/auth/login', {
    data: { username: 'test', password: 'password' }
  });
  const { token } = await loginResponse.json();
  apiService.setAuthToken(token);
});
```

## Advanced Usage

### Custom Request Options
Pass additional options to any HTTP method:

```typescript
const response = await apiService.get('/users', {
  timeout: 30000, // Custom timeout
  params: { 
    page: 1, 
    limit: 10 
  },
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

### Extending APIService
Create specialized API service classes:

```typescript
export class UserAPI extends APIService {
  async getUser(id: number) {
    return await this.get(`/users/${id}`);
  }
  
  async createUser(data: any) {
    return await this.post('/users', data);
  }
  
  async deleteUser(id: number) {
    return await this.delete(`/users/${id}`);
  }
}
```

## Reporting

API tests are included in your Allure reporting:
- Run tests and view report: `npm run test:all`
- Report includes API request/response details
- View HTML report: `npm run test:report`

## Troubleshooting

### CORS Issues
If you get CORS errors, ensure:
- API allows requests from test origin
- Request headers are correct
- Preflight requests are handled

### Authentication Failures
- Verify token format and expiration
- Check Authorization header syntax
- Ensure credentials are valid

### Timeout Issues
- Increase timeout if API is slow: `timeout: 30000`
- Check network conditions
- Verify endpoint availability

### Response Parsing Errors
```typescript
// If response isn't JSON:
try {
  const body = await response.json();
} catch {
  const text = await response.text();
  console.log(text);
}
```

## Best Practices

1. **Use consistent base URLs** - Define BASE_URL at the top of each test file
2. **Validate status codes** - Always check response status
3. **Handle authentication** - Use beforeEach to set up auth consistently
4. **Create test data via API** - Faster and more reliable than UI
5. **Clean up after tests** - Delete test data in afterEach
6. **Use meaningful test names** - Follow TC-API-XXX naming pattern
7. **Document endpoint expectations** - Add comments about required fields
8. **Test error cases** - Don't just test happy path
9. **Use fixtures for setup** - Keep beforeEach organized
10. **Validate response structure** - Check required properties exist

## Resources

- [Playwright API Request Documentation](https://playwright.dev/docs/api-testing)
- [APIRequestContext API](https://playwright.dev/docs/api/class-apirequestcontext)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html)
- [JSON Schema Validation](https://json-schema.org/)
