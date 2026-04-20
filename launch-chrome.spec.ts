import { test, expect, chromium } from '@playwright/test';

// YouTube Basic Functions test suite using real Chrome.
// Make sure Chrome is installed (`channel: 'chrome'`) and Playwright dependencies are set up.

test.describe('YouTube basic functions', () => {
  test('open homepage and validate title', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.youtube.com');
    await expect(page).toHaveTitle(/YouTube/i);

    // Keep browser open for manual inspection
    // await browser.close();
  });

  test('search for 007 and verify first result', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.youtube.com');
    await page.fill('[name="search_query"]', '007');
    await page.keyboard.press('Enter');

    await page.waitForSelector('#video-title');
    const firstVideo = (await page.$$('#video-title'))[0];
    const firstVideoTitle = await firstVideo?.innerText();

    console.log('First video title:', firstVideoTitle);
    expect(firstVideoTitle).toBeTruthy();

    // Keep browser open for manual inspection
    // await browser.close();
  });

  test('play first result and check video player loads', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.youtube.com');
    await page.fill('[name="search_query"]', '007');
    await page.keyboard.press('Enter');

    await page.waitForSelector('#video-title');
    const firstVideo = page.locator('#video-title').first();
    await expect(firstVideo).toBeVisible({ timeout: 10000 });

    // Some themes present #video-title as a clickable element rather than explicit href.
    await firstVideo.click();

    await page.waitForURL(/watch\?v=/, { timeout: 20000 });
    await page.waitForSelector('.html5-video-player', { timeout: 20000 });
    await expect(page.locator('.html5-video-player')).toBeVisible();

    // Keep browser open for manual inspection
    // await browser.close();
  });
});
