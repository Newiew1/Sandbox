# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: interviewQuestions.spec.ts >> Interview Questions Page Tests >> TC038: Search functionality filters interview questions
- Location: tests\interviewQuestions.spec.ts:26:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('div[class*="question"], article, li').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('div[class*="question"], article, li').first()
    13 × locator resolved to <li class="MuiListItem-root MuiListItem-gutters css-1ohqk82">…</li>
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
  - generic [ref=e15]:
    - generic [ref=e16]:
      - link "Back" [ref=e17] [cursor=pointer]:
        - /url: /explore
        - button "Back" [ref=e18]:
          - img [ref=e20]
          - text: Back
      - heading "Automation Interview Questions" [level=1] [ref=e22]
      - heading "Comprehensive collection of frequently asked interview questions in the automation testing field. Filter by company, topic, difficulty, or search for specific questions to prepare effectively for your next interview." [level=6] [ref=e23]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - img [ref=e27]
        - heading "Filters & Search" [level=6] [ref=e29]
      - generic [ref=e30]:
        - generic [ref=e32]:
          - img [ref=e33]
          - textbox "Search questions..." [active] [ref=e35]: framework
          - group
        - generic [ref=e36]:
          - generic: Company
          - generic [ref=e37]:
            - combobox [ref=e38] [cursor=pointer]
            - textbox
            - img
            - group:
              - generic: Company
        - generic [ref=e39]:
          - generic: Topic
          - generic [ref=e40]:
            - combobox [ref=e41] [cursor=pointer]
            - textbox
            - img
            - group:
              - generic: Topic
        - generic [ref=e42]:
          - generic: Difficulty
          - generic [ref=e43]:
            - combobox [ref=e44] [cursor=pointer]
            - textbox
            - img
            - group:
              - generic: Difficulty
        - generic [ref=e45]:
          - generic [ref=e46]: Sort By
          - generic [ref=e47]:
            - combobox [ref=e48] [cursor=pointer]: Most Asked
            - textbox: frequency
            - img
            - group:
              - generic: Sort By
        - button "Clear Filters" [ref=e50] [cursor=pointer]
    - heading "Showing 3 questions" [level=6] [ref=e52]
    - generic [ref=e53]:
      - generic [ref=e56] [cursor=pointer]:
        - generic [ref=e57]:
          - generic [ref=e58]:
            - button [ref=e59]:
              - img [ref=e60]
            - heading "Walk me through your automation framework – which tools, design patterns, and reporting mechanisms do you use?" [level=6] [ref=e62]:
              - img [ref=e63]
              - text: Walk me through your automation framework – which tools, design patterns, and reporting mechanisms do you use?
            - img "Frequently Asked" [ref=e65]
          - generic [ref=e68]:
            - paragraph [ref=e69]: Asked 23 times
            - paragraph [ref=e70]: 08/25
            - generic [ref=e72]: Medium
            - generic [ref=e74]: Framework
          - generic [ref=e75]:
            - generic [ref=e77]: Deloitte
            - generic [ref=e79]: Accenture
            - generic [ref=e81]: QualityKiosk
            - generic [ref=e83]: Infosys
            - generic [ref=e85]: Nagarro
            - generic [ref=e87]: Wipro
        - button [ref=e88]:
          - img [ref=e89]
      - generic [ref=e93] [cursor=pointer]:
        - generic [ref=e94]:
          - generic [ref=e95]:
            - button [ref=e96]:
              - img [ref=e97]
            - heading "Tell me some exceptions you have faced while writing the framework." [level=6] [ref=e99]:
              - img [ref=e100]
              - text: Tell me some exceptions you have faced while writing the framework.
          - generic [ref=e102]:
            - paragraph [ref=e103]: Asked 6 times
            - paragraph [ref=e104]: 08/25
            - generic [ref=e106]: Medium
            - generic [ref=e108]: Selenium
          - generic [ref=e109]:
            - generic [ref=e111]: Infosys
            - generic [ref=e113]: TCS
            - generic [ref=e115]: Highradius
            - generic [ref=e117]: Deliotte
        - button [ref=e118]:
          - img [ref=e119]
      - generic [ref=e123] [cursor=pointer]:
        - generic [ref=e124]:
          - generic [ref=e125]:
            - button [ref=e126]:
              - img [ref=e127]
            - heading "What are the benefits of test automation frameworks?" [level=6] [ref=e129]:
              - img [ref=e130]
              - text: What are the benefits of test automation frameworks?
          - generic [ref=e132]:
            - paragraph [ref=e133]: Asked 5 times
            - paragraph [ref=e134]: 03/25
            - generic [ref=e136]: Easy
            - generic [ref=e138]: Frameworks
          - generic [ref=e139]:
            - generic [ref=e141]: TCS
            - generic [ref=e143]: Wipro
        - button [ref=e144]:
          - img [ref=e145]
  - contentinfo [ref=e147]:
    - separator [ref=e148]
    - generic [ref=e149]:
      - link "cnarios logo" [ref=e151] [cursor=pointer]:
        - /url: /
        - img "cnarios logo" [ref=e152]
      - generic [ref=e153]:
        - generic [ref=e154]:
          - heading "Concepts" [level=6] [ref=e155]
          - generic [ref=e156]:
            - link "Iframes" [ref=e157] [cursor=pointer]:
              - /url: /concepts/iframe
            - link "Multi Window" [ref=e158] [cursor=pointer]:
              - /url: /concepts/multiwindow
            - link "Links" [ref=e159] [cursor=pointer]:
              - /url: /concepts/links
            - link "Table" [ref=e160] [cursor=pointer]:
              - /url: /concepts/table
        - generic [ref=e161]:
          - heading "Challenges" [level=6] [ref=e162]
          - generic [ref=e163]:
            - link "E-commerce Pagination" [ref=e164] [cursor=pointer]:
              - /url: /challenges/product-listing-pagination
            - link "E-commerce Filters" [ref=e165] [cursor=pointer]:
              - /url: /challenges/product-filtering
        - generic [ref=e166]:
          - heading "Blogs" [level=6] [ref=e167]
          - generic [ref=e168]:
            - link "HTML Basics" [ref=e169] [cursor=pointer]:
              - /url: /blogs/html-basics
            - link "Locator Strategies" [ref=e170] [cursor=pointer]:
              - /url: /blogs/Locators
      - generic [ref=e172]:
        - link "LinkedIn" [ref=e173] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/cnarios
          - img [ref=e174]
          - text: LinkedIn
        - link "YouTube" [ref=e176] [cursor=pointer]:
          - /url: https://www.youtube.com/channel/UC2F8fdGwKP18tyqEKtGRxeg
          - img [ref=e177]
          - text: YouTube
        - link "Email" [ref=e179] [cursor=pointer]:
          - /url: mailto:cnaarios.@gmail.com
          - img [ref=e180]
          - text: Email
    - paragraph [ref=e184]:
      - text: © 2026 Cnarios. All rights reserved. | Designed by
      - strong [ref=e185]:
        - link "END Prasad" [ref=e186] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/prasad-e-n-d/
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { InterviewQuestionsPage } from '../pages/InterviewQuestionsPage';
  3   | import { TEST_DATA } from '../utils/constants';
  4   | 
  5   | /**
  6   |  * Interview Questions Page Test Suite
  7   |  */
  8   | 
  9   | test.describe('Interview Questions Page Tests', () => {
  10  |   let interviewPage: InterviewQuestionsPage;
  11  | 
  12  |   test.beforeEach(async ({ page }) => {
  13  |     interviewPage = new InterviewQuestionsPage(page);
  14  |     await interviewPage.goto();
  15  |   });
  16  | 
  17  |   test('TC036: Interview questions page loads successfully', async () => {
  18  |     await expect(interviewPage.pageHeading).toBeVisible();
  19  |     await expect(interviewPage.page).toHaveURL(/.*\/interview-questions$/);
  20  |   });
  21  | 
  22  |   test('TC037: Interview questions page displays search box', async () => {
  23  |     await expect(interviewPage.searchInput).toBeVisible();
  24  |   });
  25  | 
  26  |   test('TC038: Search functionality filters interview questions', async () => {
  27  |     await interviewPage.searchQuestions('framework');
  28  |     await interviewPage.page.waitForTimeout(1000);
> 29  |     await expect(interviewPage.page.locator('div[class*="question"], article, li').first()).toBeVisible();
      |                                                                                             ^ Error: expect(locator).toBeVisible() failed
  30  |   });
  31  | 
  32  |   test('TC039: Search input accepts user input', async () => {
  33  |     await interviewPage.searchQuestions('selenium');
  34  |     await expect(interviewPage.searchInput).toHaveValue('selenium');
  35  |   });
  36  | 
  37  |   test('TC040: Company filter is available and clickable', async () => {
  38  |     await expect(interviewPage.companyFilter).toBeVisible();
  39  |     await expect(interviewPage.companyFilter).toBeEnabled();
  40  |   });
  41  | 
  42  |   test('TC041: Topic filter is available and clickable', async () => {
  43  |     await expect(interviewPage.topicFilter).toBeVisible();
  44  |     await expect(interviewPage.topicFilter).toBeEnabled();
  45  |   });
  46  | 
  47  |   test('TC042: Difficulty filter is available and clickable', async () => {
  48  |     await expect(interviewPage.difficultyFilter).toBeVisible();
  49  |     await expect(interviewPage.difficultyFilter).toBeEnabled();
  50  |   });
  51  | 
  52  |   test('TC043: Sort By filter is available with default selection', async () => {
  53  |     await expect(interviewPage.sortByFilter).toBeVisible();
  54  |   });
  55  | 
  56  |   test('TC044: Clear Filters button is visible', async () => {
  57  |     await expect(interviewPage.clearFiltersBtn).toBeVisible();
  58  |   });
  59  | 
  60  |   test('TC045: Interview questions are displayed', async () => {
  61  |     await expect(interviewPage.page.locator('div[class*="question"], article, li').first()).toBeVisible();
  62  |   });
  63  | 
  64  |   test('TC046: All filter elements are visible', async () => {
  65  |     await expect(interviewPage.companyFilter).toBeVisible();
  66  |     await expect(interviewPage.topicFilter).toBeVisible();
  67  |     await expect(interviewPage.difficultyFilter).toBeVisible();
  68  |   });
  69  | 
  70  |   test('TC047: Clear search input functionality', async () => {
  71  |     await interviewPage.searchQuestions('test');
  72  |     await interviewPage.clearSearchInput();
  73  |     await expect(interviewPage.searchInput).toHaveValue('');
  74  |   });
  75  | 
  76  |   test('TC048: Question count is displayed', async () => {
  77  |     const questions = interviewPage.page.locator('[data-role="question"]');
  78  |     await expect(questions.first()).toBeVisible();
  79  |   });
  80  | 
  81  |   test('TC049: Page heading text is correct', async () => {
  82  |     await expect(interviewPage.pageHeading).toContainText('Automation Interview Questions');
  83  |   });
  84  | 
  85  |   test('TC050: Back button navigates to explore page', async () => {
  86  |     await interviewPage.goBack();
  87  |     await expect(interviewPage.page).toHaveURL(/.*explore/);
  88  |   });
  89  | 
  90  |   test('TC051: Navigation is visible on interview questions page', async () => {
  91  |     await expect(interviewPage.navigationBar).toBeVisible();
  92  |   });
  93  | 
  94  |   test('TC052: Footer is visible on interview questions page', async () => {
  95  |     await expect(interviewPage.footer).toBeVisible();
  96  |   });
  97  | 
  98  |   test('TC053: Multiple search terms can be tested', async () => {
  99  |     for (const keyword of TEST_DATA.SEARCH_KEYWORDS.slice(0, 3)) {
  100 |       await interviewPage.searchQuestions(keyword);
  101 |       await expect(interviewPage.searchInput).toHaveValue(keyword);
  102 |     }
  103 |   });
  104 | });
  105 | 
```