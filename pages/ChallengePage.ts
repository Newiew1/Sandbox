import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ChallengePage - Page Object for Challenges and specific challenge pages
 */
export class ChallengePage extends BasePage {
  // Main Section
  readonly pageHeading: Locator;
  readonly pageDescription: Locator;

  // Challenge Cards
  readonly challengeCards: Locator;

  // Specific Challenges
  readonly productFilteringLink: Locator;
  readonly productPaginationLink: Locator;

  // Challenge Content
  readonly challengeTitle: Locator;
  readonly challengeInstructions: Locator;

  // Navigation
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);

    // Main Section
    this.pageHeading = page.locator('h1').first();
    this.pageDescription = page.locator('role=generic').filter({ hasText: /challenge|Challenge/i }).first();

    // Challenge Cards
    this.challengeCards = page.locator('role=generic').filter({ hasText: /challenge/i });

    // Specific Challenges
    this.productFilteringLink = page.locator('a[href="/challenges/product-filtering"]').first();
    this.productPaginationLink = page.locator('a[href="/challenges/product-listing-pagination"]').first();

    // Challenge Content
    this.challengeTitle = page.locator('h1');
    this.challengeInstructions = page.locator('text=/Identify products|challenge/i').first();

    // Navigation
    // Back button might be in header or footer, or might not exist on some pages
    this.backButton = page.locator('button').filter({ hasText: /Back|back/i }).first();
  }

  /**
   * Navigate to challenges page
   */
  async goto() {
    await this.navigateTo('/challenges');
  }

  /**
   * Navigate to specific challenge
   */
  async gotoChallengeByName(challengeName: string) {
    await this.navigateTo(`/challenges/${challengeName}`);
  }

  /**
   * Verify challenges page loaded
   */
  async verifyPageLoaded() {
    await this.waitForElement(this.pageHeading);
    return this.pageHeading.isVisible();
  }

  /**
   * Click on Product Filtering challenge
   */
  async clickProductFilteringChallenge() {
    await this.productFilteringLink.click();
    await this.waitForURL('**/challenges/product-filtering', 10000).catch(() => {});
  }

  /**
   * Click on Product Pagination challenge
   */
  async clickProductPaginationChallenge() {
    await this.productPaginationLink.click();
    await this.waitForURL('**/challenges/product-listing-pagination', 10000).catch(() => {});
  }

  /**
   * Verify challenge links are visible
   */
  async verifyChallengeLinkVisible(challengeName: string): Promise<boolean> {
    const link = this.page.locator(`a[href*="${challengeName}"]`).first();
    return await link.isVisible().catch(() => false);
  }

  /**
   * Get page heading text
   */
  async getPageHeadingText(): Promise<string> {
    return await this.pageHeading.textContent() || '';
  }

  /**
   * Verify challenge title is present
   */
  async verifyChallengeTitle(): Promise<boolean> {
    return await this.challengeTitle.isVisible();
  }

  /**
   * Get challenge title text
   */
  async getChallengeTitleText(): Promise<string> {
    return await this.challengeTitle.textContent() || '';
  }

  /**
   * Go back
   */
  async goBack() {
    await this.clickBackButton();
  }

  /**
   * Get all challenge links
   */
  async getAllChallengeLinks(): Promise<string[]> {
    const links = this.page.locator('a[href*="/challenges/"]');
    const hrefs: string[] = [];
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href) {
        hrefs.push(href);
      }
    }
    
    return hrefs;
  }
}
