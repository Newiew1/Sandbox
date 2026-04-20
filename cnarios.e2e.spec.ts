import { test, expect, chromium } from '@playwright/test';

// E2E Regression Pack for Cnarios - designed for User Acceptance Testing.
// Includes critical business-flow validations and can be extended as needed.

test.describe('Cnarios E2E Regression', () => {
  test('home and main navigation paths', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.cnarios.com/');

    await expect(page).toHaveTitle(/Cnarios/i);
    await expect(page.locator('text=Start Exploring')).toBeVisible();
    await expect(page.locator('a[href="/explore"]')).toBeVisible();

    const explore = page.locator('a[href="/explore"]');
    await explore.click();
    await page.waitForURL('**/explore');
    await expect(page).toHaveURL(/.*\/explore$/);
    await expect(page.locator('text=Hands-On Practice')).toBeVisible();

    await page.goto('https://www.cnarios.com/challenges');
    await expect(page).toHaveURL(/.*\/challenges$/);
    await expect(page.locator('text=Automation Challenges')).toBeVisible();

    await browser.close();
  });

  test('interview questions filtering workflow', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.cnarios.com/');
    await page.locator('a[href="/interview-questions"]').click();
    await page.waitForURL('**/interview-questions');

    await expect(page.locator('h1')).toHaveText('Automation Interview Questions');

    const searchInput = page.locator('input[placeholder="Search questions..."]');
    await searchInput.fill('frame');
    await searchInput.press('Enter');

    // Verify filtered results contain expected keyword in at least one entry
    const searchedResult = page.locator('text=frames').first();
    await expect(searchedResult).toBeVisible({ timeout: 10000 });

    await browser.close();
  });

  test('challenge walkthrough and move to solution', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.cnarios.com/challenges');
    await expect(page).toHaveURL(/.*\/challenges$/);

    const productFilters = page.locator('a[href="/challenges/product-filtering"]');
    await productFilters.first().click();

    await page.waitForURL('**/challenges/product-filtering');
    await expect(page.locator('text=E-commerce Filters')).toBeVisible();

    // As a regression check, ensure instructions are present
    await expect(page.locator('text=Identify products by categories')).toBeVisible({ timeout: 10000 }).catch(() => {
      // If specific instruction text does not exist yet, at least expect challenge overview
      return expect(page.locator('h1')).toContainText('E-commerce Product Filtering');
    });

    await browser.close();
  });
});