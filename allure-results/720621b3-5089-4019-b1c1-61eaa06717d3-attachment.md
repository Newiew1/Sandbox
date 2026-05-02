# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blogs.spec.ts >> Blogs Page Tests >> TC101: Blog card count is greater than zero
- Location: tests\blogs.spec.ts:63:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('article, div[class*="card"], div[class*="blog"]').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('article, div[class*="card"], div[class*="blog"]').first()

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic:
    - navigation [ref=e3]:
      - generic [ref=e4]:
        - link "cnarios logo" [ref=e6] [cursor=pointer]:
          - /url: /
          - img "cnarios logo" [ref=e7]
        - generic [ref=e8]:
          - link "Features" [ref=e9] [cursor=pointer]:
            - /url: /#features
          - link "How it works?" [ref=e10] [cursor=pointer]:
            - /url: /#how-it-works
          - link "Contact Us" [ref=e11] [cursor=pointer]:
            - /url: /#contact-us
          - link "Blogs" [ref=e12] [cursor=pointer]:
            - /url: /blogs
    - navigation
  - generic [ref=e13]:
    - link "Back" [ref=e15] [cursor=pointer]:
      - /url: /explore
      - button "Back" [ref=e16]:
        - img [ref=e18]
        - text: Back
    - banner [ref=e20]:
      - heading "Latest Blogs & Insights" [level=1] [ref=e21]
      - generic [ref=e22]: Stay updated with the latest tips, tutorials, and deep dives on web automation and testing concepts. Our blog covers foundational topics like HTML basics, practical guides on locator strategies, and expert insights to help you sharpen your automation skills and stay ahead in your testing career.
    - generic [ref=e24]:
      - link "HTML Basics for Automation HTML Basics All you need to know about HTML before writing automation scripts" [ref=e25] [cursor=pointer]:
        - /url: /blogs/html-basics
        - generic [ref=e27]:
          - heading "HTML Basics for Automation" [level=6] [ref=e28]
          - heading "HTML Basics" [level=6] [ref=e29]
          - paragraph [ref=e30]: All you need to know about HTML before writing automation scripts
      - link "Locator Strategies locators All you need to know about locator strategies in web automation" [ref=e31] [cursor=pointer]:
        - /url: /blogs/Locators
        - generic [ref=e33]:
          - heading "Locator Strategies" [level=6] [ref=e34]
          - heading "locators" [level=6] [ref=e35]
          - paragraph [ref=e36]: All you need to know about locator strategies in web automation
  - contentinfo [ref=e37]:
    - separator [ref=e38]
    - generic [ref=e39]:
      - link "cnarios logo" [ref=e41] [cursor=pointer]:
        - /url: /
        - img "cnarios logo" [ref=e42]
      - generic [ref=e43]:
        - generic [ref=e44]:
          - heading "Concepts" [level=6] [ref=e45]
          - generic [ref=e46]:
            - link "Iframes" [ref=e47] [cursor=pointer]:
              - /url: /concepts/iframe
            - link "Multi Window" [ref=e48] [cursor=pointer]:
              - /url: /concepts/multiwindow
            - link "Links" [ref=e49] [cursor=pointer]:
              - /url: /concepts/links
            - link "Table" [ref=e50] [cursor=pointer]:
              - /url: /concepts/table
        - generic [ref=e51]:
          - heading "Challenges" [level=6] [ref=e52]
          - generic [ref=e53]:
            - link "E-commerce Pagination" [ref=e54] [cursor=pointer]:
              - /url: /challenges/product-listing-pagination
            - link "E-commerce Filters" [ref=e55] [cursor=pointer]:
              - /url: /challenges/product-filtering
        - generic [ref=e56]:
          - heading "Blogs" [level=6] [ref=e57]
          - generic [ref=e58]:
            - link "HTML Basics" [ref=e59] [cursor=pointer]:
              - /url: /blogs/html-basics
            - link "Locator Strategies" [ref=e60] [cursor=pointer]:
              - /url: /blogs/Locators
      - generic [ref=e62]:
        - link "LinkedIn" [ref=e63] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/cnarios
          - img [ref=e64]
          - text: LinkedIn
        - link "YouTube" [ref=e66] [cursor=pointer]:
          - /url: https://www.youtube.com/channel/UC2F8fdGwKP18tyqEKtGRxeg
          - img [ref=e67]
          - text: YouTube
        - link "Email" [ref=e69] [cursor=pointer]:
          - /url: mailto:cnaarios.@gmail.com
          - img [ref=e70]
          - text: Email
    - paragraph [ref=e74]:
      - text: © 2026 Cnarios. All rights reserved. | Designed by
      - strong [ref=e75]:
        - link "END Prasad" [ref=e76] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/prasad-e-n-d/
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { BlogsPage } from '../pages/BlogsPage';
  3   | 
  4   | /**
  5   |  * Blogs Page Test Suite
  6   |  */
  7   | 
  8   | test.describe('Blogs Page Tests', () => {
  9   |   let blogsPage: BlogsPage;
  10  | 
  11  |   test.beforeEach(async ({ page }) => {
  12  |     blogsPage = new BlogsPage(page);
  13  |     await blogsPage.goto();
  14  |   });
  15  | 
  16  |   test('TC091: Blogs page loads successfully', async () => {
  17  |     await expect(blogsPage.pageHeading).toBeVisible();
  18  |     await expect(blogsPage.page).toHaveURL(/.*\/blogs$/);
  19  |   });
  20  | 
  21  |   test('TC092: Blogs page displays HTML Basics blog card', async () => {
  22  |     await expect(blogsPage.htmlBasicsBlogCard).toBeVisible();
  23  |   });
  24  | 
  25  |   test('TC093: Blogs page displays Locator Strategies blog card', async () => {
  26  |     await expect(blogsPage.locatorStrategiesBlogCard).toBeVisible();
  27  |   });
  28  | 
  29  |   test('TC094: All blog cards are visible', async () => {
  30  |     await expect(blogsPage.htmlBasicsBlogCard).toBeVisible();
  31  |     await expect(blogsPage.locatorStrategiesBlogCard).toBeVisible();
  32  |   });
  33  | 
  34  |   test('TC095: HTML Basics blog link is clickable', async () => {
  35  |     await expect(blogsPage.htmlBasicsBlogLink).toBeVisible();
  36  |     await expect(blogsPage.htmlBasicsBlogLink).toBeEnabled();
  37  |   });
  38  | 
  39  |   test('TC096: Locator Strategies blog link is clickable', async () => {
  40  |     await expect(blogsPage.locatorStrategiesBlogLink).toBeVisible();
  41  |     await expect(blogsPage.locatorStrategiesBlogLink).toBeEnabled();
  42  |   });
  43  | 
  44  |   test('TC097: Click on HTML Basics blog', async () => {
  45  |     await blogsPage.clickHTMLBasicsBlog();
  46  |     await expect(blogsPage.page).toHaveURL(/.*html-basics/);
  47  |   });
  48  | 
  49  |   test('TC098: Click on Locator Strategies blog', async () => {
  50  |     await blogsPage.clickLocatorStrategiesBlog();
  51  |     await expect(blogsPage.page).toHaveURL(/.*Locators/);
  52  |   });
  53  | 
  54  |   test('TC099: Blog detail page loads correctly', async () => {
  55  |     await blogsPage.gotoBlogByName('html-basics');
  56  |     await expect(blogsPage.pageHeading).toBeVisible();
  57  |   });
  58  | 
  59  |   test('TC100: Page heading text is correct', async () => {
  60  |     await expect(blogsPage.pageHeading).toContainText('Latest Blogs');
  61  |   });
  62  | 
  63  |   test('TC101: Blog card count is greater than zero', async () => {
  64  |     const blogCards = blogsPage.page.locator('article, div[class*="card"], div[class*="blog"]');
> 65  |     await expect(blogCards.first()).toBeVisible();
      |                                     ^ Error: expect(locator).toBeVisible() failed
  66  |   });
  67  | 
  68  |   test('TC102: Blog links are retrievable', async () => {
  69  |     const blogLinks = blogsPage.page.locator('a[href*="/blogs/"]');
  70  |     await expect(blogLinks.first()).toBeVisible();
  71  |   });
  72  | 
  73  |   test('TC103: HTML Basics blog link is enabled', async () => {
  74  |     await expect(blogsPage.htmlBasicsBlogLink).toBeEnabled();
  75  |   });
  76  | 
  77  |   test('TC104: Navigate to blog and verify content', async () => {
  78  |     await blogsPage.gotoBlogByName('html-basics');
  79  |     await expect(blogsPage.pageHeading).toBeVisible();
  80  |   });
  81  | 
  82  |   test('TC105: Navigation is visible on blogs page', async () => {
  83  |     await expect(blogsPage.navigationBar).toBeVisible();
  84  |   });
  85  | 
  86  |   test('TC106: Footer is visible on blogs page', async () => {
  87  |     await expect(blogsPage.footer).toBeVisible();
  88  |   });
  89  | 
  90  |   test('TC107: Page title contains Blogs', async () => {
  91  |     const title = await blogsPage.page.title();
  92  |     expect(title).toContain('Blogs');
  93  |   });
  94  | 
  95  |   test('TC108: Blogs page description is visible', async () => {
  96  |     await expect(blogsPage.pageDescription).toBeVisible();
  97  |   });
  98  | 
  99  |   test('TC109: All blog cards have clickable links', async () => {
  100 |     const blogLinks = blogsPage.page.locator('a[href*="/blogs/"]');
  101 |     for (let i = 0; i < await blogLinks.count(); i++) {
  102 |       const href = await blogLinks.nth(i).getAttribute('href');
  103 |       expect(href).toMatch(/\/blogs\//);  
  104 |     }
  105 |   });
  106 | });
  107 | 
```