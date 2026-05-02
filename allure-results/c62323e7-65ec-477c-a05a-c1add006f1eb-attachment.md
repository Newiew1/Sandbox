# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> End-to-End User Journeys >> TC112: Complete user journey - Home to Interviews with Search
- Location: tests\e2e.spec.ts:47:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-role="question"]').first()
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-role="question"]').first()

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { HomePage } from '../pages/HomePage';
  3   | import { ExplorePage } from '../pages/ExplorePage';
  4   | import { InterviewQuestionsPage } from '../pages/InterviewQuestionsPage';
  5   | import { ConceptsPage } from '../pages/ConceptsPage';
  6   | import { ChallengePage } from '../pages/ChallengePage';
  7   | import { BlogsPage } from '../pages/BlogsPage';
  8   | 
  9   | /**
  10  |  * End-to-End User Journey Tests
  11  |  * Tests complete user workflows across the application
  12  |  */
  13  | 
  14  | test.describe('End-to-End User Journeys', () => {
  15  |   test('TC110: Complete user journey - Home to Explore to Concepts', async ({ page }) => {
  16  |     const homePage = new HomePage(page);
  17  |     const explorePage = new ExplorePage(page);
  18  |     const conceptsPage = new ConceptsPage(page);
  19  | 
  20  |     // Start at home
  21  |     await homePage.goto();
  22  |     await expect(homePage.heroHeading).toBeVisible();
  23  | 
  24  |     // Navigate to explore
  25  |     await homePage.clickStartExploring();
  26  |     await expect(explorePage.pageHeading).toBeVisible();
  27  | 
  28  |     // Navigate to concepts
  29  |     await explorePage.clickStartLearning();
  30  |     await expect(page).toHaveURL(/.*concepts/);
  31  |   });
  32  | 
  33  |   test('TC111: Complete user journey - Home to Challenges', async ({ page }) => {
  34  |     const homePage = new HomePage(page);
  35  |     const challengePage = new ChallengePage(page);
  36  | 
  37  |     // Start at home
  38  |     await homePage.goto();
  39  |     await expect(homePage.heroHeading).toBeVisible();
  40  | 
  41  |     // Navigate to challenges
  42  |     await homePage.clickChallenges();
  43  |     await expect(challengePage.pageHeading).toBeVisible();
  44  |     await expect(page).toHaveURL(/.*\/challenges$/);
  45  |   });
  46  | 
  47  |   test('TC112: Complete user journey - Home to Interviews with Search', async ({ page }) => {
  48  |     const homePage = new HomePage(page);
  49  |     const explorePage = new ExplorePage(page);
  50  |     const interviewPage = new InterviewQuestionsPage(page);
  51  | 
  52  |     // Start at home
  53  |     await homePage.goto();
  54  |     
  55  |     // Navigate to explore
  56  |     await homePage.clickStartExploring();
  57  |     
  58  |     // Navigate to interview questions
  59  |     await explorePage.clickExploreQuestions();
  60  |     await expect(interviewPage.pageHeading).toBeVisible();
  61  | 
  62  |     // Perform search
  63  |     await interviewPage.searchQuestions('framework');
> 64  |     await expect(interviewPage.page.locator('div[class*=\"question\"], article, li').first()).toBeVisible();
      |                                                                                ^ Error: expect(locator).toBeVisible() failed
  65  |   });
  66  | 
  67  |   test('TC113: Complete user journey - Home to Blogs to Article', async ({ page }) => {
  68  |     const homePage = new HomePage(page);
  69  |     const explorePage = new ExplorePage(page);
  70  |     const blogsPage = new BlogsPage(page);
  71  | 
  72  |     // Start at home
  73  |     await homePage.goto();
  74  |     
  75  |     // Navigate to explore
  76  |     await homePage.clickStartExploring();
  77  |     
  78  |     // Navigate to blogs
  79  |     await explorePage.clickReadBlogs();
  80  |     await expect(blogsPage.pageHeading).toBeVisible();
  81  | 
  82  |     // Navigate to HTML Basics blog
  83  |     await blogsPage.clickHTMLBasicsBlog();
  84  |     await expect(blogsPage.pageHeading).toBeVisible();
  85  |   });
  86  | 
  87  |   test('TC114: Complete user journey - Challenge exploration and navigation', async ({ page }) => {
  88  |     const challengePage = new ChallengePage(page);
  89  | 
  90  |     // Navigate to challenges page
  91  |     await challengePage.goto();
  92  |     await expect(challengePage.pageHeading).toBeVisible();
  93  | 
  94  |     // Click on Product Filtering challenge
  95  |     await challengePage.clickProductFilteringChallenge();
  96  |     await expect(page).toHaveURL(/.*product-filtering/);
  97  | 
  98  |     // Verify challenge content
  99  |     await expect(challengePage.pageHeading).toBeVisible();
  100 |   });
  101 | 
  102 |   test('TC115: Complete user journey - Concept exploration with tab switching', async ({ page }) => {
  103 |     const conceptsPage = new ConceptsPage(page);
  104 | 
  105 |     // Navigate to iframe concept
  106 |     await conceptsPage.goto('iframe');
  107 |     await expect(conceptsPage.pageHeading).toBeVisible();
  108 | 
  109 |     // Switch to Try It Yourself tab
  110 |     await conceptsPage.clickTryItYourselfTab();
  111 |     await expect(conceptsPage.tryItYourselfTab).toHaveAttribute('aria-selected', 'true');
  112 | 
  113 |     // Switch to Test Cases tab
  114 |     await conceptsPage.clickTestCasesTab();
  115 |     await expect(conceptsPage.testCasesTab).toHaveAttribute('aria-selected', 'true');
  116 | 
  117 |     // Switch back to Concept tab
  118 |     await conceptsPage.clickConceptTab();
  119 |     await expect(conceptsPage.conceptTab).toHaveAttribute('aria-selected', 'true');
  120 |   });
  121 | 
  122 |   test('TC116: Navigation flow - Home -> Explore -> Back to Home', async ({ page }) => {
  123 |     const homePage = new HomePage(page);
  124 |     const explorePage = new ExplorePage(page);
  125 | 
  126 |     // Start at home
  127 |     await homePage.goto();
  128 |     await expect(page).toHaveURL(/^https:\/\/www\.cnarios\.com\/$|^https:\/\/www\.cnarios\.com$/);
  129 | 
  130 |     // Navigate to explore
  131 |     await homePage.clickStartExploring();
  132 |     await expect(page).toHaveURL(/.*explore/);
  133 | 
  134 |     // Go back to home
  135 |     await explorePage.goBack();
  136 |     await expect(page).toHaveURL(/^https:\/\/www\.cnarios\.com\/$|^https:\/\/www\.cnarios\.com$/);
  137 |   });
  138 | 
  139 |   test('TC117: Filter testing - Interview questions filter interaction', async ({ page }) => {
  140 |     const interviewPage = new InterviewQuestionsPage(page);
  141 | 
  142 |     // Navigate to interview questions
  143 |     await interviewPage.goto();
  144 |     await expect(interviewPage.pageHeading).toBeVisible();
  145 | 
  146 |     // Test search with multiple keywords
  147 |     for (const keyword of ['selenium', 'xpath', 'css']) {
  148 |       await interviewPage.searchQuestions(keyword);
  149 |       await expect(interviewPage.searchInput).toHaveValue(keyword);
  150 |     }
  151 | 
  152 |     // Clear search
  153 |     await interviewPage.clearSearchInput();
  154 |     await expect(interviewPage.searchInput).toHaveValue('');
  155 |   });
  156 | 
  157 |   test('TC118: Multi-concept navigation', async ({ page }) => {
  158 |     const conceptsPage = new ConceptsPage(page);
  159 | 
  160 |     const concepts = ['iframe', 'multiwindow', 'links', 'table'];
  161 | 
  162 |     for (const concept of concepts) {
  163 |       await conceptsPage.navigateToConcept(concept);
  164 |       await expect(page).toHaveURL(new RegExp(`.*${concept}`));
```