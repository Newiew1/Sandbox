import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ExplorePage - Page Object for Explore page
 */
export class ExplorePage extends BasePage {
  // Main Section
  readonly pageHeading: Locator;
  readonly pageDescription: Locator;
  readonly backButton: Locator;

  // Trending Sections
  readonly interviewQuestionsCard: Locator;
  readonly conceptsCard: Locator;
  readonly challengesCard: Locator;
  readonly blogsCard: Locator;

  // Buttons
  readonly exploreQuestionsBtn: Locator;
  readonly startLearningBtn: Locator;
  readonly takeChallengeBtn: Locator;
  readonly readBlogsBtn: Locator;

  constructor(page: Page) {
    super(page);

    // Main Section
    this.pageHeading = page.locator('h1').filter({ hasText: 'Explore. Practice. Master.' });
    this.pageDescription = page.locator('text=Welcome to your one-stop space').first();
    this.backButton = page.locator('button:has-text("Back")').first();

    // Trending Cards
    this.interviewQuestionsCard = page.locator('text=Interview Questions').nth(1);
    this.conceptsCard = page.locator('text=Concepts').nth(0);
    this.challengesCard = page.locator('text=Challenges').nth(0);
    this.blogsCard = page.locator('text=Blogs').nth(0);

    // Buttons
    this.exploreQuestionsBtn = page.locator('button:has-text("Explore Questions")').first();
    this.startLearningBtn = page.locator('button:has-text("Start Learning")').first();
    this.takeChallengeBtn = page.locator('button:has-text("Take Challenge")').first();
    this.readBlogsBtn = page.locator('button:has-text("Read Blogs")').first();
  }

  /**
   * Navigate to explore page
   */
  async goto() {
    await this.navigateTo('/explore');
  }

  /**
   * Verify explore page loaded
   */
  async verifyPageLoaded() {
    await this.waitForElement(this.pageHeading);
    return this.pageHeading.isVisible();
  }

  /**
   * Verify all trending sections are visible
   */
  async verifyTrendingSections() {
    const interview = await this.interviewQuestionsCard.isVisible();
    const concepts = await this.conceptsCard.isVisible();
    const challenges = await this.challengesCard.isVisible();
    const blogs = await this.blogsCard.isVisible();
    return interview && concepts && challenges && blogs;
  }

  /**
   * Click Explore Questions button
   */
  async clickExploreQuestions() {
    await this.exploreQuestionsBtn.click();
    await this.waitForURL('**/interview-questions', 10000).catch(() => {});
  }

  /**
   * Click Start Learning button
   */
  async clickStartLearning() {
    await this.startLearningBtn.click();
    await this.waitForURL('**/concepts', 10000).catch(() => {});
  }

  /**
   * Click Take Challenge button
   */
  async clickTakeChallenge() {
    await this.takeChallengeBtn.click();
    await this.waitForURL('**/challenges', 10000).catch(() => {});
  }

  /**
   * Click Read Blogs button
   */
  async clickReadBlogs() {
    await this.readBlogsBtn.click();
    await this.waitForURL('**/blogs', 10000).catch(() => {});
  }

  /**
   * Go back to previous page
   */
  async goBack() {
    await this.clickBackButton();
    await this.waitForURL(/^https:\/\/www\.cnarios\.com\/$|^https:\/\/www\.cnarios\.com$/);
  }

  /**
   * Get page heading text
   */
  async getPageHeadingText(): Promise<string> {
    return await this.pageHeading.textContent() || '';
  }

  /**
   * Verify all CTA buttons are visible
   */
  async verifyAllCTAButtons() {
    const explore = await this.exploreQuestionsBtn.isVisible();
    const learn = await this.startLearningBtn.isVisible();
    const challenge = await this.takeChallengeBtn.isVisible();
    const blogs = await this.readBlogsBtn.isVisible();
    return explore && learn && challenge && blogs;
  }

  /**
   * Verify back button is visible
   */
  async verifyBackButtonVisible() {
    return await this.backButton.isVisible();
  }
}
