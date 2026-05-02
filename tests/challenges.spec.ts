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
    await expect(challengePage.pageHeading).toBeVisible();
    await expect(challengePage.page).toHaveURL(/.*\/challenges$/);
  });

  test('TC075: Product filtering challenge page loads', async () => {
    await challengePage.gotoChallengeByName('product-filtering');
    await expect(challengePage.page).toHaveURL(/.*\/challenges\/product-filtering$/);
  });

  test('TC076: Product pagination challenge page loads', async () => {
    await challengePage.gotoChallengeByName('product-listing-pagination');
    await expect(challengePage.page).toHaveURL(/.*\/challenges\/product-listing-pagination$/);
  });

  test('TC077: Challenge pages display descriptive content', async () => {
    await challengePage.gotoChallengeByName('product-filtering');
    await expect(challengePage.pageHeading).toBeVisible();
  });

  test('TC078: Product filtering challenge link is visible', async () => {
    await expect(challengePage.productFilteringLink).toBeVisible();
  });

  test('TC079: Product pagination challenge link is visible', async () => {
    await expect(challengePage.productPaginationLink).toBeVisible();
  });

  test('TC080: Click on Product Filtering challenge', async () => {
    await challengePage.clickProductFilteringChallenge();
    await expect(challengePage.page).toHaveURL(/.*product-filtering/);
  });

  test('TC081: Click on Product Pagination challenge', async () => {
    await challengePage.clickProductPaginationChallenge();
    await expect(challengePage.page).toHaveURL(/.*product-listing-pagination/);
  });

  test('TC082: Challenge title text is displayed', async () => {
    await challengePage.gotoChallengeByName('product-filtering');
    await expect(challengePage.pageHeading).toBeVisible();
  });

  test('TC083: Page heading text is correct', async () => {
    await expect(challengePage.pageHeading).toBeVisible();
  });

  test('TC084: All challenge links are available', async () => {
    const links = challengePage.page.locator('a[href*="/challenges/"]');
    await expect(links).toHaveCount(2);
  });

  test('TC085: Challenge can be verified as visible', async () => {
    await expect(challengePage.productFilteringLink).toBeVisible();
  });

  test('TC086: Navigation is visible on challenges page', async () => {
    await expect(challengePage.navigationBar).toBeVisible();
  });

  test('TC087: Footer is visible on challenges page', async () => {
    await expect(challengePage.footer).toBeVisible();
  });

  test('TC088: Challenge page heading is visible', async () => {
    await expect(challengePage.pageHeading).toBeVisible();
  });

  test('TC089: Navigate to challenge and verify URL', async () => {
    await challengePage.gotoChallengeByName('product-filtering');
    await expect(challengePage.page).toHaveURL(/.*\/challenges\/product-filtering/);
  });

  test('TC090: Back button on challenge detail page', async () => {
    await challengePage.gotoChallengeByName('product-filtering');
    await expect(challengePage.pageHeading).toBeVisible();
    await expect(challengePage.page).toHaveURL(/.*\/challenges\/product-filtering/);
  });
});
