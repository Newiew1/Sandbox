import { test, expect } from '@playwright/test';
import { ConceptsPage } from '../pages/ConceptsPage';

/**
 * Concepts Page Test Suite
 */

test.describe('Concepts Page Tests', () => {
  let conceptsPage: ConceptsPage;

  test.beforeEach(async ({ page }) => {
    conceptsPage = new ConceptsPage(page);
  });

  test('TC054: Iframe concept page loads successfully', async () => {
    await conceptsPage.goto('iframe');
    const isLoaded = await conceptsPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    const currentURL = await conceptsPage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/concepts\/iframe$/);
  });

  test('TC055: Concepts page displays Concept tab', async () => {
    await conceptsPage.goto('iframe');
    const isVisible = await conceptsPage.conceptTab.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC056: Concepts page displays Try It Yourself tab', async () => {
    await conceptsPage.goto('iframe');
    const isVisible = await conceptsPage.tryItYourselfTab.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC057: Concepts page displays Test Cases tab', async () => {
    await conceptsPage.goto('iframe');
    const isVisible = await conceptsPage.testCasesTab.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC058: All tabs are visible on concept page', async () => {
    await conceptsPage.goto('iframe');
    const allTabsVisible = await conceptsPage.verifyAllTabsVisible();
    expect(allTabsVisible).toBeTruthy();
  });

  test('TC059: Multiwindow concept page loads successfully', async () => {
    await conceptsPage.goto('multiwindow');
    const isLoaded = await conceptsPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    const currentURL = await conceptsPage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/concepts\/multiwindow$/);
  });

  test('TC060: Links concept page loads successfully', async () => {
    await conceptsPage.goto('links');
    const isLoaded = await conceptsPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    const currentURL = await conceptsPage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/concepts\/links$/);
  });

  test('TC061: Table concept page loads successfully', async () => {
    await conceptsPage.goto('table');
    const isLoaded = await conceptsPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    const currentURL = await conceptsPage.getCurrentURL();
    expect(currentURL).toMatch(/.*\/concepts\/table$/);
  });

  test('TC062: Concept tab switching works correctly', async () => {
    await conceptsPage.goto('iframe');
    
    await conceptsPage.clickTryItYourselfTab();
    const isSelected = await conceptsPage.isTryItYourselfTabSelected();
    expect(isSelected).toBeTruthy();
  });

  test('TC063: Try It Yourself tab can be selected', async () => {
    await conceptsPage.goto('iframe');
    
    await conceptsPage.clickTryItYourselfTab();
    const isSelected = await conceptsPage.isTryItYourselfTabSelected();
    expect(isSelected).toBeTruthy();
  });

  test('TC064: Test Cases tab can be selected', async () => {
    await conceptsPage.goto('iframe');
    
    await conceptsPage.clickTestCasesTab();
    const isSelected = await conceptsPage.isTestCasesTabSelected();
    expect(isSelected).toBeTruthy();
  });

  test('TC065: Page heading text is displayed', async () => {
    await conceptsPage.goto('iframe');
    const headingText = await conceptsPage.getPageHeadingText();
    expect(headingText.length).toBeGreaterThan(0);
  });

  test('TC066: Concept tab is initially selected', async () => {
    await conceptsPage.goto('iframe');
    const isSelected = await conceptsPage.isConceptTabSelected();
    expect(isSelected).toBeTruthy();
  });

  test('TC067: Overview section is visible', async () => {
    await conceptsPage.goto('iframe');
    const isVisible = await conceptsPage.isOverviewSectionVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC068: Usecases section is visible', async () => {
    await conceptsPage.goto('iframe');
    const isVisible = await conceptsPage.isUsecasesSectionVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC069: Important notes are displayed', async () => {
    await conceptsPage.goto('iframe');
    const isVisible = await conceptsPage.areImportantNotesVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC070: Breadcrumb navigation is present', async () => {
    await conceptsPage.goto('iframe');
    const link = await conceptsPage.getConceptsLink();
    expect(link).toContain('concepts');
  });

  test('TC071: Navigation is visible on concepts page', async () => {
    await conceptsPage.goto('iframe');
    const navVisible = await conceptsPage.isNavigationVisible();
    expect(navVisible).toBeTruthy();
  });

  test('TC072: Footer is visible on concepts page', async () => {
    await conceptsPage.goto('iframe');
    const footerVisible = await conceptsPage.isFooterVisible();
    expect(footerVisible).toBeTruthy();
  });

  test('TC073: Navigate between different concepts', async () => {
    await conceptsPage.goto('iframe');
    let url = await conceptsPage.getCurrentURL();
    expect(url).toContain('iframe');

    await conceptsPage.navigateToConcept('links');
    url = await conceptsPage.getCurrentURL();
    expect(url).toContain('links');
  });
});
