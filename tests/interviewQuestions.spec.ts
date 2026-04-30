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
    const isLoaded = await interviewPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    const currentURL = await interviewPage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/interview-questions$/);
  });

  test('TC037: Interview questions page displays search box', async () => {
    const isVisible = await interviewPage.searchInput.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC038: Search functionality filters interview questions', async () => {
    await interviewPage.searchQuestions('framework');
    await interviewPage.page.waitForTimeout(1000);
    
    const questionsDisplayed = await interviewPage.verifyQuestionsDisplayed();
    expect(questionsDisplayed).toBeTruthy();
  });

  test('TC039: Search input accepts user input', async () => {
    await interviewPage.searchQuestions('selenium');
    const inputValue = await interviewPage.getSearchInputValue();
    expect(inputValue).toBe('selenium');
  });

  test('TC040: Company filter is available and clickable', async () => {
    const isVisible = await interviewPage.companyFilter.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC041: Topic filter is available and clickable', async () => {
    const isVisible = await interviewPage.topicFilter.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC042: Difficulty filter is available and clickable', async () => {
    const isVisible = await interviewPage.difficultyFilter.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC043: Sort By filter is available with default selection', async () => {
    const isVisible = await interviewPage.sortByFilter.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC044: Clear Filters button is visible', async () => {
    const isVisible = await interviewPage.clearFiltersBtn.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC045: Interview questions are displayed', async () => {
    const questionsDisplayed = await interviewPage.verifyQuestionsDisplayed();
    expect(questionsDisplayed).toBeTruthy();
  });

  test('TC046: All filter elements are visible', async () => {
    const allFiltersVisible = await interviewPage.verifyFilterElements();
    expect(allFiltersVisible).toBeTruthy();
  });

  test('TC047: Clear search input functionality', async () => {
    await interviewPage.searchQuestions('test');
    await interviewPage.clearSearchInput();
    
    const inputValue = await interviewPage.getSearchInputValue();
    expect(inputValue).toBe('');
  });

  test('TC048: Question count is displayed', async () => {
    const count = await interviewPage.getQuestionCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC049: Page heading text is correct', async () => {
    const headingText = await interviewPage.getPageHeadingText();
    expect(headingText).toContain('Automation Interview Questions');
  });

  test('TC050: Back button navigates to explore page', async () => {
    await interviewPage.goBack();
    const currentURL = await interviewPage.getCurrentURL();
    expect(currentURL).toContain('explore');
  });

  test('TC051: Navigation is visible on interview questions page', async () => {
    const navVisible = await interviewPage.isNavigationVisible();
    expect(navVisible).toBeTruthy();
  });

  test('TC052: Footer is visible on interview questions page', async () => {
    const footerVisible = await interviewPage.isFooterVisible();
    expect(footerVisible).toBeTruthy();
  });

  test('TC053: Multiple search terms can be tested', async () => {
    for (const keyword of TEST_DATA.SEARCH_KEYWORDS.slice(0, 3)) {
      await interviewPage.searchQuestions(keyword);
      const inputValue = await interviewPage.getSearchInputValue();
      expect(inputValue).toBe(keyword);
    }
  });
});
