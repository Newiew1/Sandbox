# Test Report Quick Reference

## 🚀 Quick Start

```bash
# Run all tests and automatically open report
npm test
```

That's it! The HTML report will be generated and opened in your browser automatically after tests complete.

## 📊 Common Commands

### Run Tests
```bash
npm test              # Run all tests + open report
npm run test:headed   # Run tests with visible browser
npm run test:debug    # Run with debugging enabled
npm run test:ui       # Run in interactive UI mode
```

### View Reports
```bash
npm run test:report   # View latest HTML report
```

### Run Specific Test Suite
```bash
npm run test:home         # Home page tests
npm run test:explore      # Explore page tests
npm run test:interview    # Interview questions tests
npm run test:concepts     # Concepts page tests
npm run test:challenges   # Challenges page tests
npm run test:blogs        # Blogs page tests
npm run test:e2e          # End-to-end journey tests
```

### Run All + Report
```bash
npm run test:all      # Run all tests and open report
```

## 📍 Report Location

After running tests, the report is generated at:
```
playwright-report/index.html
```

## 📊 What's in the Report?

- ✅ **Test Results** - Pass/Fail/Skip status
- ⏱️ **Duration** - How long each test took
- 📸 **Screenshots** - Captured at failure points
- 🎥 **Videos** - Recording of failed tests
- 📝 **Error Details** - Full stack traces
- 🎯 **Test Timeline** - Execution sequence

## 🔍 Report Features

### View Test Results
1. Run: `npm test`
2. Report opens automatically
3. Click tests to see details
4. View screenshots/videos

### Filter Results
- Filter by test name
- Filter by status (Passed/Failed/Skipped)
- Search functionality

### See Failure Details
1. Click on failed test (red)
2. View error message
3. Check screenshot
4. Play video recording
5. Review stack trace

## 📈 Report Statistics

At top of report:
- Total tests run
- Tests passed ✅
- Tests failed ❌
- Tests skipped ⏭️
- Total execution time

## 💡 Tips

### Multiple Reruns
```bash
# Each run overwrites the report
npm test  # Run 1
npm test  # Run 2 (overwrites previous report)
```

### Keep Previous Reports
```bash
# Backup before new run
mv playwright-report playwright-report-backup-$(date +%s)
npm test  # Generate new report
```

### Share Reports
1. Zip the `playwright-report/` folder
2. Send to team
3. They can open in any browser

### No Auto-Open
```bash
# Run tests without auto-opening report
npx playwright test
# Then manually open with:
npm run test:report
```

## 🔧 Configuration

HTML reporting is configured in `playwright.config.ts`:

```typescript
reporter: [
  ['html', { 
    outputFolder: 'playwright-report',
    open: 'always',  // Auto-open after run
  }],
  ['list'],          // Terminal summary
  ['json', { outputFile: 'test-results.json' }],
]
```

Change `open` to:
- `'always'` - Always open report
- `'on-failure'` - Only open if tests fail
- `'never'` - Never auto-open

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Report not opening | Run `npm run test:report` manually |
| Report missing | Ensure tests completed - check terminal |
| No videos/traces | Videos only on retry - normal for passing tests |

## 🎯 Workflow Example

```bash
# 1. Run all tests (report auto-opens)
$ npm test

# Terminal Output:
# ✓ TC001: Home page loads successfully
# ✓ TC002: Home page has hero section...
# ...
# ✅ 87 passed, ❌ 2 failed, ⏭️ 1 skipped
# 📊 Report opened in browser

# 2. Browser opens with HTML report
# - Review failed tests
# - Watch videos of failures
# - Check screenshots

# 3. If needed, run specific tests again
$ npm run test:home

# 4. View updated report (should auto-open)
# - Check if fixes resolved issues
```

## 📚 Learn More

- Full Guide: See `HTML_REPORT_GUIDE.md`
- Framework Guide: See `POM_README.md`
- Methods Reference: See `METHODS_REFERENCE.md`
- Migration Guide: See `MIGRATION_GUIDE.md`

---

**Tip**: First time running tests? Just use `npm test` and enjoy the automatic report! 🎉
