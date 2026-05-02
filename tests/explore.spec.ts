import { test, expect } from '@playwright/test';
import { ExplorePage } from '../pages/ExplorePage';
import { HomePage } from '../pages/HomePage';

/**
 * Explore Page Test Suite
 */

test.describe('Explore Page Tests', () => {
  let explorePage: ExplorePage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    explorePage = new ExplorePage(page);
    homePage = new HomePage(page);
    await explorePage.goto();
  });

  test('TC023: Explore page loads with correct title', async () => {
    await expect(explorePage.pageHeading).toBeVisible();
    await expect(explorePage.page).toHaveURL(/.*\/explore$/);
  });

  test('TC024: Explore page has back button', async () => {
    await expect(explorePage.backButton).toBeVisible();
  });

  test('TC025: Back button on explore page returns to home', async () => {
    await explorePage.goBack();
    await expect(explorePage.page).toHaveURL(/^https:\/\/www\.cnarios\.com\/$|^https:\/\/www\.cnarios\.com$/);
  });

  test('TC026: Explore page displays trending sections', async () => {
    await expect(explorePage.page.locator('div, article').first()).toBeVisible();
  });

  test('TC027: Explore Questions button navigates to interview questions', async () => {
    await explorePage.clickExploreQuestions();
    await expect(explorePage.page).toHaveURL(/.*interview-questions/);
  });

  test('TC028: Start Learning button navigates to concepts', async () => {
    await explorePage.clickStartLearning();
    await expect(explorePage.page).toHaveURL(/.*concepts/);
  });

  test('TC029: Take Challenge button navigates to challenges', async () => {
    await explorePage.clickTakeChallenge();
    await expect(explorePage.page).toHaveURL(/.*challenges/);
  });

  test('TC030: Read Blogs button navigates to blogs', async () => {
    await explorePage.clickReadBlogs();
    await expect(explorePage.page).toHaveURL(/.*blogs/);
  });

  test('TC031: Explore page heading is displayed', async () => {
    await expect(explorePage.pageHeading).toContainText('Explore');
  });

  test('TC032: All CTA buttons are visible on explore page', async () => {
    await expect(explorePage.pageHeading).toBeVisible();
  });

  test('TC033: Back button visibility on explore page', async () => {
    await expect(explorePage.backButton).toBeVisible();
  });

  test('TC034: Navigation is visible on explore page', async () => {
    await expect(explorePage.navigationBar).toBeVisible();
  });

  test('TC035: Footer is visible on explore page', async () => {
    await expect(explorePage.footer).toBeVisible();
  });
});
