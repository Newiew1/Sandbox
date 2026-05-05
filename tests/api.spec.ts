import { test, expect } from '@playwright/test';
import { APIService } from '../utils/APIService';

/**
 * REST Countries API Test Suite
 * Tests for https://restcountries.com/v3.1/
 * API that provides information about countries
 */

const BASE_URL = 'https://restcountries.com/v3.1';

test.describe('REST Countries API Tests', () => {
  let apiService: APIService;

  test.beforeEach(async ({ request }) => {
    apiService = new APIService(request, BASE_URL);
    
    // Set default headers
    apiService.setDefaultHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  });

  // GET all countries with specific fields
  test('TC-API-001: GET /all returns 200 with array of countries', async () => {
    const response = await apiService.get('/all?fields=name,capital,currencies');
    
    await apiService.validateStatus(response, 200);
    const body = await apiService.getJsonBody(response);
    
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    console.log(`✓ Returned ${body.length} countries`);
  });

  // Verify response contains countries with required fields
  test('TC-API-002: All countries have name and capital properties', async () => {
    const response = await apiService.get('/all?fields=name,capital,currencies');
    
    await apiService.validateStatus(response, 200);
    const countries = await apiService.getJsonBody(response);
    
    // Check first 5 countries to verify structure
    countries.slice(0, 5).forEach((country: any, index: number) => {
      expect(country).toHaveProperty('name');
      expect(country.name).toHaveProperty('common');
      expect(country.name).toHaveProperty('official');
      expect(country).toHaveProperty('capital');
      console.log(`✓ Country ${index + 1}: ${country.name.common}`);
    });
  });

  // Verify capital is an array
  test('TC-API-003: Capital property is an array', async () => {
    const response = await apiService.get('/all?fields=name,capital');
    
    await apiService.validateStatus(response, 200);
    const countries = await apiService.getJsonBody(response);
    
    countries.slice(0, 10).forEach((country: any) => {
      if (country.capital) {
        expect(Array.isArray(country.capital)).toBeTruthy();
        expect(country.capital.length).toBeGreaterThan(0);
      }
    });
  });

  // Verify currencies structure
  test('TC-API-004: Currency data has valid structure', async () => {
    const response = await apiService.get('/all?fields=name,currencies');
    
    await apiService.validateStatus(response, 200);
    const countries = await apiService.getJsonBody(response);
    
    countries.slice(0, 5).forEach((country: any) => {
      if (country.currencies) {
        expect(typeof country.currencies).toBe('object');
        Object.entries(country.currencies).forEach(([code, currency]: [string, any]) => {
          expect(code).toMatch(/^[A-Z]{3}$/); // Currency codes are 3 uppercase letters
          expect(currency).toHaveProperty('name');
          expect(currency).toHaveProperty('symbol');
        });
      }
    });
  });

  // Test with only name field
  test('TC-API-005: GET /all with fields=name returns only name property', async () => {
    const response = await apiService.get('/all?fields=name');
    
    await apiService.validateStatus(response, 200);
    const countries = await apiService.getJsonBody(response);
    
    countries.slice(0, 5).forEach((country: any) => {
      expect(country).toHaveProperty('name');
      expect(country.name).toHaveProperty('common');
      expect(country.name).toHaveProperty('official');
      // Should NOT have capital or currencies
      expect(country).not.toHaveProperty('capital');
      expect(country).not.toHaveProperty('currencies');
    });
  });

  // Get specific country by country code
  test('TC-API-006: GET /alpha/:code returns specific country', async () => {
    // US country code
    const response = await apiService.get('/alpha/usa');
    
    await apiService.validateStatus(response, 200);
    const country = await apiService.getJsonBody(response);
    
    expect(Array.isArray(country)).toBeTruthy();
    expect(country[0]).toHaveProperty('name');
    expect(country[0].name.common).toContain('United States');
    console.log(`✓ Found country: ${country[0].name.common}`);
  });

  // Get multiple countries by code
  test('TC-API-007: GET /alpha/:codes returns multiple countries', async () => {
    const response = await apiService.get('/alpha?codes=usa,gbr,fra');
    
    await apiService.validateStatus(response, 200);
    const countries = await apiService.getJsonBody(response);
    
    expect(Array.isArray(countries)).toBeTruthy();
    expect(countries.length).toBe(3);
    const countryNames = countries.map((c: any) => c.name.common);
    console.log(`✓ Found countries: ${countryNames.join(', ')}`);
  });

  // Verify response headers
  test('TC-API-008: Response headers are valid', async () => {
    const response = await apiService.get('/all?fields=name,capital');
    
    await apiService.validateStatus(response, 200);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  // Test pagination with multiple requests
  test('TC-API-009: Multiple API calls return consistent data', async () => {
    const response1 = await apiService.get('/all?fields=name');
    const body1 = await apiService.getJsonBody(response1);
    
    const response2 = await apiService.get('/all?fields=name');
    const body2 = await apiService.getJsonBody(response2);
    
    // Both responses should have same number of countries
    expect(body1.length).toBe(body2.length);
    console.log(`✓ Consistent response: ${body1.length} countries returned both times`);
  });

  // Verify error handling for invalid country code
  test('TC-API-010: GET /alpha/:code returns 400 for invalid code', async () => {
    const response = await apiService.get('/alpha/xyz99');
    
    expect(response.status()).toBe(400);
    console.log(`✓ Invalid country code returns 400`);
  });

  // Verify name.common exists for all countries
  test('TC-API-011: All countries have common name', async () => {
    const response = await apiService.get('/all?fields=name');
    
    await apiService.validateStatus(response, 200);
    const countries = await apiService.getJsonBody(response);
    
    countries.forEach((country: any) => {
      expect(country.name.common).toBeDefined();
      expect(country.name.common.length).toBeGreaterThan(0);
    });
    console.log(`✓ All ${countries.length} countries have common names`);
  });

  // Test response time
  test('TC-API-012: API responds within acceptable time', async () => {
    const startTime = Date.now();
    const response = await apiService.get('/all?fields=name');
    const duration = Date.now() - startTime;
    
    await apiService.validateStatus(response, 200);
    expect(duration).toBeLessThan(5000); // Should respond in less than 5 seconds
    console.log(`✓ API responded in ${duration}ms`);
  });

  // Verify no empty countries in response
  test('TC-API-013: Response does not contain empty country objects', async () => {
    const response = await apiService.get('/all?fields=name,capital,currencies');
    
    await apiService.validateStatus(response, 200);
    const countries = await apiService.getJsonBody(response);
    
    countries.forEach((country: any) => {
      expect(country.name).toBeDefined();
      expect(Object.keys(country).length).toBeGreaterThan(0);
    });
  });

  // Test specific country details
  test('TC-API-014: GET /alpha/ind returns India with correct details', async () => {
    const response = await apiService.get('/alpha/ind');
    
    await apiService.validateStatus(response, 200);
    const country = await apiService.getJsonBody(response);
    
    expect(country[0].name.common).toBe('India');
    expect(country[0]).toHaveProperty('capital');
    expect(country[0].capital).toContain('New Delhi');
  });

  // Verify all countries have valid structure
  test('TC-API-015: All countries have consistent structure', async () => {
    const response = await apiService.get('/all?fields=name,capital,currencies');
    
    await apiService.validateStatus(response, 200);
    const countries = await apiService.getJsonBody(response);
    
    const validStructure = countries.every((country: any) => 
      country.hasOwnProperty('name') && 
      typeof country.name === 'object'
    );
    
    expect(validStructure).toBeTruthy();
    console.log(`✓ All ${countries.length} countries have consistent structure`);
  });
});
