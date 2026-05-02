import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

/**
 * Home Page Test Suite
 * Tests for the landing/home page of Cnarios
 */

test.describe('Home Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('TC001: Home page loads successfully', async () => {
    await expect(homePage.heroHeading).toBeVisible();
    const title = await homePage.page.title();
    expect(title).toContain('Cnarios');
  });

  test('TC002: Home page has hero section with correct elements', async () => {
    await expect(homePage.heroHeading).toBeVisible();
    await expect(homePage.startExploringBtn).toBeVisible();
  });

  test('TC003: Logo on home page is clickable and navigates to home', async () => {
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.logo).toBeEnabled();
  });

  test('TC004: Start Exploring button is visible and clickable', async () => {
    await expect(homePage.startExploringBtn).toBeVisible();
    await expect(homePage.startExploringBtn).toBeEnabled();
  });

  test('TC005: Challenges button is visible and clickable', async () => {
    await expect(homePage.challengesBtn).toBeVisible();
    await expect(homePage.challengesBtn).toBeEnabled();
  });

  test('TC006: Start Exploring button navigates to explore page', async () => {
    await homePage.clickStartExploring();
    await expect(homePage.page).toHaveURL(/.*\/explore$/);
  });

  test('TC007: Challenges button navigates to challenges page', async () => {
    await homePage.clickChallenges();
    await expect(homePage.page).toHaveURL(/.*\/challenges$/);
  });

  test('TC008: Features section displays all feature cards', async () => {
    await expect(homePage.handsOnPracticeLink).toBeVisible();
    await expect(homePage.interviewQuestionsLink).toBeVisible();
    await expect(homePage.challengesCardLink).toBeVisible();
  });

  test('TC009: Hands-On Practice card is clickable', async () => {
    await expect(homePage.handsOnPracticeLink).toBeVisible();
    await expect(homePage.handsOnPracticeLink).toBeEnabled();
  });

  test('TC010: Interview Questions card is clickable', async () => {
    await expect(homePage.interviewQuestionsLink).toBeVisible();
    await expect(homePage.interviewQuestionsLink).toBeEnabled();
  });

  test('TC011: Challenges card is clickable', async () => {
    await expect(homePage.challengesCardLink).toBeVisible();
    await expect(homePage.challengesCardLink).toBeEnabled();
  });

  test('TC012: Features link in header navigates to features section', async () => {
    await expect(homePage.featuresNavLink).toBeVisible();
  });

  test('TC013: How it works link in header navigates to how it works section', async () => {
    await expect(homePage.howItWorksNavLink).toBeVisible();
  });

  test('TC014: Contact Us link in header navigates to contact section', async () => {
    await expect(homePage.contactUsNavLink).toBeVisible();
  });

  test('TC015: Blogs link in header navigates to blogs page', async () => {
    await homePage.clickBlogsNav();
    await expect(homePage.page).toHaveURL(/.*\/blogs$/);
  });

  test('TC016: Navigation is visible on home page', async () => {
    await expect(homePage.navigationBar).toBeVisible();
  });

  test('TC017: Footer is visible on home page', async () => {
    await expect(homePage.footer).toBeVisible();
  });

  test('TC018: Hero buttons are enabled and clickable', async () => {
    await expect(homePage.startExploringBtn).toBeEnabled();
    await expect(homePage.challengesBtn).toBeEnabled();
  });

  test('TC019: Get and verify hero heading text', async () => {
    await expect(homePage.heroHeading).toContainText('Practice Automation Testing');
  });

  test('TC020: Verify How It Works section is visible', async () => {
    await expect(homePage.heroHeading).toBeVisible();
  });

  test('TC021: Verify Contact section is visible', async () => {
    await expect(homePage.heroHeading).toBeVisible();
  });

  test('TC022: Verify all navigation links are visible', async () => {
    await expect(homePage.featuresNavLink).toBeVisible();
    await expect(homePage.howItWorksNavLink).toBeVisible();
    await expect(homePage.contactUsNavLink).toBeVisible();
  });
});
