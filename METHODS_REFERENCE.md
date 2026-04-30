# Page Object Methods Reference

## BasePage Methods (Available on all pages)

### Navigation Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `navigateTo(path)` | Promise<void> | Navigate to URL path |
| `getCurrentURL()` | Promise<string> | Get current page URL |
| `getPageTitle()` | Promise<string> | Get page title |
| `waitForURL(pattern, timeout)` | Promise<void> | Wait for URL to match pattern |
| `clickLogo()` | Promise<void> | Click logo to navigate home |
| `clickBackButton()` | Promise<void> | Click back button |

### Element Interaction Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `scrollToElement(locator)` | Promise<void> | Scroll element into view |
| `waitForElement(locator, timeout)` | Promise<void> | Wait for element visibility |
| `waitForPageLoad()` | Promise<void> | Wait for page to fully load |

### Verification Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `isNavigationVisible()` | Promise<boolean> | Check if navigation is visible |
| `isFooterVisible()` | Promise<boolean> | Check if footer is visible |
| `clickNavLink(href)` | Promise<void> | Click navigation link by href |

### Footer Helpers
| Method | Returns | Description |
|--------|---------|-------------|
| `getFooterLinksBySection(section)` | Locator | Get footer links by section |
| `getSocialMediaLink(platform)` | Locator | Get social media link |

---

## HomePage Methods

### Locators
```
heroHeading          - Main hero heading
heroDescription      - Hero description text
startExploringBtn    - Start Exploring button
challengesBtn        - Challenges button
handsOnPracticeCard  - Hands-On Practice feature card
interviewQuestionsCard - Interview Questions card
testYourSkillsCard   - Test Your Skills card
```

### Navigation Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `goto()` | Promise<void> | Navigate to home page |
| `clickBlogsNav()` | Promise<void> | Click blogs navigation link |

### Action Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `clickStartExploring()` | Promise<void> | Click Start Exploring, wait for navigate |
| `clickChallenges()` | Promise<void> | Click Challenges button |
| `clickHandsOnPractice()` | Promise<void> | Click Hands-On Practice feature |
| `clickInterviewQuestions()` | Promise<void> | Click Interview Questions feature |
| `clickChallengesFeature()` | Promise<void> | Click Challenges feature card |
| `clickFeaturesNav()` | Promise<void> | Click Features nav link |
| `clickHowItWorksNav()` | Promise<void> | Click How it Works nav link |
| `clickContactUsNav()` | Promise<void> | Click Contact Us nav link |

### Verification Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `verifyPageLoaded()` | Promise<boolean> | Verify home page loaded |
| `verifyHeroSection()` | Promise<boolean> | Verify hero section visible |
| `verifyFeaturesSection()` | Promise<boolean> | Verify features section |
| `verifyNavigationLinks()` | Promise<boolean> | Verify all nav links |
| `verifyHowItWorksSection()` | Promise<boolean> | Verify How It Works section |
| `verifyContactSection()` | Promise<boolean> | Verify Contact section |
| `verifyHeroButtonsClickable()` | Promise<boolean> | Verify hero buttons enabled |
| `getHeroHeadingText()` | Promise<string> | Get hero heading text |

---

## ExplorePage Methods

### Locators
```
pageHeading         - Page heading
pageDescription     - Page description
backButton          - Back button
interviewQuestionsCard - Interview Questions card
conceptsCard        - Concepts card
challengesCard      - Challenges card
blogsCard          - Blogs card
exploreQuestionsBtn - Explore Questions button
startLearningBtn    - Start Learning button
takeChallengeBtn    - Take Challenge button
readBlogsBtn        - Read Blogs button
```

### Navigation Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `goto()` | Promise<void> | Navigate to explore page |
| `goBack()` | Promise<void> | Go back, wait for home URL |

### Action Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `clickExploreQuestions()` | Promise<void> | Navigate to interview questions |
| `clickStartLearning()` | Promise<void> | Navigate to concepts |
| `clickTakeChallenge()` | Promise<void> | Navigate to challenges |
| `clickReadBlogs()` | Promise<void> | Navigate to blogs |

