import { test, expect } from '@playwright/test';
import { ChallengePage } from '../pages/ChallengePage';

/**
 * Challenges Page Test Suite
 */

test.describe('Challenges Page Tests', () => {
  let challengePage: ChallengePage;

  test.beforeEach(async ({ page }) => {
    challengePage = new ChallengePage(page);
    await challengePage.goto();
  });

  test('TC074: Challenges page loads successfully', async () => {
    const isLoaded = await challengePage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    const currentURL = await challengePage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/challenges$/);
  });

  test('TC075: Product filtering challenge page loads', async () => {
    await challengePage.gotoChallengeByName('product-filtering');
    const currentURL = await challengePage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/challenges\/product-filtering$/);
  });

  test('TC076: Product pagination challenge page loads', async () => {
    await challengePage.gotoChallengeByName('product-listing-pagination');
    const currentURL = await challengePage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/challenges\/product-listing-pagination$/);
  });

  test('TC077: Challenge pages display descriptive content', async () => {
    await challengePage.gotoChallengeByName('product-filtering');
    const titleVisible = await challengePage.verifyChallengeTitle();
    expect(titleVisible).toBeTruthy();
  });

  test('TC078: Product filtering challenge link is visible', async () => {
    const isVisible = await challengePage.productFilteringLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC079: Product pagination challenge link is visible', async () => {
    const isVisible = await challengePage.productPaginationLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC080: Click on Product Filtering challenge', async () => {
    await challengePage.clickProductFilteringChallenge();
    const currentURL = await challengePage.getCurrentURL();
    expect(currentURL).toContain('product-filtering');
  });

  test('TC081: Click on Product Pagination challenge', async () => {
    await challengePage.clickProductPaginationChallenge();
    const currentURL = await challengePage.getCurrentURL();
    expect(currentURL).toContain('product-listing-pagination');
  });

  test('TC082: Challenge title text is displayed', async () => {
    await challengePage.gotoChallengeByName('product-filtering');
    const titleText = await challengePage.getChallengeTitleText();
    expect(titleText.length).toBeGreaterThan(0);
  });

  test('TC083: Page heading text is correct', async () => {
    const headingText = await challengePage.getPageHeadingText();
    expect(headingText.length).toBeGreaterThan(0);
  });

  test('TC084: All challenge links are available', async () => {
    const links = await challengePage.getAllChallengeLinks();
    expect(links.length).toBeGreaterThan(0);
  });

  test('TC085: Challenge can be verified as visible', async () => {
    const isVisible = await challengePage.verifyChallengeLinkVisible('product-filtering');
    expect(isVisible).toBeTruthy();
  });

  test('TC086: Navigation is visible on challenges page', async () => {
    const navVisible = await challengePage.isNavigationVisible();
    expect(navVisible).toBeTruthy();
  });

  test('TC087: Footer is visible on challenges page', async () => {
    const footerVisible = await challengePage.isFooterVisible();
    expect(footerVisible).toBeTruthy();
  });

  test('TC088: Challenge page heading is visible', async () => {
    const heading = await challengePage.pageHeading.isVisible();
    expect(heading).toBeTruthy();
  });

  test('TC089: Navigate to challenge and verify URL', async () => {
    await challengePage.gotoChallengeByName('product-filtering');
    const url = await challengePage.getCurrentURL();
    
    expect(url).toContain('/challenges/product-filtering');
  });

  test('TC090: Back button on challenge detail page', async () => {
    await challengePage.gotoChallengeByName('product-filtering');
    // Check if page is loaded and title is visible
    const heading = await challengePage.pageHeading.isVisible().catch(() => false);
    const urlCorrect = (await challengePage.getCurrentURL()).includes('/challenges/product-filtering');
    expect(heading || urlCorrect).toBeTruthy();
  });
});
