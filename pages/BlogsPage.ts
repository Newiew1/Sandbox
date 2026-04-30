import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * BlogsPage - Page Object for Blogs and blog detail pages
 */
export class BlogsPage extends BasePage {
  // Header Section
  readonly pageHeading: Locator;
  readonly pageDescription: Locator;

  // Blog Cards
  readonly htmlBasicsBlogCard: Locator;
  readonly locatorStrategiesBlogCard: Locator;
  readonly blogCards: Locator;

  // Blog Links
  readonly htmlBasicsBlogLink: Locator;
  readonly locatorStrategiesBlogLink: Locator;

  // Navigation
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageHeading = page.locator('h1').filter({ hasText: /Latest Blogs|Automation/ });
    this.pageDescription = page.locator('text=Stay updated with the latest tips').first();

    // Blog Cards
    this.htmlBasicsBlogCard = page.locator('text=HTML Basics').first();
    this.locatorStrategiesBlogCard = page.locator('text=Locator Strategies').first();
    this.blogCards = page.locator('a[href*="/blogs/"]');

    // Blog Links
    this.htmlBasicsBlogLink = page.locator('a[href="/blogs/html-basics"]').first();
    this.locatorStrategiesBlogLink = page.locator('a[href="/blogs/Locators"]').first();

    // Navigation
    this.backButton = page.locator('button:has-text("Back")').first();
  }

  /**
   * Navigate to blogs page
   */
  async goto() {
    await this.navigateTo('/blogs');
  }

  /**
   * Navigate to specific blog
   */
  async gotoBlogByName(blogName: string) {
    await this.navigateTo(`/blogs/${blogName}`);
  }

  /**
   * Verify blogs page loaded
   */
  async verifyPageLoaded() {
    await this.waitForElement(this.pageHeading);
    return this.pageHeading.isVisible();
  }

  /**
   * Verify all blog cards are visible
   */
  async verifyAllBlogCards() {
    const htmlBasics = await this.htmlBasicsBlogCard.isVisible();
    const locators = await this.locatorStrategiesBlogCard.isVisible();
    return htmlBasics && locators;
  }

  /**
   * Click on HTML Basics blog
   */
  async clickHTMLBasicsBlog() {
    await this.htmlBasicsBlogLink.click();
    await this.waitForURL('**/blogs/html-basics', 10000).catch(() => {});
  }

  /**
   * Click on Locator Strategies blog
   */
  async clickLocatorStrategiesBlog() {
    await this.locatorStrategiesBlogLink.click();
    await this.waitForURL('**/blogs/Locators', 10000).catch(() => {});
  }

  /**
   * Get page heading text
   */
  async getPageHeadingText(): Promise<string> {
    return await this.pageHeading.textContent() || '';
  }

  /**
   * Get number of blog cards
   */
  async getBlogCardCount(): Promise<number> {
    return await this.blogCards.count();
  }

  /**
   * Verify blog link is clickable
   */
  async isBlogLinkClickable(link: Locator): Promise<boolean> {
    return await link.isEnabled();
  }

  /**
   * Go back
   */
  async goBack() {
    await this.clickBackButton();
  }

  /**
   * Get all blog links
   */
  async getAllBlogLinks(): Promise<string[]> {
    const links = this.page.locator('a[href*="/blogs/"]');
    const hrefs: string[] = [];
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href && !hrefs.includes(href)) {
        hrefs.push(href);
      }
    }
    
    return hrefs;
  }

  /**
   * Verify blog detail page content
   */
  async verifyBlogDetailPageLoaded(): Promise<boolean> {
    const heading = this.page.locator('h1');
    return await heading.isVisible().catch(() => false);
  }

  /**
   * Get blog article text
   */
  async getBlogContent(): Promise<string> {
    try {
      // Wait for content to load
      await this.page.waitForTimeout(500);
      
      // Try multiple selectors for blog content
      const selectors = [
        'article',
        '[role="article"]',
        'main',
        '[role="main"]',
        '.blog-content',
        '.post-content',
        'div:nth-of-type(5)',
        'h1 ~ *',  // Any element after h1
        'nav ~ div'  // Generic div after navigation
      ];
      
      for (const selector of selectors) {
        try {
          const element = this.page.locator(selector).first();
          const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await element.textContent({ timeout: 3000 });
            if (text && text.length > 10) {
              return text;
            }
          }
        } catch {
          continue;
        }
      }
      
      // Fallback: Get all content from the generic content container after navigation
      const allContent = await this.page.locator('body > *:nth-of-type(n+2)').textContent();
      if (allContent && allContent.length > 10) {
        return allContent;
      }
      
      return '';
    } catch {
      return '';
    }
  }
}
