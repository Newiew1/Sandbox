# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: explore.spec.ts >> Explore Page Tests >> TC032: All CTA buttons are visible on explore page
- Location: tests\explore.spec.ts:61:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('button, a[role="button"]').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('button, a[role="button"]').first()
    13 × locator resolved to <button tabindex="0" type="button" aria-label="open drawer" class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-edgeStart MuiIconButton-sizeMedium css-1h0vov8">…</button>
       - unexpected value "hidden"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic:
    - navigation [ref=e4]:
      - generic [ref=e5]:
        - link "cnarios logo" [ref=e7] [cursor=pointer]:
          - /url: /
          - img "cnarios logo" [ref=e8]
        - generic [ref=e9]:
          - link "Features" [ref=e10] [cursor=pointer]:
            - /url: /#features
          - link "How it works?" [ref=e11] [cursor=pointer]:
            - /url: /#how-it-works
          - link "Contact Us" [ref=e12] [cursor=pointer]:
            - /url: /#contact-us
          - link "Blogs" [ref=e13] [cursor=pointer]:
            - /url: /blogs
    - navigation
  - generic [ref=e14]:
    - link "Back" [ref=e16] [cursor=pointer]:
      - /url: /
      - button "Back" [ref=e17]:
        - img [ref=e19]
        - text: Back
    - generic [ref=e21]:
      - heading "Explore. Practice. Master." [level=1] [ref=e22]
      - paragraph [ref=e23]: Welcome to your one-stop space for mastering automation. Whether you’re here to explore concepts, challenge yourself with real interview questions, or dive into insightful blogs — you’ll find everything you need to grow your skills, step-by-step.
    - generic [ref=e24]:
      - generic [ref=e25]:
        - generic [ref=e27]: Trending
        - generic [ref=e28]:
          - generic [ref=e29]:
            - img [ref=e31]
            - heading "Interview Questions" [level=5] [ref=e33]
            - paragraph [ref=e34]: Explore all the previously asked interview question with company tags
          - button "Explore Questions" [ref=e36] [cursor=pointer]
      - generic [ref=e38]:
        - generic [ref=e39]:
          - img [ref=e41]
          - heading "Concepts" [level=5] [ref=e43]
          - paragraph [ref=e44]: Learn automation concepts with interactive examples and hands-on practice for each topic.
        - button "Start Learning" [ref=e46] [cursor=pointer]
      - generic [ref=e48]:
        - generic [ref=e49]:
          - img [ref=e51]
          - heading "Challenges" [level=5] [ref=e53]
          - paragraph [ref=e54]: Test your skills with interview questions and automation challenges.
        - button "Take Challenge" [ref=e56] [cursor=pointer]
      - generic [ref=e58]:
        - generic [ref=e59]:
          - img [ref=e61]
          - heading "Blogs" [level=5] [ref=e63]
          - paragraph [ref=e64]: Dive deeper into automation theory with well-structured articles.
        - button "Read Blogs" [ref=e66] [cursor=pointer]
  - contentinfo [ref=e67]:
    - separator [ref=e68]
    - generic [ref=e69]:
      - link "cnarios logo" [ref=e71] [cursor=pointer]:
        - /url: /
        - img "cnarios logo" [ref=e72]
      - generic [ref=e73]:
        - generic [ref=e74]:
          - heading "Concepts" [level=6] [ref=e75]
          - generic [ref=e76]:
            - link "Iframes" [ref=e77] [cursor=pointer]:
              - /url: /concepts/iframe
            - link "Multi Window" [ref=e78] [cursor=pointer]:
              - /url: /concepts/multiwindow
            - link "Links" [ref=e79] [cursor=pointer]:
              - /url: /concepts/links
            - link "Table" [ref=e80] [cursor=pointer]:
              - /url: /concepts/table
        - generic [ref=e81]:
          - heading "Challenges" [level=6] [ref=e82]
          - generic [ref=e83]:
            - link "E-commerce Pagination" [ref=e84] [cursor=pointer]:
              - /url: /challenges/product-listing-pagination
            - link "E-commerce Filters" [ref=e85] [cursor=pointer]:
              - /url: /challenges/product-filtering
        - generic [ref=e86]:
          - heading "Blogs" [level=6] [ref=e87]
          - generic [ref=e88]:
            - link "HTML Basics" [ref=e89] [cursor=pointer]:
              - /url: /blogs/html-basics
            - link "Locator Strategies" [ref=e90] [cursor=pointer]:
              - /url: /blogs/Locators
      - generic [ref=e92]:
        - link "LinkedIn" [ref=e93] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/cnarios
          - img [ref=e94]
          - text: LinkedIn
        - link "YouTube" [ref=e96] [cursor=pointer]:
          - /url: https://www.youtube.com/channel/UC2F8fdGwKP18tyqEKtGRxeg
          - img [ref=e97]
          - text: YouTube
        - link "Email" [ref=e99] [cursor=pointer]:
          - /url: mailto:cnaarios.@gmail.com
          - img [ref=e100]
          - text: Email
    - paragraph [ref=e104]:
      - text: © 2026 Cnarios. All rights reserved. | Designed by
      - strong [ref=e105]:
        - link "END Prasad" [ref=e106] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/prasad-e-n-d/
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { ExplorePage } from '../pages/ExplorePage';
  3  | import { HomePage } from '../pages/HomePage';
  4  | 
  5  | /**
  6  |  * Explore Page Test Suite
  7  |  */
  8  | 
  9  | test.describe('Explore Page Tests', () => {
  10 |   let explorePage: ExplorePage;
  11 |   let homePage: HomePage;
  12 | 
  13 |   test.beforeEach(async ({ page }) => {
  14 |     explorePage = new ExplorePage(page);
  15 |     homePage = new HomePage(page);
  16 |     await explorePage.goto();
  17 |   });
  18 | 
  19 |   test('TC023: Explore page loads with correct title', async () => {
  20 |     await expect(explorePage.pageHeading).toBeVisible();
  21 |     await expect(explorePage.page).toHaveURL(/.*\/explore$/);
  22 |   });
  23 | 
  24 |   test('TC024: Explore page has back button', async () => {
  25 |     await expect(explorePage.backButton).toBeVisible();
  26 |   });
  27 | 
  28 |   test('TC025: Back button on explore page returns to home', async () => {
  29 |     await explorePage.goBack();
  30 |     await expect(explorePage.page).toHaveURL(/^https:\/\/www\.cnarios\.com\/$|^https:\/\/www\.cnarios\.com$/);
  31 |   });
  32 | 
  33 |   test('TC026: Explore page displays trending sections', async () => {
  34 |     await expect(explorePage.page.locator('div, article').first()).toBeVisible();
  35 |   });
  36 | 
  37 |   test('TC027: Explore Questions button navigates to interview questions', async () => {
  38 |     await explorePage.clickExploreQuestions();
  39 |     await expect(explorePage.page).toHaveURL(/.*interview-questions/);
  40 |   });
  41 | 
  42 |   test('TC028: Start Learning button navigates to concepts', async () => {
  43 |     await explorePage.clickStartLearning();
  44 |     await expect(explorePage.page).toHaveURL(/.*concepts/);
  45 |   });
  46 | 
  47 |   test('TC029: Take Challenge button navigates to challenges', async () => {
  48 |     await explorePage.clickTakeChallenge();
  49 |     await expect(explorePage.page).toHaveURL(/.*challenges/);
  50 |   });
  51 | 
  52 |   test('TC030: Read Blogs button navigates to blogs', async () => {
  53 |     await explorePage.clickReadBlogs();
  54 |     await expect(explorePage.page).toHaveURL(/.*blogs/);
  55 |   });
  56 | 
  57 |   test('TC031: Explore page heading is displayed', async () => {
  58 |     await expect(explorePage.pageHeading).toContainText('Explore');
  59 |   });
  60 | 
  61 |   test('TC032: All CTA buttons are visible on explore page', async () => {
> 62 |     await expect(explorePage.page.locator('button, a[role="button"]').first()).toBeVisible();
     |                                                                                ^ Error: expect(locator).toBeVisible() failed
  63 |   });
  64 | 
  65 |   test('TC033: Back button visibility on explore page', async () => {
  66 |     await expect(explorePage.backButton).toBeVisible();
  67 |   });
  68 | 
  69 |   test('TC034: Navigation is visible on explore page', async () => {
  70 |     await expect(explorePage.navigationBar).toBeVisible();
  71 |   });
  72 | 
  73 |   test('TC035: Footer is visible on explore page', async () => {
  74 |     await expect(explorePage.footer).toBeVisible();
  75 |   });
  76 | });
  77 | 
```