### Verification Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `verifyPageLoaded()` | Promise<boolean> | Verify page loaded |
| `verifyTrendingSections()` | Promise<boolean> | Verify all sections visible |
| `verifyAllCTAButtons()` | Promise<boolean> | Verify all buttons visible |
| `verifyBackButtonVisible()` | Promise<boolean> | Verify back button visible |
| `getPageHeadingText()` | Promise<string> | Get page heading text |

---

## InterviewQuestionsPage Methods

### Locators
```
pageHeading         - Page heading
pageDescription     - Page description
searchInput         - Search input field
companyFilter       - Company filter
topicFilter         - Topic filter
difficultyFilter    - Difficulty filter
sortByFilter        - Sort By filter
clearFiltersBtn     - Clear Filters button
questionsContainer  - Questions container
questionItems       - Individual question items
questionCount       - Question count heading
backButton          - Back button
```

### Navigation Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `goto()` | Promise<void> | Navigate to interview questions page |
| `goBack()` | Promise<void> | Go back to explore page |

### Action Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `searchQuestions(searchTerm)` | Promise<void> | Search for questions |
| `clearSearchInput()` | Promise<void> | Clear search input |
| `clearAllFilters()` | Promise<void> | Clear all filters |
| `clickFilterDropdown(filterType)` | Promise<void> | Click filter dropdown |

### Verification Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `verifyPageLoaded()` | Promise<boolean> | Verify page loaded |
| `verifyFilterElements()` | Promise<boolean> | Verify all filters visible |
| `verifyQuestionsDisplayed()` | Promise<boolean> | Verify questions displayed |
| `isSearchInputFocused()` | Promise<boolean> | Check if search focused |

### Getter Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `getSearchInputValue()` | Promise<string> | Get search input value |
| `getQuestionCount()` | Promise<number> | Get number of questions |
| `getPageHeadingText()` | Promise<string> | Get page heading text |

---

## ConceptsPage Methods

### Locators
```
breadcrumb          - Breadcrumb navigation
conceptsLink        - Concepts breadcrumb link
conceptTab          - Concept tab
tryItYourselfTab    - Try It Yourself tab
testCasesTab        - Test Cases tab
pageHeading         - Page heading
overviewSection     - Overview section
usecasesSection     - Usecases section
importantNotes      - Important Notes section
backButton          - Back button
```

### Navigation Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `goto(concept)` | Promise<void> | Navigate to concept page (iframe, multiwindow, etc) |
| `navigateToConcept(concept)` | Promise<void> | Navigate and verify concept page |
| `goBack()` | Promise<void> | Go back |

### Action Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `clickConceptTab()` | Promise<void> | Click Concept tab |
| `clickTryItYourselfTab()` | Promise<void> | Click Try It Yourself tab |
| `clickTestCasesTab()` | Promise<void> | Click Test Cases tab |

### Verification Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `verifyPageLoaded()` | Promise<boolean> | Verify page loaded |
| `verifyAllTabsVisible()` | Promise<boolean> | Verify all tabs visible |
| `isConceptTabSelected()` | Promise<boolean> | Check if Concept tab selected |
| `isTryItYourselfTabSelected()` | Promise<boolean> | Check if Try It Yourself tab selected |
| `isTestCasesTabSelected()` | Promise<boolean> | Check if Test Cases tab selected |
| `isOverviewSectionVisible()` | Promise<boolean> | Check if Overview visible |
| `isUsecasesSectionVisible()` | Promise<boolean> | Check if Usecases visible |
| `areImportantNotesVisible()` | Promise<boolean> | Check if Important Notes visible |

### Getter Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `getPageHeadingText()` | Promise<string> | Get page heading text |
| `getConceptsLink()` | Promise<string \| null> | Get concepts link href |

---

## ChallengePage Methods

