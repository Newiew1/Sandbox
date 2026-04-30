# 🚀 Quick Reference - Playwright Test Framework

## Your Framework at a Glance

**What You Have**:
- 120+ automated tests
- 7 page objects (reusable code blocks)
- Professional architecture (Page Object Model)
- Beautiful HTML reports

---

## 📦 Directory Structure

```
tests/                    ← Test files (what to test)
  ├── home.spec.ts        ← Home page tests (22)
  ├── explore.spec.ts     ← Explore page tests (13)
  ├── blogs.spec.ts       ← Blogs tests (19)
  └── ... 7 test files total

pages/                    ← Page objects (how to test)
  ├── BasePage.ts         ← Common functions
  ├── HomePage.ts         ← Home page actions
  └── ... 6 page files

utils/                    ← Helpers
  ├── constants.ts        ← Test data
  └── testUtils.ts        ← Helper functions

playwright.config.ts      ← Configuration
```

---

## 🎯 Most Common Commands

| Command | What It Does | Time |
|---------|-------------|------|
| `npm test` | Run all tests + open report | 2-3 min |
| `npm run test:home` | Run home tests only | 30 sec |
| `npm run test:headed` | Run tests, see browser | 3 min |
| `npm run test:debug` | Debug mode with inspector | 5+ min |
| `npm run test:report` | View last report | instant |

---

## 🧪 Test Structure

### Anatomy of a Test
```typescript
test('TC001: What you\'re testing', async ({ page }) => {
  // SETUP: Create page object
  const homePage = new HomePage(page);
  
  // ACTION: Do something
  await homePage.goto();
  
  // VERIFY: Check result
  expect(await homePage.verifyPageLoaded()).toBeTruthy();
});
```

### Test Naming Convention
- `TC001`, `TC002`, etc. = Test number
- "What you're testing" = Clear description
- Format: `TC###: Description of what's being tested`

---

## 📍 Where to Add/Edit

### Add New Test
1. Open appropriate file in `tests/`
2. Add test code at bottom
3. Run: `npm test`

### Edit Test
1. Open `tests/xyz.spec.ts`
2. Change test logic
3. Save and run: `npm test`

### Add New Page to Test
1. Create `pages/XyzPage.ts`
2. Create `tests/xyz.spec.ts`
3. Add test code
4. Run: `npm test`

### Fix Broken Locator
1. Find error in test report
2. Open `pages/XyzPage.ts`
3. Update locator selector
4. Run test again

---

## 🔍 Page Objects Explained

### What is It?
A class that knows how to interact with a specific page.

### Structure
```typescript
export class HomePage extends BasePage {
  // 1. Define locators (where are things?)
  readonly button = page.locator('button:has-text("Click")');
  
  // 2. Define methods (what can we do?)
  async clickButton() {
    await this.button.click();
  }
}
```

### Usage in Tests
```typescript
// Create instance
const homePage = new HomePage(page);

// Use method
await homePage.clickButton();

// That's it!
```

---

## 💡 Common Locator Patterns

```typescript
// By text
page.locator('button:has-text("Click Me")')

// By role (BEST PRACTICE)
page.getByRole('button', { name: 'Click Me' })

// By placeholder
page.locator('input[placeholder="Email"]')

// By class
page.locator('button.submit-btn')

// By tag + filter
page.locator('div').filter({ hasText: 'Important' })

// First match
page.locator('button').first()

// Nth match
page.locator('button').nth(2)  // 3rd button (0-indexed)

// Count
const count = await page.locator('button').count()
```

---

## ✍️ How to Write a Simple Test

### Step 1: Create Test
```typescript
test('TC101: Homepage loads', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  expect(await homePage.verifyPageLoaded()).toBeTruthy();
});
```

### Step 2: Create Method in Page Object
```typescript
// In pages/HomePage.ts
async goto() {
  await this.navigateTo('/');
}

async verifyPageLoaded() {
  return await this.pageHeading.isVisible();
}
```

### Step 3: Run
```bash
npm run test:home
```

---

## 🐛 Debug a Failed Test

