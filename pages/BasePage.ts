import { Page, Locator } from '@playwright/test';

/**
 * BasePage - Parent class for all page objects
 * Contains common functionality shared across all pages
 */
export class BasePage {
  protected page: Page;
  protected baseURL: string = 'https://www.cnarios.com';

  // Common locators
  protected navigationBar: Locator;
  protected logo: Locator;
  protected footer: Locator;
  protected backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationBar = page.locator('nav').first();
    this.logo = page.locator('a').filter({ has: page.locator('img[alt="cnarios logo"]') }).first();
    this.footer = page.locator('footer');
    this.backButton = page.locator('button:has-text("Back")').first();
  }

  /**
   * Navigate to a specific URL
   */
  async navigateTo(path: string = '') {
    await this.page.goto(this.baseURL + path);
  }

  /**
   * Get current URL
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Wait for URL to match pattern
   */
  async waitForURL(pattern: string | RegExp, timeout: number = 10000) {
    await this.page.waitForURL(pattern, { timeout });
  }

  /**
   * Click on logo to navigate home
   */
  async clickLogo() {
    await this.logo.click();
  }

  /**
   * Click back button
   */
  async clickBackButton() {
    await this.backButton.click();
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Check if navigation is visible
   */
  async isNavigationVisible(): Promise<boolean> {
    return await this.navigationBar.isVisible();
  }

  /**
   * Check if footer is visible
   */
  async isFooterVisible(): Promise<boolean> {
    return await this.footer.isVisible();
  }

  /**
   * Click on navigation link
   */
  async clickNavLink(href: string) {
    await this.page.locator(`a[href="${href}"]`).first().click();
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout: number = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Get all footer links by section
   */
  getFooterLinksBySection(section: string): Locator {
    return this.footer.locator(`//h6[contains(text(), "${section}")]/following-sibling::*//a`);
  }

  /**
   * Get social media link
   */
  getSocialMediaLink(platform: string): Locator {
    return this.footer.locator(`a[href*="${platform.toLowerCase()}"]`);
  }
}
