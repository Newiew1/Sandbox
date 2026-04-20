import { test, expect, chromium } from '@playwright/test';

// E2E Regression Pack for Cnarios - Real end-to-end user workflows

test.describe('Cnarios E2E User Workflows', () => {
  
  test('Complete user journey: Home → Explore → View Challenge', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const page = await browser.newPage();

    // Step 1: User lands on home
    await page.goto('https://www.cnarios.com/');
    await expect(page).toHaveTitle(/Cnarios/i);
    
    // Step 2: User clicks "Start Exploring" button
    const exploreBtn = page.locator('text=Start Exploring');
    await expect(exploreBtn).toBeVisible();
    await exploreBtn.click();
    
    // Step 3: Verify navigation to explore page
    await page.waitForURL('**/explore');
    await expect(page.locator('text=Hands-On Practice')).toBeVisible();

    await browser.close();
  });

  test('User searches for interview questions and filters results', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const page = await browser.newPage();

    // Step 1: Navigate to interview questions
    await page.goto('https://www.cnarios.com/interview-questions');
    await expect(page.locator('h1')).toContainText('Automation Interview Questions');

    // Step 2: User enters search term
    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('frame');
    await searchInput.press('Enter');

    // Step 3: Verify filtered results contain keyword
    const results = page.locator('text=frames');
    await expect(results.first()).toBeVisible({ timeout: 10000 });

    await browser.close();
  });

  test('User accesses challenge and views instructions', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage();

    // Step 1: Navigate to challenges page
    await page.goto('https://www.cnarios.com/challenges');
    await page.waitForURL('**/challenges');

    // Step 2: User clicks on a specific challenge
    const challenge = page.locator('a[href="/challenges/product-filtering"]');
    await expect(challenge).toBeVisible();
    await challenge.first().click();

    // Step 3: Verify challenge page loaded with content
    await page.waitForURL('**/challenges/product-filtering');
    const challengeTitle = page.locator('h1, text=E-commerce');
    await expect(challengeTitle).toBeVisible({ timeout: 10000 });

    await browser.close();
  });

  test('Cross-browser compatibility: Navigate on Edge', async () => {
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage();

    // Same workflow, different browser
    await page.goto('https://www.cnarios.com/');
    await expect(page.locator('text=Start Exploring')).toBeVisible();
    
    await page.locator('text=Start Exploring').click();
    await page.waitForURL('**/explore');
    await expect(page).toHaveURL(/.*\/explore$/);

    await browser.close();
  });

  test('User navigation consistency across multiple pages', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage();

    // Multi-step workflow with state changes
    await page.goto('https://www.cnarios.com/');
    await expect(page.locator('text=Start Exploring')).toBeVisible();

    // Navigate to explore
    await page.goto('https://www.cnarios.com/explore');
    await expect(page).toHaveURL(/.*\/explore$/);
    await expect(page.locator('text=Hands-On Practice')).toBeVisible();

    // Navigate to challenges
    await page.goto('https://www.cnarios.com/challenges');
    await expect(page).toHaveURL(/.*\/challenges$/);
    await expect(page.locator('text=Automation Challenges')).toBeVisible();

    // Go back via browser back button (real E2E behavior)
    await page.goBack();
    await expect(page).toHaveURL(/.*\/explore$/);

    await browser.close();
  });

});

