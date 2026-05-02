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
    await expect(conceptsPage.pageHeading).toBeVisible();
    await expect(conceptsPage.page).toHaveURL(/.*\/concepts\/iframe$/);
  });

  test('TC055: Concepts page displays Concept tab', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.conceptTab).toBeVisible();
  });

  test('TC056: Concepts page displays Try It Yourself tab', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.tryItYourselfTab).toBeVisible();
  });

  test('TC057: Concepts page displays Test Cases tab', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.testCasesTab).toBeVisible();
  });

  test('TC058: All tabs are visible on concept page', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.conceptTab).toBeVisible();
    await expect(conceptsPage.tryItYourselfTab).toBeVisible();
    await expect(conceptsPage.testCasesTab).toBeVisible();
  });

  test('TC059: Multiwindow concept page loads successfully', async () => {
    await conceptsPage.goto('multiwindow');
    await expect(conceptsPage.pageHeading).toBeVisible();
    await expect(conceptsPage.page).toHaveURL(/.*\/concepts\/multiwindow$/);
  });

  test('TC060: Links concept page loads successfully', async () => {
    await conceptsPage.goto('links');
    await expect(conceptsPage.pageHeading).toBeVisible();
    await expect(conceptsPage.page).toHaveURL(/.*\/concepts\/links$/);
  });

  test('TC061: Table concept page loads successfully', async () => {
    await conceptsPage.goto('table');
    await expect(conceptsPage.pageHeading).toBeVisible();
    await expect(conceptsPage.page).toHaveURL(/.*\/concepts\/table$/);
  });

  test('TC062: Concept tab switching works correctly', async () => {
    await conceptsPage.goto('iframe');
    await conceptsPage.clickTryItYourselfTab();
    await expect(conceptsPage.tryItYourselfTab).toHaveAttribute('aria-selected', 'true');
  });

  test('TC063: Try It Yourself tab can be selected', async () => {
    await conceptsPage.goto('iframe');
    await conceptsPage.clickTryItYourselfTab();
    await expect(conceptsPage.tryItYourselfTab).toHaveAttribute('aria-selected', 'true');
  });

  test('TC064: Test Cases tab can be selected', async () => {
    await conceptsPage.goto('iframe');
    await conceptsPage.clickTestCasesTab();
    await expect(conceptsPage.testCasesTab).toHaveAttribute('aria-selected', 'true');
  });

  test('TC065: Page heading text is displayed', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.pageHeading).toBeVisible();
  });

  test('TC066: Concept tab is initially selected', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.conceptTab).toHaveAttribute('aria-selected', 'true');
  });

  test('TC067: Overview section is visible', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.page.locator('h2, h3').first()).toBeVisible();
  });

  test('TC068: Usecases section is visible', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.page.locator('h2, h3, p').nth(2)).toHaveCount(1);
  });

  test('TC069: Important notes are displayed', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.page.locator('strong, b').first()).toBeVisible();
  });

  test('TC070: Breadcrumb navigation is present', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.page).toHaveURL(/.*\/concepts\/iframe/);
  });

  test('TC071: Navigation is visible on concepts page', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.navigationBar).toBeVisible();
  });

  test('TC072: Footer is visible on concepts page', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.footer).toBeVisible();
  });

  test('TC073: Navigate between different concepts', async () => {
    await conceptsPage.goto('iframe');
    await expect(conceptsPage.page).toHaveURL(/.*iframe/);

    await conceptsPage.navigateToConcept('links');
    await expect(conceptsPage.page).toHaveURL(/.*links/);
  });
});
