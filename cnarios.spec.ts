import { test, expect, chromium } from '@playwright/test';

// Test suite for https://www.cnarios.com using Playwright Test (works with playwright-cli workflows too)

test.describe.parallel('Cnarios website smoke tests', () => {
  test('homepage loads and title contains Cnarios', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.cnarios.com/');

    await expect(page).toHaveURL('https://www.cnarios.com/');
    await expect(page).toHaveTitle(/Cnarios/i);

    await browser.close();
  });

  test('contains primary hero heading or button', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.cnarios.com/');

    const heroText = page.locator('text=Practice Automation Testing the Way It Happens in the Real World');
    await expect(heroText).toBeVisible({ timeout: 10000 });

    await browser.close();
  });

  test('navigates to Start Exploring and ensures final URL includes /explore', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.cnarios.com/');

    const startExplore = page.locator('text=Start Exploring').first();
    await expect(startExplore).toBeVisible({ timeout: 10000 });
    await startExplore.click();

    await page.waitForLoadState('domcontentloaded');
    await expect(page.url()).toContain('/explore');

    await browser.close();
  });

  test('interview questions search form works by keyword', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const page = await browser.newPage();

    // Start from the main homepage, then navigate to interview questions page.
    await page.goto('https://www.cnarios.com/');
    await expect(page).toHaveURL('https://www.cnarios.com/');

    const interviewLink = page.locator('a[href="/interview-questions"]');
    await expect(interviewLink).toBeVisible({ timeout: 10000 });
    await interviewLink.click();

    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/.*\/interview-questions$/);
    await expect(page).toHaveTitle(/Interview Questions/i);
    await expect(page.locator('h1')).toHaveText('Automation Interview Questions');

    const searchInput = page.locator('input[placeholder="Search questions..."]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    await searchInput.fill('automation');
    await searchInput.press('Enter');

    // Ensure results list is still visible and contains repeated asked counters.
    const askedLabels = page.locator('text=Asked').first();
    await expect(askedLabels).toBeVisible({ timeout: 10000 });

    await browser.close();
  });
});
