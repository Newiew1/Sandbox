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
    const isLoaded = await explorePage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    const currentURL = await explorePage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/explore$/);
  });

  test('TC024: Explore page has back button', async () => {
    const isVisible = await explorePage.backButton.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC025: Back button on explore page returns to home', async () => {
    await explorePage.goBack();
    const currentURL = await explorePage.getCurrentURL();
    expect(currentURL).toMatch(/^https:\/\/www\.cnarios\.com\/$|^https:\/\/www\.cnarios\.com$/);
  });

  test('TC026: Explore page displays trending sections', async () => {
    const sectionsVisible = await explorePage.verifyTrendingSections();
    expect(sectionsVisible).toBeTruthy();
  });

  test('TC027: Explore Questions button navigates to interview questions', async () => {
    await explorePage.clickExploreQuestions();
    const currentURL = await explorePage.getCurrentURL();
    expect(currentURL).toContain('interview-questions');
  });

  test('TC028: Start Learning button navigates to concepts', async () => {
    await explorePage.clickStartLearning();
    const currentURL = await explorePage.getCurrentURL();
    expect(currentURL).toContain('concepts');
  });

  test('TC029: Take Challenge button navigates to challenges', async () => {
    await explorePage.clickTakeChallenge();
    const currentURL = await explorePage.getCurrentURL();
    expect(currentURL).toContain('challenges');
  });

  test('TC030: Read Blogs button navigates to blogs', async () => {
    await explorePage.clickReadBlogs();
    const currentURL = await explorePage.getCurrentURL();
    expect(currentURL).toContain('blogs');
  });

  test('TC031: Explore page heading is displayed', async () => {
    const headingText = await explorePage.getPageHeadingText();
    expect(headingText).toContain('Explore');
  });

  test('TC032: All CTA buttons are visible on explore page', async () => {
    const allVisible = await explorePage.verifyAllCTAButtons();
    expect(allVisible).toBeTruthy();
  });

  test('TC033: Back button visibility on explore page', async () => {
    const isVisible = await explorePage.verifyBackButtonVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC034: Navigation is visible on explore page', async () => {
    const navVisible = await explorePage.isNavigationVisible();
    expect(navVisible).toBeTruthy();
  });

  test('TC035: Footer is visible on explore page', async () => {
    const footerVisible = await explorePage.isFooterVisible();
    expect(footerVisible).toBeTruthy();
  });
});
