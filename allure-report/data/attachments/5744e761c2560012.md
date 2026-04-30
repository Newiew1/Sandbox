# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blogs.spec.ts >> Blogs Page Tests >> TC104: Navigate to blog and verify content
- Location: tests\blogs.spec.ts:87:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
      - /url: /blogs
      - button "Back" [ref=e16]:
        - img [ref=e18]
        - text: Back
    - heading "HTML Basics for Automation" [level=1] [ref=e20]
    - heading "HTML Basics" [level=6] [ref=e21]
    - heading "Why HTML Matters in Web Automation?" [level=5] [ref=e22]
    - paragraph [ref=e23]: We need to learn HTML for automation because it helps us understand the structure of a webpage, so we can correctly locate and interact with elements like buttons, inputs, and links.
    - heading "What is HTML?" [level=5] [ref=e24]
    - paragraph [ref=e25]: Using a city map without street names or landmarks is frustrating. You wouldn’t know where you are or where to go next. HTML is like that map — it labels and organizes everything on a webpage. Without it, you’re just guessing your way around.
    - img "Why we need HTML Illustration" [ref=e27]
    - paragraph [ref=e28]: Just like a well-labeled map helps you find the exact street or location, HTML helps you easily find and target the right elements on a webpage to interact with them accurately.
    - heading "How is HTML Structured?" [level=5] [ref=e29]
    - paragraph [ref=e30]: HTML is written using tags and follows a tree-like structure, just like a family tree. Each tag can have parent, child, and sibling relationships, which helps define the hierarchy of elements on a webpage. Understanding this structure makes it easier to navigate and locate elements—especially when working with tools like XPath later.
    - img "React Portals Diagram" [ref=e32]
    - heading "Syntax for a tag" [level=5] [ref=e33]
    - paragraph [ref=e34]: "In HTML, there are two types of tags: container tags (with opening and closing) and empty tags (self-closing). Here's a quick breakdown of a tag:"
    - img "React Portals Diagram" [ref=e36]
    - paragraph [ref=e37]: "Note: A tag can have multiple attributes, and some attributes may not have values."
  - contentinfo [ref=e38]:
    - separator [ref=e39]
    - generic [ref=e40]:
      - link "cnarios logo" [ref=e42] [cursor=pointer]:
        - /url: /
        - img "cnarios logo" [ref=e43]
      - generic [ref=e44]:
        - generic [ref=e45]:
          - heading "Concepts" [level=6] [ref=e46]
          - generic [ref=e47]:
            - link "Iframes" [ref=e48] [cursor=pointer]:
              - /url: /concepts/iframe
            - link "Multi Window" [ref=e49] [cursor=pointer]:
              - /url: /concepts/multiwindow
            - link "Links" [ref=e50] [cursor=pointer]:
              - /url: /concepts/links
            - link "Table" [ref=e51] [cursor=pointer]:
              - /url: /concepts/table
        - generic [ref=e52]:
          - heading "Challenges" [level=6] [ref=e53]
          - generic [ref=e54]:
            - link "E-commerce Pagination" [ref=e55] [cursor=pointer]:
              - /url: /challenges/product-listing-pagination
            - link "E-commerce Filters" [ref=e56] [cursor=pointer]:
              - /url: /challenges/product-filtering
        - generic [ref=e57]:
          - heading "Blogs" [level=6] [ref=e58]
          - generic [ref=e59]:
            - link "HTML Basics" [ref=e60] [cursor=pointer]:
              - /url: /blogs/html-basics
            - link "Locator Strategies" [ref=e61] [cursor=pointer]:
              - /url: /blogs/Locators
      - generic [ref=e63]:
        - link "LinkedIn" [ref=e64] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/cnarios
          - img [ref=e65]
          - text: LinkedIn
        - link "YouTube" [ref=e67] [cursor=pointer]:
          - /url: https://www.youtube.com/channel/UC2F8fdGwKP18tyqEKtGRxeg
          - img [ref=e68]
          - text: YouTube
        - link "Email" [ref=e70] [cursor=pointer]:
          - /url: mailto:cnaarios.@gmail.com
          - img [ref=e71]
          - text: Email
    - paragraph [ref=e75]:
      - text: © 2026 Cnarios. All rights reserved. | Designed by
      - strong [ref=e76]:
        - link "END Prasad" [ref=e77] [cursor=pointer]:
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
  17  |     const isLoaded = await blogsPage.verifyPageLoaded();
  18  |     expect(isLoaded).toBeTruthy();
  19  | 
  20  |     const currentURL = await blogsPage.getCurrentURL();
  21  |     expect(currentURL).toMatch(/.*\/blogs$/);
  22  |   });
  23  | 
  24  |   test('TC092: Blogs page displays HTML Basics blog card', async () => {
  25  |     const isVisible = await blogsPage.htmlBasicsBlogCard.isVisible();
  26  |     expect(isVisible).toBeTruthy();
  27  |   });
  28  | 
  29  |   test('TC093: Blogs page displays Locator Strategies blog card', async () => {
  30  |     const isVisible = await blogsPage.locatorStrategiesBlogCard.isVisible();
  31  |     expect(isVisible).toBeTruthy();
  32  |   });
  33  | 
  34  |   test('TC094: All blog cards are visible', async () => {
  35  |     const allVisible = await blogsPage.verifyAllBlogCards();
  36  |     expect(allVisible).toBeTruthy();
  37  |   });
  38  | 
  39  |   test('TC095: HTML Basics blog link is clickable', async () => {
  40  |     const isVisible = await blogsPage.htmlBasicsBlogLink.isVisible();
  41  |     expect(isVisible).toBeTruthy();
  42  |   });
  43  | 
  44  |   test('TC096: Locator Strategies blog link is clickable', async () => {
  45  |     const isVisible = await blogsPage.locatorStrategiesBlogLink.isVisible();
  46  |     expect(isVisible).toBeTruthy();
  47  |   });
  48  | 
  49  |   test('TC097: Click on HTML Basics blog', async () => {
  50  |     await blogsPage.clickHTMLBasicsBlog();
  51  |     const currentURL = await blogsPage.getCurrentURL();
  52  |     expect(currentURL).toContain('html-basics');
  53  |   });
  54  | 
  55  |   test('TC098: Click on Locator Strategies blog', async () => {
  56  |     await blogsPage.clickLocatorStrategiesBlog();
  57  |     const currentURL = await blogsPage.getCurrentURL();
  58  |     expect(currentURL).toContain('Locators');
  59  |   });
  60  | 
  61  |   test('TC099: Blog detail page loads correctly', async () => {
  62  |     await blogsPage.gotoBlogByName('html-basics');
  63  |     const isLoaded = await blogsPage.verifyBlogDetailPageLoaded();
  64  |     expect(isLoaded).toBeTruthy();
  65  |   });
  66  | 
  67  |   test('TC100: Page heading text is correct', async () => {
  68  |     const headingText = await blogsPage.getPageHeadingText();
  69  |     expect(headingText).toContain('Latest Blogs');
  70  |   });
  71  | 
  72  |   test('TC101: Blog card count is greater than zero', async () => {
  73  |     const count = await blogsPage.getBlogCardCount();
  74  |     expect(count).toBeGreaterThan(0);
  75  |   });
  76  | 
  77  |   test('TC102: Blog links are retrievable', async () => {
  78  |     const links = await blogsPage.getAllBlogLinks();
  79  |     expect(links.length).toBeGreaterThan(0);
  80  |   });
  81  | 
  82  |   test('TC103: HTML Basics blog link is enabled', async () => {
  83  |     const isEnabled = await blogsPage.isBlogLinkClickable(blogsPage.htmlBasicsBlogLink);
  84  |     expect(isEnabled).toBeTruthy();
  85  |   });
  86  | 
  87  |   test('TC104: Navigate to blog and verify content', async () => {
  88  |     await blogsPage.gotoBlogByName('html-basics');
  89  |     const content = await blogsPage.getBlogContent();
> 90  |     expect(content.length).toBeGreaterThan(0);
      |                            ^ Error: expect(received).toBeGreaterThan(expected)
  91  |   });
  92  | 
  93  |   test('TC105: Navigation is visible on blogs page', async () => {
  94  |     const navVisible = await blogsPage.isNavigationVisible();
  95  |     expect(navVisible).toBeTruthy();
  96  |   });
  97  | 
  98  |   test('TC106: Footer is visible on blogs page', async () => {
  99  |     const footerVisible = await blogsPage.isFooterVisible();
  100 |     expect(footerVisible).toBeTruthy();
  101 |   });
  102 | 
  103 |   test('TC107: Page title contains Blogs', async () => {
  104 |     const title = await blogsPage.getPageTitle();
  105 |     expect(title).toContain('Blogs');
  106 |   });
  107 | 
  108 |   test('TC108: Blogs page description is visible', async () => {
  109 |     const isVisible = await blogsPage.pageDescription.isVisible();
  110 |     expect(isVisible).toBeTruthy();
  111 |   });
  112 | 
  113 |   test('TC109: All blog cards have clickable links', async () => {
  114 |     const links = await blogsPage.getAllBlogLinks();
  115 |     for (const link of links) {
  116 |       expect(link).toMatch(/\/blogs\//);
  117 |     }
  118 |   });
  119 | });
  120 | 
```