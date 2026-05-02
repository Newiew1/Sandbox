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
    await expect(homePage.heroHeading).toBeVisible();

    // Navigate to explore
    await homePage.clickStartExploring();
    await expect(explorePage.pageHeading).toBeVisible();

    // Navigate to concepts
    await explorePage.clickStartLearning();
    await expect(page).toHaveURL(/.*concepts/);
  });

  test('TC111: Complete user journey - Home to Challenges', async ({ page }) => {
    const homePage = new HomePage(page);
    const challengePage = new ChallengePage(page);

    // Start at home
    await homePage.goto();
    await expect(homePage.heroHeading).toBeVisible();

    // Navigate to challenges
    await homePage.clickChallenges();
    await expect(challengePage.pageHeading).toBeVisible();
    await expect(page).toHaveURL(/.*\/challenges$/);
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
    await expect(interviewPage.pageHeading).toBeVisible();

    // Perform search
    await interviewPage.searchQuestions('framework');
    await expect(interviewPage.page.locator('ul li, div[class*="list"] div').first()).toHaveCount(1);
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
    await expect(blogsPage.pageHeading).toBeVisible();

    // Navigate to HTML Basics blog
    await blogsPage.clickHTMLBasicsBlog();
    await expect(blogsPage.pageHeading).toBeVisible();
  });

  test('TC114: Complete user journey - Challenge exploration and navigation', async ({ page }) => {
    const challengePage = new ChallengePage(page);

    // Navigate to challenges page
    await challengePage.goto();
    await expect(challengePage.pageHeading).toBeVisible();

    // Click on Product Filtering challenge
    await challengePage.clickProductFilteringChallenge();
    await expect(page).toHaveURL(/.*product-filtering/);

    // Verify challenge content
    await expect(challengePage.pageHeading).toBeVisible();
  });

  test('TC115: Complete user journey - Concept exploration with tab switching', async ({ page }) => {
    const conceptsPage = new ConceptsPage(page);

    // Navigate to iframe concept
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.pageHeading).toBeVisible();

    // Switch to Try It Yourself tab
    await conceptsPage.clickTryItYourselfTab();
    await expect(conceptsPage.tryItYourselfTab).toHaveAttribute('aria-selected', 'true');

    // Switch to Test Cases tab
    await conceptsPage.clickTestCasesTab();
    await expect(conceptsPage.testCasesTab).toHaveAttribute('aria-selected', 'true');

    // Switch back to Concept tab
    await conceptsPage.clickConceptTab();
    await expect(conceptsPage.conceptTab).toHaveAttribute('aria-selected', 'true');
  });

  test('TC116: Navigation flow - Home -> Explore -> Back to Home', async ({ page }) => {
    const homePage = new HomePage(page);
    const explorePage = new ExplorePage(page);

    // Start at home
    await homePage.goto();
    await expect(page).toHaveURL(/^https:\/\/www\.cnarios\.com\/$|^https:\/\/www\.cnarios\.com$/);

    // Navigate to explore
    await homePage.clickStartExploring();
    await expect(page).toHaveURL(/.*explore/);

    // Go back to home
    await explorePage.goBack();
    await expect(page).toHaveURL(/^https:\/\/www\.cnarios\.com\/$|^https:\/\/www\.cnarios\.com$/);
  });

  test('TC117: Filter testing - Interview questions filter interaction', async ({ page }) => {
    const interviewPage = new InterviewQuestionsPage(page);

    // Navigate to interview questions
    await interviewPage.goto();
    await expect(interviewPage.pageHeading).toBeVisible();

    // Test search with multiple keywords
    for (const keyword of ['selenium', 'xpath', 'css']) {
      await interviewPage.searchQuestions(keyword);
      await expect(interviewPage.searchInput).toHaveValue(keyword);
    }

    // Clear search
    await interviewPage.clearSearchInput();
    await expect(interviewPage.searchInput).toHaveValue('');
  });

  test('TC118: Multi-concept navigation', async ({ page }) => {
    const conceptsPage = new ConceptsPage(page);

    const concepts = ['iframe', 'multiwindow', 'links', 'table'];

    for (const concept of concepts) {
      await conceptsPage.navigateToConcept(concept);
      await expect(page).toHaveURL(new RegExp(`.*${concept}`));
      await expect(conceptsPage.pageHeading).toBeVisible();
    }
  });

  test('TC119: Full navigation bar test across all pages', async ({ page }) => {
    const homePage = new HomePage(page);
    const pages = [
      { path: '/' },
      { path: '/explore' },
      { path: '/interview-questions' },
      { path: '/challenges' },
      { path: '/blogs' },
    ];

    for (const pageObj of pages) {
      await page.goto(`https://www.cnarios.com${pageObj.path}`);
      await expect(page.locator('nav').first()).toBeVisible();
    }
  });

  test('TC120: Footer links validation across pages', async ({ page }) => {
    const pages = ['/', '/explore', '/challenges'];

    for (const path of pages) {
      await page.goto(`https://www.cnarios.com${path}`);
      await expect(page.locator('footer').first()).toBeVisible();
    }
  });
});
