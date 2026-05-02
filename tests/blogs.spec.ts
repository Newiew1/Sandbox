import { test, expect } from '@playwright/test';
import { BlogsPage } from '../pages/BlogsPage';

/**
 * Blogs Page Test Suite
 */

test.describe('Blogs Page Tests', () => {
  let blogsPage: BlogsPage;

  test.beforeEach(async ({ page }) => {
    blogsPage = new BlogsPage(page);
    await blogsPage.goto();
  });

  test('TC091: Blogs page loads successfully', async () => {
    await expect(blogsPage.pageHeading).toBeVisible();
    await expect(blogsPage.page).toHaveURL(/.*\/blogs$/);
  });

  test('TC092: Blogs page displays HTML Basics blog card', async () => {
    await expect(blogsPage.htmlBasicsBlogCard).toBeVisible();
  });

  test('TC093: Blogs page displays Locator Strategies blog card', async () => {
    await expect(blogsPage.locatorStrategiesBlogCard).toBeVisible();
  });

  test('TC094: All blog cards are visible', async () => {
    await expect(blogsPage.htmlBasicsBlogCard).toBeVisible();
    await expect(blogsPage.locatorStrategiesBlogCard).toBeVisible();
  });

  test('TC095: HTML Basics blog link is clickable', async () => {
    await expect(blogsPage.htmlBasicsBlogLink).toBeVisible();
    await expect(blogsPage.htmlBasicsBlogLink).toBeEnabled();
  });

  test('TC096: Locator Strategies blog link is clickable', async () => {
    await expect(blogsPage.locatorStrategiesBlogLink).toBeVisible();
    await expect(blogsPage.locatorStrategiesBlogLink).toBeEnabled();
  });

  test('TC097: Click on HTML Basics blog', async () => {
    await blogsPage.clickHTMLBasicsBlog();
    await expect(blogsPage.page).toHaveURL(/.*html-basics/);
  });

  test('TC098: Click on Locator Strategies blog', async () => {
    await blogsPage.clickLocatorStrategiesBlog();
    await expect(blogsPage.page).toHaveURL(/.*Locators/);
  });

  test('TC099: Blog detail page loads correctly', async () => {
    await blogsPage.gotoBlogByName('html-basics');
    await expect(blogsPage.pageHeading).toBeVisible();
  });

  test('TC100: Page heading text is correct', async () => {
    await expect(blogsPage.pageHeading).toContainText('Latest Blogs');
  });

  test('TC101: Blog card count is greater than zero', async () => {
    const blogLinks = blogsPage.page.locator('a[href*="/blogs/"]');
    await expect(blogLinks.first()).toBeVisible();
  });

  test('TC102: Blog links are retrievable', async () => {
    const blogLinks = blogsPage.page.locator('a[href*="/blogs/"]');
    await expect(blogLinks.first()).toBeVisible();
  });

  test('TC103: HTML Basics blog link is enabled', async () => {
    await expect(blogsPage.htmlBasicsBlogLink).toBeEnabled();
  });

  test('TC104: Navigate to blog and verify content', async () => {
    await blogsPage.gotoBlogByName('html-basics');
    await expect(blogsPage.pageHeading).toBeVisible();
  });

  test('TC105: Navigation is visible on blogs page', async () => {
    await expect(blogsPage.navigationBar).toBeVisible();
  });

  test('TC106: Footer is visible on blogs page', async () => {
    await expect(blogsPage.footer).toBeVisible();
  });

  test('TC107: Page title contains Blogs', async () => {
    const title = await blogsPage.page.title();
    expect(title).toContain('Blogs');
  });

  test('TC108: Blogs page description is visible', async () => {
    await expect(blogsPage.pageDescription).toBeVisible();
  });

  test('TC109: All blog cards have clickable links', async () => {
    const blogLinks = blogsPage.page.locator('a[href*="/blogs/"]');
    for (let i = 0; i < await blogLinks.count(); i++) {
      const href = await blogLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/\/blogs\//);  
    }
  });
});