### Option 1: Read the Report
```bash
npm run test:report
# Opens HTML report in browser
# Click failed test to see error
```

### Option 2: Run in Debug Mode
```bash
npm run test:debug
# Opens Playwright Inspector
# Step through test line by line
```

### Option 3: Run in Headed Mode
```bash
npm run test:headed
# See browser while tests run
```

---

## 📊 Available Page Objects

| Page | File | Methods | Purpose |
|------|------|---------|---------|
| Home | HomePage.ts | goto(), clickStartExploring() | Home page |
| Explore | ExplorePage.ts | goto(), clickExploreQuestions() | Explore page |
| Interview | InterviewQuestionsPage.ts | goto(), searchQuestions() | Interview page |
| Concepts | ConceptsPage.ts | goto(), clickConceptTab() | Concepts pages |
| Challenges | ChallengePage.ts | goto(), gotoChallengeByName() | Challenges |
| Blogs | BlogsPage.ts | goto(), gotoBlogByName() | Blogs |
| Base | BasePage.ts | navigateTo(), waitForElement() | Common functions |

---

## 🔧 Basic Operations

### Click Something
```typescript
await element.click();
```

### Fill a Form
```typescript
await input.fill('email@example.com');
```

### Check if Visible
```typescript
const isVisible = await element.isVisible();
```

### Wait for Element
```typescript
await page.waitForSelector('button');
```

### Get Text
```typescript
const text = await element.textContent();
```

### Navigate to URL
```typescript
await page.goto('https://cnarios.com');
```

### Check URL
```typescript
expect(page.url()).toContain('/home');
```

---

## 📝 Test Best Practices

### ✅ DO This

```typescript
// Good: Descriptive name
test('TC001: User can click button and navigate', async ({ page }) => {

// Good: Use page methods
await homePage.clickButton();

// Good: Clear assertions
expect(result).toBeTruthy();

// Good: Organize code
const page = new HomePage(page);
await page.goto();
const result = await page.verify();
expect(result).toBeTruthy();
```

### ❌ DON'T Do This

```typescript
// Bad: Vague name
test('test 1', ...)

// Bad: Hardcoded values
await page.locator('button').click(); // Which button?

// Bad: Too complex
test('complex test', () => {
  // 100 lines of code
  // Testing 10 different things
});
```

---

## 🎯 Learning Path

### Week 1: Understand
1. Read BEGINNER_GUIDE.md (THIS FILE)
2. Run tests: `npm test`
3. View report

### Week 2: Modify
1. Change test descriptions
2. Update test data in tests
3. See what breaks/fixes

### Week 3: Add Tests
1. Add new test to existing file
2. Learn to create new page objects
3. Create first new feature test

### Week 4: Debug
1. Intentionally break things
2. Fix using debug mode
3. View reports

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Test hangs | Check internet, increase timeout |
| Locator not found | Inspect element with F12, update selector |
| Import error | Check file path is correct |
| Test passes locally but fails later | Add waits for page load |
| Don't know what broke | Run in debug mode or headed mode |

---

## 📚 Files to Read Next

1. **[BEGINNER_GUIDE.md](BEGINNER_GUIDE.md)** ← Start here (detailed)
2. **[POM_README.md](POM_README.md)** ← Learn about architecture
3. **[METHODS_REFERENCE.md](METHODS_REFERENCE.md)** ← All available methods
4. **[HTML_REPORT_GUIDE.md](HTML_REPORT_GUIDE.md)** ← Understanding reports

---

## 🚀 Your Next Steps

```bash
# 1. Run all tests
npm test

# 2. See the report (should open automatically)
# Review what passed/failed

# 3. Modify one test
# Open tests/home.spec.ts
# Change a test name

# 4. Run again
npm test

# 5. See your change in the new report
```

---

## 💬 Remember

- You built something professional!
- Tests are code that can be edited like any code
- If something breaks, it's fixable
- Run tests often to catch issues early
- Use debug mode when confused

---

**Happy Testing!** 🎉

*Last Updated: April 30, 2026*
