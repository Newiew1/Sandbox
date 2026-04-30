import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ConceptsPage - Page Object for Concepts pages
 */
export class ConceptsPage extends BasePage {
  // Breadcrumb
  readonly breadcrumb: Locator;
  readonly conceptsLink: Locator;

  // Tabs
  readonly conceptTab: Locator;
  readonly tryItYourselfTab: Locator;
  readonly testCasesTab: Locator;

  // Content Sections
  readonly pageHeading: Locator;
  readonly overviewSection: Locator;
  readonly usecasesSection: Locator;
  readonly importantNotes: Locator;

  // Navigation
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);

    // Breadcrumb
    this.breadcrumb = page.locator('nav[aria-label="breadcrumb"]');
    this.conceptsLink = this.breadcrumb.locator('a[href="/concepts"]');

    // Tabs - use getByRole for more specific selection
    this.conceptTab = page.getByRole('tab', { name: /Concept/i });
    this.tryItYourselfTab = page.getByRole('tab', { name: /Try It Yourself/i });
    this.testCasesTab = page.getByRole('tab', { name: /Test Cases/i });

    // Content
    this.pageHeading = page.locator('h1').first();
    this.overviewSection = page.locator('h3').filter({ hasText: /Overview/i }).first();
    this.usecasesSection = page.locator('h3').filter({ hasText: /Usecases/i }).first();
    this.importantNotes = page.locator('text=Important Notes');

    // Navigation
    this.backButton = page.locator('button:has-text("Back")').first();
  }

  /**
   * Navigate to specific concept
   */
  async goto(concept: string) {
    await this.navigateTo(`/concepts/${concept}`);
  }

  /**
   * Verify page loaded
   */
  async verifyPageLoaded() {
    await this.waitForElement(this.pageHeading);
    return this.pageHeading.isVisible();
  }

  /**
   * Verify all tabs are visible
   */
  async verifyAllTabsVisible() {
    const concept = await this.conceptTab.isVisible();
    const tryIt = await this.tryItYourselfTab.isVisible();
    const testCases = await this.testCasesTab.isVisible();
    return concept && tryIt && testCases;
  }

  /**
   * Click on Concept tab
   */
  async clickConceptTab() {
    await this.conceptTab.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Click on Try It Yourself tab
   */
  async clickTryItYourselfTab() {
    await this.tryItYourselfTab.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Click on Test Cases tab
   */
  async clickTestCasesTab() {
    await this.testCasesTab.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Verify Concept tab is selected
   */
  async isConceptTabSelected(): Promise<boolean> {
    const ariaSelected = await this.conceptTab.getAttribute('aria-selected');
    return ariaSelected === 'true';
  }

  /**
   * Verify Try It Yourself tab is selected
   */
  async isTryItYourselfTabSelected(): Promise<boolean> {
    const ariaSelected = await this.tryItYourselfTab.getAttribute('aria-selected');
    return ariaSelected === 'true';
  }

  /**
   * Verify Test Cases tab is selected
   */
  async isTestCasesTabSelected(): Promise<boolean> {
    const ariaSelected = await this.testCasesTab.getAttribute('aria-selected');
    return ariaSelected === 'true';
  }

  /**
   * Get page heading text
   */
  async getPageHeadingText(): Promise<string> {
    return await this.pageHeading.textContent() || '';
  }

  /**
   * Verify Overview section is visible
   */
  async isOverviewSectionVisible(): Promise<boolean> {
    return await this.overviewSection.isVisible().catch(() => false);
  }

  /**
   * Verify Usecases section is visible
   */
  async isUsecasesSectionVisible(): Promise<boolean> {
    return await this.usecasesSection.isVisible().catch(() => false);
  }

  /**
   * Verify Important Notes are visible
   */
  async areImportantNotesVisible(): Promise<boolean> {
    return await this.importantNotes.isVisible().catch(() => false);
  }

  /**
   * Get all concept links from breadcrumb
   */
  async getConceptsLink(): Promise<string | null> {
    return await this.conceptsLink.getAttribute('href');
  }

  /**
   * Go back
   */
  async goBack() {
    await this.clickBackButton();
  }

  /**
   * Navigate to another concept
   */
  async navigateToConcept(concept: string) {
    await this.goto(concept);
    await this.verifyPageLoaded();
  }
}
