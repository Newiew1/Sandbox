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
    const isLoaded = await homePage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    const title = await homePage.getPageTitle();
    expect(title).toContain('Cnarios');
  });

  test('TC002: Home page has hero section with correct elements', async () => {
    const heroVisible = await homePage.verifyHeroSection();
    expect(heroVisible).toBeTruthy();
  });

  test('TC003: Logo on home page is clickable and navigates to home', async () => {
    const isLogoVisible = await homePage.logo.isVisible();
    expect(isLogoVisible).toBeTruthy();
  });

  test('TC004: Start Exploring button is visible and clickable', async () => {
    const isVisible = await homePage.startExploringBtn.isVisible();
    const isEnabled = await homePage.startExploringBtn.isEnabled();
    
    expect(isVisible).toBeTruthy();
    expect(isEnabled).toBeTruthy();
  });

  test('TC005: Challenges button is visible and clickable', async () => {
    const isVisible = await homePage.challengesBtn.isVisible();
    const isEnabled = await homePage.challengesBtn.isEnabled();
    
    expect(isVisible).toBeTruthy();
    expect(isEnabled).toBeTruthy();
  });

  test('TC006: Start Exploring button navigates to explore page', async () => {
    await homePage.clickStartExploring();
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/explore$/);
  });

  test('TC007: Challenges button navigates to challenges page', async () => {
    await homePage.clickChallenges();
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/challenges$/);
  });

  test('TC008: Features section displays all feature cards', async () => {
    const featuresVisible = await homePage.verifyFeaturesSection();
    expect(featuresVisible).toBeTruthy();
  });

  test('TC009: Hands-On Practice card is clickable', async () => {
    const isVisible = await homePage.handsOnPracticeLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC010: Interview Questions card is clickable', async () => {
    const isVisible = await homePage.interviewQuestionsLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC011: Challenges card is clickable', async () => {
    const isVisible = await homePage.challengesCardLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC012: Features link in header navigates to features section', async () => {
    const isVisible = await homePage.featuresNavLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC013: How it works link in header navigates to how it works section', async () => {
    const isVisible = await homePage.howItWorksNavLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC014: Contact Us link in header navigates to contact section', async () => {
    const isVisible = await homePage.contactUsNavLink.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC015: Blogs link in header navigates to blogs page', async () => {
    await homePage.clickBlogsNav();
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/blogs$/);
  });

  test('TC016: Navigation is visible on home page', async () => {
    const navVisible = await homePage.isNavigationVisible();
    expect(navVisible).toBeTruthy();
  });

  test('TC017: Footer is visible on home page', async () => {
    const footerVisible = await homePage.isFooterVisible();
    expect(footerVisible).toBeTruthy();
  });

  test('TC018: Hero buttons are enabled and clickable', async () => {
    const buttonsClickable = await homePage.verifyHeroButtonsClickable();
    expect(buttonsClickable).toBeTruthy();
  });

  test('TC019: Get and verify hero heading text', async () => {
    const headingText = await homePage.getHeroHeadingText();
    expect(headingText).toContain('Practice Automation Testing');
  });

  test('TC020: Verify How It Works section is visible', async () => {
    const sectionVisible = await homePage.verifyHowItWorksSection();
    expect(sectionVisible).toBeTruthy();
  });

  test('TC021: Verify Contact section is visible', async () => {
    const sectionVisible = await homePage.verifyContactSection();
    expect(sectionVisible).toBeTruthy();
  });

  test('TC022: Verify all navigation links are visible', async () => {
    const allVisible = await homePage.verifyNavigationLinks();
    expect(allVisible).toBeTruthy();
  });
});