### Locators
```
pageHeading         - Page heading
pageDescription     - Page description
challengeCards      - Challenge cards
productFilteringLink - Product Filtering challenge link
productPaginationLink - Product Pagination challenge link
challengeTitle      - Challenge title
challengeInstructions - Challenge instructions
backButton          - Back button
```

### Navigation Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `goto()` | Promise<void> | Navigate to challenges page |
| `gotoChallengeByName(name)` | Promise<void> | Navigate to specific challenge |
| `goBack()` | Promise<void> | Go back |

### Action Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `clickProductFilteringChallenge()` | Promise<void> | Click Product Filtering |
| `clickProductPaginationChallenge()` | Promise<void> | Click Product Pagination |

### Verification Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `verifyPageLoaded()` | Promise<boolean> | Verify page loaded |
| `verifyChallengeTitle()` | Promise<boolean> | Verify challenge title visible |
| `verifyChallengeLinkVisible(name)` | Promise<boolean> | Verify challenge link visible |

### Getter Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `getPageHeadingText()` | Promise<string> | Get page heading text |
| `getChallengeTitleText()` | Promise<string> | Get challenge title text |
| `getAllChallengeLinks()` | Promise<string[]> | Get all challenge links |

---

## BlogsPage Methods

### Locators
```
pageHeading         - Page heading
pageDescription     - Page description
htmlBasicsBlogCard  - HTML Basics blog card
locatorStrategiesBlogCard - Locator Strategies card
blogCards           - All blog cards
htmlBasicsBlogLink  - HTML Basics blog link
locatorStrategiesBlogLink - Locator Strategies link
backButton          - Back button
```

### Navigation Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `goto()` | Promise<void> | Navigate to blogs page |
| `gotoBlogByName(name)` | Promise<void> | Navigate to specific blog |
| `goBack()` | Promise<void> | Go back |

### Action Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `clickHTMLBasicsBlog()` | Promise<void> | Click HTML Basics blog |
| `clickLocatorStrategiesBlog()` | Promise<void> | Click Locator Strategies |

### Verification Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `verifyPageLoaded()` | Promise<boolean> | Verify page loaded |
| `verifyAllBlogCards()` | Promise<boolean> | Verify all cards visible |
| `verifyBlogDetailPageLoaded()` | Promise<boolean> | Verify blog detail page |
| `isBlogLinkClickable(link)` | Promise<boolean> | Check if link enabled |

### Getter Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `getPageHeadingText()` | Promise<string> | Get page heading text |
| `getBlogCardCount()` | Promise<number> | Get number of blog cards |
| `getAllBlogLinks()` | Promise<string[]> | Get all blog links |
| `getBlogContent()` | Promise<string> | Get blog content text |

---

## Quick Usage Examples

### Example 1: Simple Navigation Test
```typescript
const homePage = new HomePage(page);
await homePage.goto();
const isLoaded = await homePage.verifyPageLoaded();
expect(isLoaded).toBeTruthy();
```

### Example 2: Search Test
```typescript
const interviewPage = new InterviewQuestionsPage(page);
await interviewPage.goto();
await interviewPage.searchQuestions('selenium');
const displayed = await interviewPage.verifyQuestionsDisplayed();
expect(displayed).toBeTruthy();
```

### Example 3: Tab Switching Test
```typescript
const conceptsPage = new ConceptsPage(page);
await conceptsPage.goto('iframe');
await conceptsPage.clickTryItYourselfTab();
const isSelected = await conceptsPage.isTryItYourselfTabSelected();
expect(isSelected).toBeTruthy();
```

### Example 4: Multi-Page Journey
```typescript
const homePage = new HomePage(page);
const explorePage = new ExplorePage(page);
const blogsPage = new BlogsPage(page);

await homePage.goto();
await homePage.clickBlogsNav();
const isLoaded = await blogsPage.verifyPageLoaded();
expect(isLoaded).toBeTruthy();
```

---

**Last Updated**: April 30, 2026
**Total Methods**: 150+
**Page Objects**: 7
