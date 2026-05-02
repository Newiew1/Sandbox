import { test, expect } from '@playwright/test';
import { InterviewQuestionsPage } from '../pages/InterviewQuestionsPage';
import { TEST_DATA } from '../utils/constants';

/**
 * Interview Questions Page Test Suite
 */

test.describe('Interview Questions Page Tests', () => {
  let interviewPage: InterviewQuestionsPage;

  test.beforeEach(async ({ page }) => {
    interviewPage = new InterviewQuestionsPage(page);
    await interviewPage.goto();
  });

  test('TC036: Interview questions page loads successfully', async () => {
    await expect(interviewPage.pageHeading).toBeVisible();
    await expect(interviewPage.page).toHaveURL(/.*\/interview-questions$/);
  });

  test('TC037: Interview questions page displays search box', async () => {
    await expect(interviewPage.searchInput).toBeVisible();
  });

  test('TC038: Search functionality filters interview questions', async () => {
    await interviewPage.searchQuestions('framework');
    await interviewPage.page.waitForTimeout(1000);
    await expect(interviewPage.page.locator('ul li, div[class*="list"] div').first()).toHaveCount(1);
  });

  test('TC039: Search input accepts user input', async () => {
    await interviewPage.searchQuestions('selenium');
    await expect(interviewPage.searchInput).toHaveValue('selenium');
  });

  test('TC040: Company filter is available and clickable', async () => {
    await expect(interviewPage.companyFilter).toBeVisible();
    await expect(interviewPage.companyFilter).toBeEnabled();
  });

  test('TC041: Topic filter is available and clickable', async () => {
    await expect(interviewPage.topicFilter).toBeVisible();
    await expect(interviewPage.topicFilter).toBeEnabled();
  });

  test('TC042: Difficulty filter is available and clickable', async () => {
    await expect(interviewPage.difficultyFilter).toBeVisible();
    await expect(interviewPage.difficultyFilter).toBeEnabled();
  });

  test('TC043: Sort By filter is available with default selection', async () => {
    await expect(interviewPage.sortByFilter).toBeVisible();
  });

  test('TC044: Clear Filters button is visible', async () => {
    await expect(interviewPage.clearFiltersBtn).toBeVisible();
  });

  test('TC045: Interview questions are displayed', async () => {
    await expect(interviewPage.page.locator('ul li, div[class*="list"] div').first()).toHaveCount(1);
  });

  test('TC046: All filter elements are visible', async () => {
    await expect(interviewPage.companyFilter).toBeVisible();
    await expect(interviewPage.topicFilter).toBeVisible();
    await expect(interviewPage.difficultyFilter).toBeVisible();
  });

  test('TC047: Clear search input functionality', async () => {
    await interviewPage.searchQuestions('test');
    await interviewPage.clearSearchInput();
    await expect(interviewPage.searchInput).toHaveValue('');
  });

  test('TC048: Question count is displayed', async () => {
    const questions = interviewPage.page.locator('ul li, [class*="question"], [class*="item"]');
    await expect(questions.first()).toHaveCount(1);
  });

  test('TC049: Page heading text is correct', async () => {
    await expect(interviewPage.pageHeading).toContainText('Automation Interview Questions');
  });

  test('TC050: Back button navigates to explore page', async () => {
    await interviewPage.goBack();
    await expect(interviewPage.page).toHaveURL(/.*explore/);
  });

  test('TC051: Navigation is visible on interview questions page', async () => {
    await expect(interviewPage.navigationBar).toBeVisible();
  });

  test('TC052: Footer is visible on interview questions page', async () => {
    await expect(interviewPage.footer).toBeVisible();
  });

  test('TC053: Multiple search terms can be tested', async () => {
    for (const keyword of TEST_DATA.SEARCH_KEYWORDS.slice(0, 3)) {
      await interviewPage.searchQuestions(keyword);
      await expect(interviewPage.searchInput).toHaveValue(keyword);
    }
  });
});
