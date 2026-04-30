import { Page, expect } from '@playwright/test';

/**
 * Common test utility functions
 */

export class TestUtils {
  /**
   * Wait for element to be visible with custom timeout
   */
  static async waitForElementVisible(page: Page, selector: string, timeout: number = 5000) {
    const locator = page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  /**
   * Click and wait for navigation
   */
  static async clickAndWaitForNavigation(page: Page, selector: string, urlPattern: string | RegExp, timeout: number = 10000) {
    const navigationPromise = page.waitForURL(urlPattern, { timeout });
    await page.locator(selector).click();
    await navigationPromise;
  }

  /**
   * Fill form input
   */
  static async fillInput(page: Page, selector: string, value: string) {
    const locator = page.locator(selector);
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Get element count
   */
  static async getElementCount(page: Page, selector: string): Promise<number> {
    return await page.locator(selector).count();
  }

  /**
   * Verify element visibility
   */
  static async isElementVisible(page: Page, selector: string): Promise<boolean> {
    try {
      return await page.locator(selector).isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Verify element is enabled
   */
  static async isElementEnabled(page: Page, selector: string): Promise<boolean> {
    try {
      return await page.locator(selector).isEnabled();
    } catch {
      return false;
    }
  }

  /**
   * Get element text content
   */
  static async getElementText(page: Page, selector: string): Promise<string> {
    try {
      return await page.locator(selector).textContent() || '';
    } catch {
      return '';
    }
  }

  /**
   * Verify page title
   */
  static async verifyPageTitle(page: Page, titlePattern: string | RegExp) {
    await expect(page).toHaveTitle(titlePattern);
  }

  /**
   * Verify page URL
   */
  static async verifyPageURL(page: Page, urlPattern: string | RegExp) {
    await expect(page).toHaveURL(urlPattern);
  }

  /**
   * Get all text from elements matching selector
   */
  static async getAllElementsText(page: Page, selector: string): Promise<string[]> {
    const elements = page.locator(selector);
    const count = await elements.count();
    const texts: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await elements.nth(i).textContent();
      if (text) {
        texts.push(text.trim());
      }
    }

    return texts;
  }

  /**
   * Hover over element
   */
  static async hoverOverElement(page: Page, selector: string) {
    await page.locator(selector).hover();
  }

  /**
   * Double click element
   */
  static async doubleClickElement(page: Page, selector: string) {
    await page.locator(selector).dblclick();
  }

  /**
   * Right click element
   */
  static async rightClickElement(page: Page, selector: string) {
    await page.locator(selector).click({ button: 'right' });
  }

  /**
   * Scroll to element
   */
  static async scrollToElement(page: Page, selector: string) {
    const locator = page.locator(selector);
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for timeout
   */
  static async wait(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Get page source HTML
   */
  static async getPageSource(page: Page): Promise<string> {
    return await page.content();
  }

  /**
   * Check if URL matches pattern
   */
  static async verifyURLPattern(page: Page, pattern: string | RegExp): Promise<boolean> {
    const url = page.url();
    if (typeof pattern === 'string') {
      return url.includes(pattern);
    } else {
      return pattern.test(url);
    }
  }

  /**
   * Screenshot page or element
   */
  static async takeScreenshot(page: Page, filename: string, selector?: string) {
    if (selector) {
      const locator = page.locator(selector);
      await locator.screenshot({ path: `./screenshots/${filename}` });
    } else {
      await page.screenshot({ path: `./screenshots/${filename}` });
    }
  }

  /**
   * Close all popups/modals
   */
  static async closeAllPopups(page: Page) {
    // Try to close any visible modals or dialogs
    const closeButtons = page.locator('button[aria-label*="close"], button[aria-label*="Close"]');
    const count = await closeButtons.count();
    
    for (let i = 0; i < count; i++) {
      try {
        await closeButtons.nth(i).click();
      } catch {
        // Ignore errors
      }
    }
  }
}

/**
 * Page Navigation Helper
 */
export class NavigationHelper {
  static async navigateAndVerify(page: Page, url: string, expectedUrlPattern: string | RegExp) {
    await page.goto(url);
    await expect(page).toHaveURL(expectedUrlPattern);
  }

  static async navigateBack(page: Page) {
    await page.goBack();
  }

  static async navigateForward(page: Page) {
    await page.goForward();
  }

  static async reloadPage(page: Page) {
    await page.reload();
  }
}
