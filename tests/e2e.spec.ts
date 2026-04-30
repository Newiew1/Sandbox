import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ExplorePage } from '../pages/ExplorePage';
import { InterviewQuestionsPage } from '../pages/InterviewQuestionsPage';
import { ConceptsPage } from '../pages/ConceptsPage';
import { ChallengePage } from '../pages/ChallengePage';
import { BlogsPage } from '../pages/BlogsPage';

/**
 * End-to-End User Journey Tests
 * Tests complete user workflows across the application
 */

test.describe('End-to-End User Journeys', () => {
  test('TC110: Complete user journey - Home to Explore to Concepts', async ({ page }) => {
    const homePage = new HomePage(page);
    const explorePage = new ExplorePage(page);
    const conceptsPage = new ConceptsPage(page);

    // Start at home
    await homePage.goto();
    const isHomeLoaded = await homePage.verifyPageLoaded();
    expect(isHomeLoaded).toBeTruthy();

    // Navigate to explore
    await homePage.clickStartExploring();
    const isExploreLoaded = await explorePage.verifyPageLoaded();
    expect(isExploreLoaded).toBeTruthy();

    // Navigate to concepts
    await explorePage.clickStartLearning();
    const currentURL = await explorePage.getCurrentURL();
    expect(currentURL).toContain('concepts');
  });

  test('TC111: Complete user journey - Home to Challenges', async ({ page }) => {
    const homePage = new HomePage(page);
    const challengePage = new ChallengePage(page);

    // Start at home
    await homePage.goto();
    const isHomeLoaded = await homePage.verifyPageLoaded();
    expect(isHomeLoaded).toBeTruthy();

    // Navigate to challenges
    await homePage.clickChallenges();
    const isChallengeLoaded = await challengePage.verifyPageLoaded();
    expect(isChallengeLoaded).toBeTruthy();

    const currentURL = await challengePage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/challenges$/);
  });

  test('TC112: Complete user journey - Home to Interviews with Search', async ({ page }) => {
    const homePage = new HomePage(page);
    const explorePage = new ExplorePage(page);
    const interviewPage = new InterviewQuestionsPage(page);

    // Start at home
    await homePage.goto();
    
    // Navigate to explore
    await homePage.clickStartExploring();
    
    // Navigate to interview questions
    await explorePage.clickExploreQuestions();
    const isLoaded = await interviewPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Perform search
    await interviewPage.searchQuestions('framework');
    const questionsDisplayed = await interviewPage.verifyQuestionsDisplayed();
    expect(questionsDisplayed).toBeTruthy();
  });

  test('TC113: Complete user journey - Home to Blogs to Article', async ({ page }) => {
    const homePage = new HomePage(page);
    const explorePage = new ExplorePage(page);
    const blogsPage = new BlogsPage(page);

    // Start at home
    await homePage.goto();
    
    // Navigate to explore
    await homePage.clickStartExploring();
    
    // Navigate to blogs
    await explorePage.clickReadBlogs();
    const isLoaded = await blogsPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Navigate to HTML Basics blog
    await blogsPage.clickHTMLBasicsBlog();
    const detailPageLoaded = await blogsPage.verifyBlogDetailPageLoaded();
    expect(detailPageLoaded).toBeTruthy();
  });

  test('TC114: Complete user journey - Challenge exploration and navigation', async ({ page }) => {
    const challengePage = new ChallengePage(page);

    // Navigate to challenges page
    await challengePage.goto();
    const isLoaded = await challengePage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Click on Product Filtering challenge
    await challengePage.clickProductFilteringChallenge();
    const currentURL = await challengePage.getCurrentURL();
    expect(currentURL).toContain('product-filtering');

    // Verify challenge content
    const titleVisible = await challengePage.verifyChallengeTitle();
    expect(titleVisible).toBeTruthy();
  });

  test('TC115: Complete user journey - Concept exploration with tab switching', async ({ page }) => {
    const conceptsPage = new ConceptsPage(page);

    // Navigate to iframe concept
    await conceptsPage.goto('iframe');
    const isLoaded = await conceptsPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Switch to Try It Yourself tab
    await conceptsPage.clickTryItYourselfTab();
    const isTryItSelected = await conceptsPage.isTryItYourselfTabSelected();
    expect(isTryItSelected).toBeTruthy();

    // Switch to Test Cases tab
    await conceptsPage.clickTestCasesTab();
    const isTestCasesSelected = await conceptsPage.isTestCasesTabSelected();
    expect(isTestCasesSelected).toBeTruthy();

    // Switch back to Concept tab
    await conceptsPage.clickConceptTab();
    const isConceptSelected = await conceptsPage.isConceptTabSelected();
    expect(isConceptSelected).toBeTruthy();
  });

  test('TC116: Navigation flow - Home -> Explore -> Back to Home', async ({ page }) => {
    const homePage = new HomePage(page);
    const explorePage = new ExplorePage(page);

    // Start at home
    await homePage.goto();
    let url = await homePage.getCurrentURL();
    expect(url).toMatch(/^https:\/\/www\.cnarios\.com\/$|^https:\/\/www\.cnarios\.com$/);

    // Navigate to explore
    await homePage.clickStartExploring();
    url = await explorePage.getCurrentURL();
    expect(url).toContain('explore');

    // Go back to home
    await explorePage.goBack();
    url = await explorePage.getCurrentURL();
    expect(url).toMatch(/^https:\/\/www\.cnarios\.com\/$|^https:\/\/www\.cnarios\.com$/);
  });

  test('TC117: Filter testing - Interview questions filter interaction', async ({ page }) => {
    const interviewPage = new InterviewQuestionsPage(page);

    // Navigate to interview questions
    await interviewPage.goto();
    const isLoaded = await interviewPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Test search with multiple keywords
    for (const keyword of ['selenium', 'xpath', 'css']) {
      await interviewPage.searchQuestions(keyword);
      const inputValue = await interviewPage.getSearchInputValue();
      expect(inputValue).toBe(keyword);
    }

    // Clear search
    await interviewPage.clearSearchInput();
    const clearedValue = await interviewPage.getSearchInputValue();
    expect(clearedValue).toBe('');
  });

  test('TC118: Multi-concept navigation', async ({ page }) => {
    const conceptsPage = new ConceptsPage(page);

    const concepts = ['iframe', 'multiwindow', 'links', 'table'];

    for (const concept of concepts) {
      await conceptsPage.navigateToConcept(concept);
      const url = await conceptsPage.getCurrentURL();
      expect(url).toContain(concept);
      
      const headingText = await conceptsPage.getPageHeadingText();
      expect(headingText.length).toBeGreaterThan(0);
    }
  });

  test('TC119: Full navigation bar test across all pages', async ({ page }) => {
    const homePage = new HomePage(page);
    const pages = [
      { page: new HomePage(page), path: '/' },
      { page: new ExplorePage(page), path: '/explore' },
      { page: new InterviewQuestionsPage(page), path: '/interview-questions' },
      { page: new ChallengePage(page), path: '/challenges' },
      { page: new BlogsPage(page), path: '/blogs' },
    ];

    for (const pageObj of pages) {
      await page.goto(`https://www.cnarios.com${pageObj.path}`);
      const navVisible = await homePage.isNavigationVisible();
      expect(navVisible).toBeTruthy();
    }
  });

  test('TC120: Footer links validation across pages', async ({ page }) => {
    const homePage = new HomePage(page);
    const pages = ['/', '/explore', '/challenges'];

    for (const path of pages) {
      await page.goto(`https://www.cnarios.com${path}`);
      const footerVisible = await homePage.isFooterVisible();
      expect(footerVisible).toBeTruthy();
    }
  });
});
