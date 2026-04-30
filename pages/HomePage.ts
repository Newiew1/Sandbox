import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - Page Object for Home page (https://www.cnarios.com)
 */
export class HomePage extends BasePage {
  // Hero Section Locators
  readonly heroHeading: Locator;
  readonly heroDescription: Locator;
  readonly startExploringBtn: Locator;
  readonly challengesBtn: Locator;
  readonly heroImage: Locator;

  // Features Section Locators
  readonly handsOnPracticeCard: Locator;
  readonly interviewQuestionsCard: Locator;
  readonly testYourSkillsCard: Locator;
  readonly blogsCard: Locator;

  // Features Links
  readonly handsOnPracticeLink: Locator;
  readonly interviewQuestionsLink: Locator;
  readonly challengesCardLink: Locator;

  // How It Works Section Locators
  readonly howItWorksSection: Locator;
  readonly howItWorksSteps: Locator;

  // Contact Section Locators
  readonly contactSection: Locator;
  readonly dropUsALineLink: Locator;

  // Navigation Links
  readonly featuresNavLink: Locator;
  readonly howItWorksNavLink: Locator;
  readonly contactUsNavLink: Locator;
  readonly blogsNavLink: Locator;

  constructor(page: Page) {
    super(page);

    // Hero Section
    this.heroHeading = page.locator('h1').filter({ hasText: 'Practice Automation Testing' });
    this.heroDescription = page.locator('text=Cnarios is a free platform for testers').first();
    this.startExploringBtn = page.locator('button:has-text("Start Exploring")').first();
    this.challengesBtn = page.locator('button:has-text("Challenges")').first();
    this.heroImage = page.locator('img[alt="Automation Illustration"]');

    // Features Section
    this.handsOnPracticeCard = page.locator('text=Hands-On Practice').first();
    this.interviewQuestionsCard = page.locator('text=Interview Questions').nth(0);
    this.testYourSkillsCard = page.locator('text=Test Your Skills').first();
    this.blogsCard = page.locator('a[href="/blogs"]').first();

    // Feature Links
    this.handsOnPracticeLink = page.locator('a[href="/concepts"]').first();
    this.interviewQuestionsLink = page.locator('a[href="/interview-questions"]').first();
    this.challengesCardLink = page.locator('a[href="/challenges"]').nth(1);

    // How It Works
    this.howItWorksSection = page.locator('text=How it works?').first();
    this.howItWorksSteps = page.locator('role=generic').filter({ hasText: 'Search for the topic' });

    // Contact Section
    this.contactSection = page.locator('text=Share. Suggest. Shape.').first();
    this.dropUsALineLink = page.locator('a[href*="mailto:cnaarios"]').first();

    // Navigation
    this.featuresNavLink = page.locator('a[href="/#features"]').first();
    this.howItWorksNavLink = page.locator('a[href="/#how-it-works"]').first();
    this.contactUsNavLink = page.locator('a[href="/#contact-us"]').first();
    this.blogsNavLink = page.locator('a[href="/blogs"]').first();
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await this.navigateTo('/');
  }

  /**
   * Verify home page loaded successfully
   */
  async verifyPageLoaded() {
    await this.waitForElement(this.heroHeading);
    return this.heroHeading.isVisible();
  }

  /**
   * Click Start Exploring button
   */
  async clickStartExploring() {
    await this.startExploringBtn.click();
    await this.waitForURL('**/explore');
  }

  /**
   * Click Challenges button
   */
  async clickChallenges() {
    await this.challengesBtn.click();
    await this.waitForURL('**/challenges');
  }

  /**
   * Verify hero section elements
   */
  async verifyHeroSection() {
    const headingVisible = await this.heroHeading.isVisible();
    const descriptionVisible = await this.heroDescription.isVisible();
    const btnVisible = await this.startExploringBtn.isVisible();
    return headingVisible && descriptionVisible && btnVisible;
  }

  /**
   * Verify features section with all cards
   */
  async verifyFeaturesSection() {
    const handsOn = await this.handsOnPracticeCard.isVisible();
    const interview = await this.interviewQuestionsCard.isVisible();
    const tests = await this.testYourSkillsCard.isVisible();
    return handsOn && interview && tests;
  }

  /**
   * Click on Hands-On Practice feature
   */
  async clickHandsOnPractice() {
    await this.handsOnPracticeLink.click();
    await this.waitForURL('**/concepts', 10000).catch(() => {});
  }

  /**
   * Click on Interview Questions feature
   */
  async clickInterviewQuestions() {
    await this.interviewQuestionsLink.click();
    await this.waitForURL('**/interview-questions', 10000).catch(() => {});
  }

  /**
   * Click on Challenges feature
   */
  async clickChallengesFeature() {
    await this.challengesCardLink.click();
    await this.waitForURL('**/challenges', 10000).catch(() => {});
  }

  /**
   * Click Features nav link
   */
  async clickFeaturesNav() {
    await this.featuresNavLink.click();
  }

  /**
   * Click How it Works nav link
   */
  async clickHowItWorksNav() {
    await this.howItWorksNavLink.click();
  }

  /**
   * Click Contact Us nav link
   */
  async clickContactUsNav() {
    await this.contactUsNavLink.click();
  }

  /**
   * Click Blogs nav link
   */
  async clickBlogsNav() {
    await this.blogsNavLink.click();
    await this.waitForURL('**/blogs');
  }

  /**
   * Verify How It Works section is visible
   */
  async verifyHowItWorksSection() {
    return await this.howItWorksSection.isVisible();
  }

  /**
   * Verify Contact section is visible
   */
  async verifyContactSection() {
    return await this.contactSection.isVisible();
  }

  /**
   * Verify all navigation links are visible
   */
  async verifyNavigationLinks() {
    const features = await this.featuresNavLink.isVisible();
    const howIt = await this.howItWorksNavLink.isVisible();
    const contact = await this.contactUsNavLink.isVisible();
    const blogs = await this.blogsNavLink.isVisible();
    return features && howIt && contact && blogs;
  }

  /**
   * Get hero heading text
   */
  async getHeroHeadingText(): Promise<string> {
    return await this.heroHeading.textContent() || '';
  }

  /**
   * Verify hero buttons are clickable
   */
  async verifyHeroButtonsClickable() {
    const startEnabled = await this.startExploringBtn.isEnabled();
    const challengesEnabled = await this.challengesBtn.isEnabled();
    return startEnabled && challengesEnabled;
  }
}
