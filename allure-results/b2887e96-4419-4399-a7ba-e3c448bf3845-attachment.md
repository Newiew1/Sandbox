# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> End-to-End User Journeys >> TC119: Full navigation bar test across all pages
- Location: tests\e2e.spec.ts:169:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('nav')
Expected: visible
Error: strict mode violation: locator('nav') resolved to 2 elements:
    1) <nav class="MuiPaper-root MuiPaper-elevation MuiPaper-elevation4 MuiAppBar-root MuiAppBar-colorPrimary MuiAppBar-positionFixed mui-fixed css-1stzd1v">…</nav> aka getByRole('navigation').filter({ hasText: 'FeaturesHow it works?Contact' })
    2) <nav class="MuiBox-root css-0"></nav> aka getByRole('navigation').filter({ hasText: /^$/ })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('nav')

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
  - main [ref=e14]:
    - generic [ref=e15]:
      - generic [ref=e16]:
        - heading "Practice Automation Testing the Way It Happens in the Real World" [level=1] [ref=e18]
        - paragraph [ref=e19]: Cnarios is a free platform for testers to practice automation using real-life scenarios, industry-standard test cases, and bug-finding challenges. Learn concepts, sharpen your skills, and prepare for interviews — all in one place.
        - generic [ref=e20]:
          - link "Start Exploring" [ref=e21] [cursor=pointer]:
            - /url: /explore
            - button "Start Exploring" [ref=e22]
          - link "Challenges" [ref=e23] [cursor=pointer]:
            - /url: /challenges
            - button "Challenges" [ref=e24]
      - img "Automation Illustration" [ref=e26]
  - generic [ref=e27]:
    - paragraph [ref=e28]: features
    - generic [ref=e29]:
      - link "Practice real world scenarios image Hands-On Practice Master automation by practicing every possible real-world scenario." [ref=e30] [cursor=pointer]:
        - /url: /concepts
        - img "Practice real world scenarios image" [ref=e31]
        - heading "Hands-On Practice" [level=3] [ref=e32]
        - paragraph [ref=e33]: Master automation by practicing every possible real-world scenario.
      - link "interview questions image Interview Questions Prepare smarter with real interview-style questions and challenges." [ref=e34] [cursor=pointer]:
        - /url: /interview-questions
        - img "interview questions image" [ref=e35]
        - heading "Interview Questions" [level=3] [ref=e36]
        - paragraph [ref=e37]: Prepare smarter with real interview-style questions and challenges.
      - link "Challenges image Test Your Skills Face challenges and interview questions to prepare for the real world." [ref=e38] [cursor=pointer]:
        - /url: /challenges
        - img "Challenges image" [ref=e39]
        - heading "Test Your Skills" [level=3] [ref=e40]
        - paragraph [ref=e41]: Face challenges and interview questions to prepare for the real world.
  - generic [ref=e42]:
    - paragraph [ref=e43]: How it works?
    - generic [ref=e45]:
      - generic [ref=e46]:
        - generic [ref=e47]:
          - generic [ref=e49]: "1"
          - generic [ref=e50]:
            - paragraph [ref=e51]: Search for the topic you want to master
            - paragraph [ref=e52]: Go to explore section → Click on / search the topic you want to learn
        - img "Search Illustration" [ref=e54]
      - generic [ref=e55]:
        - generic [ref=e56]:
          - generic [ref=e58]: "2"
          - generic [ref=e59]:
            - paragraph [ref=e60]: Understand the Concept
            - paragraph [ref=e61]: Read the on point description about the topic and also real-world examples with visuals
        - img "Reading Illustration" [ref=e63]
      - generic [ref=e64]:
        - generic [ref=e65]:
          - generic [ref=e67]: "3"
          - generic [ref=e68]:
            - paragraph [ref=e69]: Practice the Scenario
            - paragraph [ref=e70]: Practice the meaningful scenarios what actual automation engineers automate with proper testcases including positive and negative scenarios.
        - img "Practice Illustration" [ref=e72]
  - generic [ref=e73]:
    - heading "Share. Suggest. Shape." [level=4] [ref=e74]
    - paragraph [ref=e75]: Whether it's a broken flow, a cool suggestion, or your favorite interview challenge — we're all ears.
    - link "Drop Us a Line" [ref=e76] [cursor=pointer]:
      - /url: mailto:cnaarios@gmail.com?subject=Hello%20from%20Your%20Automation%20Playground&body=Hi%20team%2C%0A%0AI%20wanted%20to%20share%2Fsuggest...
      - img [ref=e78]
      - text: Drop Us a Line
  - contentinfo [ref=e80]:
    - separator [ref=e81]
    - generic [ref=e82]:
      - link "cnarios logo" [ref=e84] [cursor=pointer]:
        - /url: /
        - img "cnarios logo" [ref=e85]
      - generic [ref=e86]:
        - generic [ref=e87]:
          - heading "Concepts" [level=6] [ref=e88]
          - generic [ref=e89]:
            - link "Iframes" [ref=e90] [cursor=pointer]:
              - /url: /concepts/iframe
            - link "Multi Window" [ref=e91] [cursor=pointer]:
              - /url: /concepts/multiwindow
            - link "Links" [ref=e92] [cursor=pointer]:
              - /url: /concepts/links
            - link "Table" [ref=e93] [cursor=pointer]:
              - /url: /concepts/table
        - generic [ref=e94]:
          - heading "Challenges" [level=6] [ref=e95]
          - generic [ref=e96]:
            - link "E-commerce Pagination" [ref=e97] [cursor=pointer]:
              - /url: /challenges/product-listing-pagination
            - link "E-commerce Filters" [ref=e98] [cursor=pointer]:
              - /url: /challenges/product-filtering
        - generic [ref=e99]:
          - heading "Blogs" [level=6] [ref=e100]
          - generic [ref=e101]:
            - link "HTML Basics" [ref=e102] [cursor=pointer]:
              - /url: /blogs/html-basics
            - link "Locator Strategies" [ref=e103] [cursor=pointer]:
              - /url: /blogs/Locators
      - generic [ref=e105]:
        - link "LinkedIn" [ref=e106] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/cnarios
          - img [ref=e107]
          - text: LinkedIn
        - link "YouTube" [ref=e109] [cursor=pointer]:
          - /url: https://www.youtube.com/channel/UC2F8fdGwKP18tyqEKtGRxeg
          - img [ref=e110]
          - text: YouTube
        - link "Email" [ref=e112] [cursor=pointer]:
          - /url: mailto:cnaarios.@gmail.com
          - img [ref=e113]
          - text: Email
    - paragraph [ref=e117]:
      - text: © 2026 Cnarios. All rights reserved. | Designed by
      - strong [ref=e118]:
        - link "END Prasad" [ref=e119] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/prasad-e-n-d/
```

# Test source

```ts
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
  165 |       await expect(conceptsPage.pageHeading).toBeVisible();
  166 |     }
  167 |   });
  168 | 
  169 |   test('TC119: Full navigation bar test across all pages', async ({ page }) => {
  170 |     const homePage = new HomePage(page);
  171 |     const pages = [
  172 |       { path: '/' },
  173 |       { path: '/explore' },
  174 |       { path: '/interview-questions' },
  175 |       { path: '/challenges' },
  176 |       { path: '/blogs' },
  177 |     ];
  178 | 
  179 |     for (const pageObj of pages) {
  180 |       await page.goto(`https://www.cnarios.com${pageObj.path}`);
> 181 |       await expect(page.locator('nav')).toBeVisible();
      |                                         ^ Error: expect(locator).toBeVisible() failed
  182 |     }
  183 |   });
  184 | 
  185 |   test('TC120: Footer links validation across pages', async ({ page }) => {
  186 |     const pages = ['/', '/explore', '/challenges'];
  187 | 
  188 |     for (const path of pages) {
  189 |       await page.goto(`https://www.cnarios.com${path}`);
  190 |       await expect(page.locator('footer').first()).toBeVisible();
  191 |     }
  192 |   });
  193 | });
  194 | 
```