# Page Object Model (POM) Test Framework for Cnarios

A comprehensive Playwright-based test framework using the Page Object Model pattern for the Cnarios automation testing platform (https://www.cnarios.com).

## Project Structure

```
cnarios-test-framework/
├── pages/                    # Page Object Classes
│   ├── BasePage.ts          # Base class with common functionality
│   ├── HomePage.ts          # Home page object
│   ├── ExplorePage.ts       # Explore page object
│   ├── InterviewQuestionsPage.ts  # Interview Questions page object
│   ├── ConceptsPage.ts      # Concepts page object
│   ├── ChallengePage.ts     # Challenges page object
│   └── BlogsPage.ts         # Blogs page object
│
├── tests/                    # Test Suites
│   ├── home.spec.ts         # Home page tests
│   ├── explore.spec.ts      # Explore page tests
│   ├── interviewQuestions.spec.ts  # Interview Questions tests
│   ├── concepts.spec.ts     # Concepts page tests
│   ├── challenges.spec.ts   # Challenges page tests
│   ├── blogs.spec.ts        # Blogs page tests
│   └── e2e.spec.ts          # End-to-End journey tests
│
├── utils/                    # Utility Functions
│   ├── constants.ts         # Test constants and data
│   └── testUtils.ts         # Common test utilities
│
├── playwright.config.ts     # Playwright configuration
├── package.json             # Project dependencies
└── README.md               # This file
```

## Page Object Model Architecture

### BasePage (Base Class)
All page objects inherit from `BasePage` which provides:
- Navigation methods (`navigateTo()`, `getCurrentURL()`, `getPageTitle()`)
- Common element interactions (click, wait, scroll)
- Navigation link helpers
- Footer and social media link accessors

### Page Objects
Each page object represents a specific page/feature with:
- **Locators**: All page element locators as readonly properties
- **Methods**: Business logic and user actions
- **Verification**: Methods to verify page state and element visibility

Example structure:
```typescript
export class HomePage extends BasePage {
  // Locators
  readonly heroHeading: Locator;
  readonly startExploringBtn: Locator;

  // Methods
  async clickStartExploring() { ... }
  async verifyHeroSection() { ... }
}
```

## Usage

### Running All Tests
```bash
npm test
```

### Running Specific Test Suite
```bash
npx playwright test tests/home.spec.ts
npx playwright test tests/concepts.spec.ts
```

### Running Tests with Filter
```bash
npx playwright test --grep "TC001"
npx playwright test --grep "Hero Section"
```

### Running Tests in UI Mode (Debug)
```bash
npx playwright test --ui
```

### Running Tests in Debug Mode
```bash
npx playwright test --debug
```

### Generate Test Report
```bash
npx playwright show-report
```

## Test Organization

### Test Suites (120+ Test Cases)

1. **Home Page Tests** (22 tests)
   - Hero section validation
   - Navigation links
   - Feature cards
   - Button functionality

2. **Explore Page Tests** (13 tests)
   - Page load verification
   - Trending sections
   - CTA button navigation
   - Back button functionality

3. **Interview Questions Tests** (18 tests)
   - Search functionality
   - Filter elements (Company, Topic, Difficulty, Sort)
   - Question display
   - Multiple search keywords

4. **Concepts Page Tests** (20 tests)
   - Tab switching (Concept, Try It Yourself, Test Cases)
   - Multiple concept pages (iframe, multiwindow, links, table)
   - Content sections (Overview, Usecases, Important Notes)
   - Breadcrumb navigation

5. **Challenges Page Tests** (17 tests)
   - Challenge page load
   - Product filtering and pagination challenges
   - Challenge navigation
   - Content verification

6. **Blogs Page Tests** (19 tests)
   - Blog listing
   - Blog detail pages
   - Blog navigation
   - Content verification

7. **End-to-End Journeys** (11 tests)
   - Complete user workflows
   - Multi-page navigation
   - Tab interactions
   - Filter testing
   - Navigation consistency

## Key Features

### ✅ Page Object Model Benefits
- **Maintainability**: Changes to page structure only require updates to page objects
- **Reusability**: Methods can be used across multiple tests
- **Readability**: Tests read like user workflows
- **Scalability**: Easy to add new pages and tests

### ✅ Comprehensive Coverage
- 120+ test cases
- All pages covered
- Navigation paths tested
- Form interactions tested
- Error handling included

### ✅ Best Practices
- Single responsibility principle
- Inheritance for shared functionality
- Explicit waits for reliability
- Descriptive test names
- Organized test suites

## Writing New Tests

### Using Page Objects
```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('My Tests', () => {
  test('My test', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Navigate
    await homePage.goto();
    
    // Perform action
    await homePage.clickStartExploring();
    
    // Verify
    const isVisible = await homePage.startExploringBtn.isVisible();
    expect(isVisible).toBeTruthy();
  });
});
```

### Adding New Page Objects
1. Create a new file in `pages/` directory
2. Extend `BasePage`
3. Define locators as readonly properties
4. Create methods for user actions and verifications

```typescript
export class NewPage extends BasePage {
  readonly element: Locator;

  constructor(page: Page) {
    super(page);
    this.element = page.locator('selector');
  }

  async performAction() {
    // Implementation
  }
}
```

## Test Utilities

### TestUtils Class
- `waitForElementVisible()`: Wait for element with custom timeout
- `clickAndWaitForNavigation()`: Click and wait for URL change
- `fillInput()`: Fill form inputs
- `getElementCount()`: Get element count
- `isElementVisible()`: Check visibility
- `isElementEnabled()`: Check if enabled
- `getElementText()`: Get text content
- `getAllElementsText()`: Get all matching elements text

### Constants
- `BASE_URL`: Application base URL
- `NAVIGATION_PATHS`: All page paths
- `TEST_TIMEOUTS`: Timeout values
- `FILTER_OPTIONS`: Filter choices
- `TEST_DATA`: Test search keywords

## Configuration

### Playwright Config (playwright.config.ts)
- Browser: Chromium
- Viewport: 1280x720
- Headless mode enabled
- Trace on first retry
- Action timeout: 10 seconds
- Expect timeout: 10 seconds

## Dependencies

```json
{
  "devDependencies": {
    "@playwright/test": "^1.59.0",
    "@types/node": "^25.5.0"
  }
}
```

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Troubleshooting

### Tests Timing Out
- Increase timeout in test: `test.setTimeout(30000)`
- Increase timeout in playwright.config.ts
- Verify element locators

### Element Not Found
- Use `--debug` mode to inspect elements
- Use Playwright Inspector: `PWDEBUG=1 npx playwright test`
- Verify locators with `page.locator()`

### Flaky Tests
- Add explicit waits for elements
- Use `waitForLoadState('networkidle')`
- Increase timeout for specific actions

## Best Practices

1. **Use Page Objects**: Always use page objects instead of writing locators in tests
2. **Explicit Waits**: Use explicit waits instead of `sleep()`
3. **Meaningful Names**: Use descriptive test and method names
4. **Single Action**: Each test should focus on one action
5. **Arrange-Act-Assert**: Follow AAA pattern in tests
6. **No Hard Waits**: Avoid `page.waitForTimeout()` unless necessary

## Contributing

When adding new tests:
1. Use appropriate page object
2. Follow naming convention: `TC###: Description`
3. Add tests to correct spec file
4. Update this README if adding new pages
5. Ensure all tests pass before committing

## Support

For issues or questions:
1. Check existing tests for similar scenarios
2. Review page object methods
3. Use debug mode to investigate

---

**Last Updated**: April 30, 2026
**Framework Version**: 1.0.0
**Total Test Cases**: 120+
