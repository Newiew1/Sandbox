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
    const isLoaded = await blogsPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    const currentURL = await blogsPage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/blogs$/);
  });

  test('TC092: Blogs page displays HTML Basics blog card', async () => {
    const isVisible = await blogsPage.htmlBasicsBlogCard.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC093: Blogs page displays Locator Strategies blog card', async () => {
    const isVisible = await blogsPage.locatorStrategiesBlogCard.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC094: All blog cards are visible', async () => {
    const allVisible = await blogsPage.verifyAllBlogCards();
    expect(allVisible).toBeTruthy();
  });

  test('TC095: HTML Basics blog link is clickable', async () => {
    const isVisible = await blogsPage.htmlBasicsBlogLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC096: Locator Strategies blog link is clickable', async () => {
    const isVisible = await blogsPage.locatorStrategiesBlogLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC097: Click on HTML Basics blog', async () => {
    await blogsPage.clickHTMLBasicsBlog();
    const currentURL = await blogsPage.getCurrentURL();
    expect(currentURL).toContain('html-basics');
  });

  test('TC098: Click on Locator Strategies blog', async () => {
    await blogsPage.clickLocatorStrategiesBlog();
    const currentURL = await blogsPage.getCurrentURL();
    expect(currentURL).toContain('Locators');
  });

  test('TC099: Blog detail page loads correctly', async () => {
    await blogsPage.gotoBlogByName('html-basics');
    const isLoaded = await blogsPage.verifyBlogDetailPageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('TC100: Page heading text is correct', async () => {
    const headingText = await blogsPage.getPageHeadingText();
    expect(headingText).toContain('Latest Blogs');
  });

  test('TC101: Blog card count is greater than zero', async () => {
    const count = await blogsPage.getBlogCardCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC102: Blog links are retrievable', async () => {
    const links = await blogsPage.getAllBlogLinks();
    expect(links.length).toBeGreaterThan(0);
  });

  test('TC103: HTML Basics blog link is enabled', async () => {
    const isEnabled = await blogsPage.isBlogLinkClickable(blogsPage.htmlBasicsBlogLink);
    expect(isEnabled).toBeTruthy();
  });

  test('TC104: Navigate to blog and verify content', async () => {
    await blogsPage.gotoBlogByName('html-basics');
    const content = await blogsPage.getBlogContent();
    expect(content.length).toBeGreaterThan(0);
  });

  test('TC105: Navigation is visible on blogs page', async () => {
    const navVisible = await blogsPage.isNavigationVisible();
    expect(navVisible).toBeTruthy();
  });

  test('TC106: Footer is visible on blogs page', async () => {
    const footerVisible = await blogsPage.isFooterVisible();
    expect(footerVisible).toBeTruthy();
  });

  test('TC107: Page title contains Blogs', async () => {
    const title = await blogsPage.getPageTitle();
    expect(title).toContain('Blogs');
  });

  test('TC108: Blogs page description is visible', async () => {
    const isVisible = await blogsPage.pageDescription.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC109: All blog cards have clickable links', async () => {
    const links = await blogsPage.getAllBlogLinks();
    for (const link of links) {
      expect(link).toMatch(/\/blogs\//);
    }
  });
});
